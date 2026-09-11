function renderPosterWall() {
            const list = getFilteredFolders();
            const query = currentSearch.toLowerCase().trim();
            let html = '';

            list.forEach(f => {
                (f.images || []).forEach((img, idx) => {
                    if (!query || isImageMatch(img, query)) {
                        html += `
                            <div class="wall-item" onclick="openReader('${f.rawName}', ${idx});" title="Buka ${escapeHtml(img.cleanTitle || img.name)} (#${idx + 1})">
                                <img src="${img.url}" alt="${escapeHtml(img.cleanTitle || img.name)}" loading="lazy" onload="smoothDownscale(this, 240);">
                                <div class="wall-caption">${escapeHtml(img.cleanTitle || img.name)}</div>
                            </div>
                        `;
                    }
                });
            });
            posterWallGrid.innerHTML = html || '<div style="grid-column: 1 / -1; padding:3rem; text-align:center; color:var(--text-muted);">Tidak ada poster yang cocok dengan pencarian.</div>';
        }
