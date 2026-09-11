        function isFolderInCategory(f, catId) {
            if (catId === 'all') return true;
            return f.themeCode === catId || (f.rawName && (f.rawName.startsWith(catId + '-') || f.rawName === catId));
        }

        function getFolderThemeTag(f) {
            const code = f.themeCode || (f.rawName ? f.rawName.split('-')[0] : '');
            const found = TECH_CATEGORIES.find(c => c.id === code);
            if (found && found.title) return found.title.toUpperCase();
            if (found && found.label) return found.label.replace(/^[^\w\s]+/, '').trim().toUpperCase();
            return (f.themeShortTitle || f.themeTitle || 'DESIGN').toUpperCase();
        }



        function smoothDownscale(img, targetWidth) {
            try {
                if (!img || !img.naturalWidth || img.dataset.scaled) return;
                const curW = img.naturalWidth;
                const curH = img.naturalHeight;
                if (curW <= targetWidth * 1.25) return;

                const targetHeight = Math.round((curH / curW) * targetWidth);

                let canvas = document.createElement('canvas');
                canvas.width = curW;
                canvas.height = curH;
                let ctx = canvas.getContext('2d');
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                ctx.drawImage(img, 0, 0, curW, curH);

                let stepW = curW;
                let stepH = curH;

                while (stepW * 0.5 > targetWidth) {
                    stepW = Math.round(stepW * 0.5);
                    stepH = Math.round(stepH * 0.5);
                    const tempCanvas = document.createElement('canvas');
                    tempCanvas.width = stepW;
                    tempCanvas.height = stepH;
                    const tempCtx = tempCanvas.getContext('2d');
                    tempCtx.imageSmoothingEnabled = true;
                    tempCtx.imageSmoothingQuality = 'high';
                    tempCtx.drawImage(canvas, 0, 0, stepW, stepH);
                    canvas = tempCanvas;
                }

                const finalCanvas = document.createElement('canvas');
                finalCanvas.width = targetWidth;
                finalCanvas.height = targetHeight;
                const finalCtx = finalCanvas.getContext('2d');
                finalCtx.imageSmoothingEnabled = true;
                finalCtx.imageSmoothingQuality = 'high';
                finalCtx.drawImage(canvas, 0, 0, targetWidth, targetHeight);

                img.dataset.scaled = 'true';
                try {
                    img.src = finalCanvas.toDataURL('image/jpeg', 0.92);
                } catch (secErr) {
                    finalCanvas.className = img.className;
                    finalCanvas.style.cssText = img.style.cssText;
                    finalCanvas.title = img.title || '';
                    if (img.parentNode) {
                        img.parentNode.replaceChild(finalCanvas, img);
                    }
                }
            } catch (e) {
                // Fallback gracefully
            }
        }


        function getExpandedQueries(query) {
            if (!query) return [];
            const q = query.toLowerCase().trim();
            const queries = [q];
            for (const [k, list] of Object.entries(SYNONYMS)) {
                if (k.startsWith(q) || q.startsWith(k) || k.includes(q)) {
                    list.forEach(item => {
                        if (!queries.includes(item)) queries.push(item);
                    });
                }
            }
            return queries;
        }

        function stripAccents(str) {
            if (!str) return '';
            return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        }

        function isImageMatch(img, query) {
            if (!query) return true;
            const queryList = getExpandedQueries(query);

            const name = stripAccents((img.name || '').toLowerCase());
            const nameNorm = name.replace(/[-_.\s]+/g, ' ');
            const url = (typeof img === 'string' ? img : (img.url || '')).toLowerCase();
            const fn = stripAccents(url.split('/').pop() || '');
            const fnNorm = fn.replace(/[-_.\s]+/g, ' ');
            const title = stripAccents((img.cleanTitle || img.title || '').toLowerCase());
            const titleNorm = title.replace(/[-_.\s]+/g, ' ');
            const subtitle = stripAccents((img.subtitle || '').toLowerCase());
            const subtitleNorm = subtitle.replace(/[-_.\s]+/g, ' ');
            const slug = stripAccents((img.englishSlug || '').toLowerCase());
            const slugNorm = slug.replace(/[-_.\s]+/g, ' ');
            const subtopic = stripAccents((img.subtopic || '').toLowerCase());
            const subtopicNorm = subtopic.replace(/[-_.\s]+/g, ' ');

            return queryList.some(q => {
                const qClean = stripAccents(q);
                const qNorm = qClean.replace(/[-_.\s]+/g, ' ');
                return name.includes(qClean) || nameNorm.includes(qNorm) ||
                       fn.includes(qClean) || fnNorm.includes(qNorm) ||
                       title.includes(qClean) || titleNorm.includes(qNorm) ||
                       subtitle.includes(qClean) || subtitleNorm.includes(qNorm) ||
                       slug.includes(qClean) || slugNorm.includes(qNorm) ||
                       subtopic.includes(qClean) || subtopicNorm.includes(qNorm);
            });
        }

        function isFolderMatch(f, query) {
            if (!query) return true;
            const queryList = getExpandedQueries(query);
            const disp = stripAccents((f.displayName || '').toLowerCase());
            const dispNorm = disp.replace(/[-_.\s]+/g, ' ');
            const raw = stripAccents((f.rawName || '').toLowerCase());
            const rawNorm = raw.replace(/[-_.\s]+/g, ' ');
            const theme = stripAccents((f.themeTitle || '').toLowerCase());
            const themeNorm = theme.replace(/[-_.\s]+/g, ' ');

            const folderMatches = queryList.some(q => {
                const qClean = stripAccents(q);
                const qNorm = qClean.replace(/[-_.\s]+/g, ' ');
                return disp.includes(qClean) || dispNorm.includes(qNorm) ||
                       raw.includes(qClean) || rawNorm.includes(qNorm) ||
                       theme.includes(qClean) || themeNorm.includes(qNorm);
            });

            return folderMatches || (f.images || []).some(img => isImageMatch(img, query));
        }

        function getFilteredFolders() {
            const query = currentSearch.toLowerCase().trim();
            return libraryData.filter(f => {
                const matchCat = (activeCategory === 'all') || isFolderInCategory(f, activeCategory);
                if (!matchCat) return false;
                if (!query) return true;
                return isFolderMatch(f, query);
            });
        }


function escapeHtml(str) {
            if (!str) return '';
            return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        }
