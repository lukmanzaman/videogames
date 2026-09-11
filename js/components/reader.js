        function showNav() {
            nav.classList.remove('nav-hidden');
            isNavVisible = true;
        }

        function hideNav() {
            nav.classList.add('nav-hidden');
            isNavVisible = false;
            closePickerDropdown();
        }

        function toggleNav() {
            if (isNavVisible) hideNav();
            else showNav();
        }

        function togglePickerDropdown(e) {
            if (e) e.stopPropagation();
            const isOpen = navPickerDropdown.classList.contains('is-open');
            if (isOpen) closePickerDropdown();
            else {
                navPickerDropdown.classList.add('is-open');
                navPickerBtn.classList.add('active');
            }
        }

        function closePickerDropdown() {
            if (navPickerDropdown) navPickerDropdown.classList.remove('is-open');
            if (navPickerBtn) navPickerBtn.classList.remove('active');
        }

        function openReader(folderRaw, startIdx = 0, shouldPushState = true) {
            const folder = folderMap[folderRaw];
            if (!folder) return;

            homeScrollY = window.scrollY;
            currentFolderRaw = folderRaw;
            currentFeedImages = folder.images || [];

            homeView.style.display = 'none';
            readerView.style.display = 'block';
            document.body.classList.remove('view-home');
            document.body.classList.add('view-reader');

            navFolderTitle.textContent = folder.displayName;
            
            // Push history state so browser Back button returns to gallery
            if (shouldPushState && window.location.hash !== '#' + folderRaw) {
                history.pushState({ view: 'reader', folder: folderRaw }, '', '#' + folderRaw);
            }

            buildDoomFeed();
            buildPickerDropdown();

            showNav();
            setTimeout(() => {
                if (!navPickerDropdown.classList.contains('is-open')) {
                    hideNav();
                }
            }, 2200);

            const saved = getSavedPosition(folderRaw);
            if (startIdx > 0) {
                setTimeout(() => scrollToArticle(startIdx), 60);
            } else if (saved && typeof saved.scrollY === 'number' && saved.scrollY > 0) {
                isRestoring = true;
                const targetY = saved.scrollY;
                currentActiveIdx = (saved.artIdx ? saved.artIdx - 1 : 0);
                updatePickerActiveIndex(currentActiveIdx);

                window.scrollTo({ top: targetY, behavior: 'instant' });
                requestAnimationFrame(() => {
                    window.scrollTo({ top: targetY, behavior: 'instant' });
                    setTimeout(() => {
                        window.scrollTo({ top: targetY, behavior: 'instant' });
                        showToast(`Melanjutkan dari artikel #${saved.artIdx || 1}`);
                        setTimeout(() => { isRestoring = false; }, 350);
                    }, 50);
                });
            } else {
                window.scrollTo({ top: 0, behavior: 'instant' });
            }
        }

        function closeReader(updateHistory = true) {
            saveCurrentPosition();
            if (observer) observer.disconnect();

            hideNav();
            readerView.style.display = 'none';
            homeView.style.display = 'block';
            document.body.classList.remove('view-reader');
            document.body.classList.add('view-home');

            doomFeed.innerHTML = '';
            currentFolderRaw = null;

            if (updateHistory) {
                if (window.location.hash) {
                    history.back();
                } else {
                    history.replaceState(null, '', window.location.pathname + window.location.search);
                }
            }

            renderExhibits();
            window.scrollTo({ top: homeScrollY, behavior: 'instant' });
        }

function buildDoomFeed() {
            if (observer) observer.disconnect();
            doomFeed.innerHTML = '';

            observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const frame = entry.target;
                        const idx = parseInt(frame.dataset.index, 10);
                        currentActiveIdx = idx;
                        loadFrameImage(frame);
                        preloadRunway(idx);
                        updatePickerActiveIndex(idx);
                    }
                });
            }, {
                rootMargin: '600px 0px 600px 0px',
                threshold: 0.01
            });

            currentFeedImages.forEach((img, idx) => {
                const frame = document.createElement('div');
                frame.className = 'article-frame';
                frame.dataset.index = idx;
                frame.dataset.src = img.url;
                frame.id = `art-frame-${idx}`;
                doomFeed.appendChild(frame);
                observer.observe(frame);
            });
        }

        function loadFrameImage(frame) {
            if (frame.dataset.loaded === 'true') return;
            frame.dataset.loaded = 'true';

            const img = document.createElement('img');
            img.className = 'article-img';
            img.decoding = 'async';
            img.alt = 'Infographic Poster';
            img.src = frame.dataset.src;
            img.onload = () => img.classList.add('is-loaded');
            frame.appendChild(img);
        }

        function preloadRunway(currentIdx) {
            const start = Math.max(0, currentIdx - 2);
            const end = Math.min(currentFeedImages.length - 1, currentIdx + 6);
            for (let i = start; i <= end; i++) {
                const f = document.getElementById(`art-frame-${i}`);
                if (f && f.dataset.loaded !== 'true') {
                    loadFrameImage(f);
                }
            }
        }

        /* LIGHTWEIGHT, ULTRA FAST ARTICLE PICKER (ZERO HEAVY THUMBNAILS) */
        function buildPickerDropdown() {
            pickerTotalBadge.textContent = `${currentFeedImages.length} Visual`;
            let html = '';
            let lastSubtopic = '';
            currentFeedImages.forEach((img, idx) => {
                const sub = img.subtopic || '';
                if (sub && sub !== lastSubtopic) {
                    const label = img.subtopicCode ? `${img.subtopicCode} • ${sub}` : sub;
                    html += `
                        <div style="padding: 7px 14px; font-size: 0.72rem; font-weight: 800; color: var(--primary); background: var(--primary-soft-bg); border-top: 1.5px solid var(--primary-border); border-bottom: 1px solid var(--primary-border); letter-spacing: 0.5px; position: sticky; top: 0; z-index: 2;">
                            ${escapeHtml(label.toUpperCase())}
                        </div>
                    `;
                    lastSubtopic = sub;
                }
                const title = escapeHtml(img.cleanTitle || img.name || `Visual ${idx + 1}`);
                const subTitle = img.subtitle ? `<span class="picker-item-sub">${escapeHtml(img.subtitle)}</span>` : '';
                html += `
                    <div class="picker-item" onclick="scrollToArticle(${idx});">
                        <span class="picker-item-num">#${idx + 1}</span>
                        <div class="picker-item-content">
                            <span class="picker-item-title">${title}</span>
                            ${subTitle}
                        </div>
                    </div>
                `;
            });
            navPickerList.innerHTML = html;
        }

        function updatePickerActiveIndex(idx) {
            if (navPickerLabel && currentFeedImages[idx]) {
                const title = currentFeedImages[idx].cleanTitle || currentFeedImages[idx].name || '';
                navPickerLabel.textContent = `#${idx + 1} ${title}`;
            }
            const items = navPickerList.querySelectorAll('.picker-item');
            items.forEach((it, i) => {
                if (i === idx) it.classList.add('active');
                else it.classList.remove('active');
            });
        }

        function scrollToArticle(idx) {
            const frame = document.getElementById(`art-frame-${idx}`);
            if (frame) {
                closePickerDropdown();
                loadFrameImage(frame);
                preloadRunway(idx);
                frame.scrollIntoView({ behavior: 'smooth', block: 'start' });
                updatePickerActiveIndex(idx);
            }
        }

        function setupReaderInteraction() {
            // Auto-hide nav on scrolling to prevent obstruction
            window.addEventListener('scroll', () => {
                if (readerView.style.display !== 'block' || isRestoring) return;
                if (isNavVisible) {
                    hideNav();
                }
                saveCurrentPositionDebounced();
            }, { passive: true });

            // Tap top zone (clientY <= 90) to toggle nav, tap elsewhere to dismiss
            document.addEventListener('click', (e) => {
                if (readerView.style.display !== 'block') return;
                if (e.target.closest('#readerNav') || e.target.closest('#restoreToast')) return;

                if (e.clientY <= 90) {
                    toggleNav();
                } else {
                    hideNav();
                }
            });
        }

        let saveTimeout = null;
        function saveCurrentPositionDebounced() {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(saveCurrentPosition, 200);
        }

        function saveCurrentPosition() {
            if (!currentFolderRaw || readerView.style.display !== 'block' || isRestoring) return;
            try {
                let positions = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
                positions[currentFolderRaw] = {
                    artIdx: currentActiveIdx + 1,
                    scrollY: window.scrollY,
                    total: currentFeedImages.length,
                    ts: Date.now()
                };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
            } catch(e) {}
        }

        function getSavedPosition(folderRaw) {
            try {
                const positions = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
                return positions[folderRaw];
            } catch(e) {
                return null;
            }
        }

        function showToast(msg) {
            const toast = document.getElementById('restoreToast');
            const text = document.getElementById('restoreToastText');
            if (!toast || !text) return;
            text.textContent = msg;
            toast.classList.add('is-visible');
            setTimeout(() => toast.classList.remove('is-visible'), 3000);
        }

        function toggleFullScreen() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => {});
            } else {
                document.exitFullscreen().catch(() => {});
            }
        }
