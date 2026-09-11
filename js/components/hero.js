function renderHeroDeck() {
            const samplePosters = [];
            for (const f of libraryData) {
                if (f.images && f.images.length > 0) {
                    samplePosters.push({
                        url: f.images[0].url,
                        folderRaw: f.rawName
                    });
                }
                if (samplePosters.length >= 5) break;
            }

            let html = '';
            samplePosters.forEach((p, idx) => {
                const cClass = `c${idx + 1}`;
                html += `
                    <div class="deck-card ${cClass}" onclick="openReader('${p.folderRaw}');">
                        <img src="${p.url}" alt="Poster Deck Item" loading="lazy" onload="smoothDownscale(this, 280);">
                    </div>
                `;
            });
            heroPosterDeck.innerHTML = html;
        }
