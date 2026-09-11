function renderExhibits() {
            const list = getFilteredFolders();
            const query = currentSearch.toLowerCase().trim();
            let html = '';

            list.forEach(f => {
                const allImgs = f.images || [];
                let displayImgs = allImgs;
                let cardClick = `openReader('${f.rawName}');`;
                let matchBadge = '';

                if (query) {
                    const matching = [];
                    allImgs.forEach((img, idx) => {
                        if (isImageMatch(img, query)) {
                            matching.push({ img, idx });
                        }
                    });
                    if (matching.length > 0) {
                        displayImgs = matching.map(m => m.img);
                        cardClick = `openReader('${f.rawName}', ${matching[0].idx});`;
                        matchBadge = `<span style="background:var(--primary); color:#FFF; padding:2px 7px; border-radius:999px; font-size:0.72rem; margin-left:6px; font-weight:700;">${matching.length} COCOK</span>`;
                    }
                }

                const p1 = displayImgs[0] ? displayImgs[0].url : '';
                const midIdx = Math.floor(displayImgs.length / 2);
                const p2 = displayImgs[midIdx] ? displayImgs[midIdx].url : p1;
                const p3 = displayImgs[displayImgs.length - 1] ? displayImgs[displayImgs.length - 1].url : p1;
                const themeTag = getFolderThemeTag(f);

                const saved = getSavedPosition(f.rawName);
                const hasSavedProgress = !query && (saved && typeof saved.scrollY === 'number' && saved.scrollY > 50);
                const btnText = hasSavedProgress ? 'Lanjutkan' : 'Buka Stream';
                const subMeta = f.submoduleCount ? `${f.submoduleCount} Topik Modul • ` : '';

                html += `
                    <article class="exhibit-card">
                        <div class="exhibit-poster-stage" onclick="${cardClick}">
                            ${p1 ? `<img src="${p1}" class="stage-thumb" alt="Preview 1" loading="lazy" onload="smoothDownscale(this, 160);">` : ''}
                            ${p2 ? `<img src="${p2}" class="stage-thumb center" alt="Preview 2" loading="lazy" onload="smoothDownscale(this, 180);">` : ''}
                            ${p3 ? `<img src="${p3}" class="stage-thumb" alt="Preview 3" loading="lazy" onload="smoothDownscale(this, 160);">` : ''}
                        </div>
                        <div class="exhibit-body">
                            <div>
                                <div class="exhibit-meta-row">
                                    <span class="exhibit-theme-badge">${f.code}</span>
                                    ${matchBadge}
                                </div>
                                <h2 class="exhibit-title" style="font-size:1.15rem; line-height:1.35; margin-bottom:0.35rem;">${escapeHtml(f.displayName)}</h2>
                                ${f.subtitle ? `<p style="font-size:0.82rem; color:var(--text-muted); line-height:1.5; margin-bottom:0.75rem; opacity:0.9;">${escapeHtml(f.subtitle)}</p>` : ''}
                            </div>
                            <div class="exhibit-footer" style="margin-top:auto;">
                                <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted); font-weight:600;">${subMeta}${allImgs.length} Visual</span>
                                <button type="button" class="btn-launch-stream" onclick="${cardClick}">
                                    <span>${btnText}</span>
                                </button>
                            </div>
                        </div>
                    </article>
                `;
            });
            exhibitsGrid.innerHTML = html || '<div style="grid-column: 1 / -1; padding:3rem; text-align:center; color:var(--text-muted);">Tidak ada materi yang cocok dengan pencarian.</div>';
        }
