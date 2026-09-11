        function renderCategoryCapsules() {
            let html = '';
            TECH_CATEGORIES.forEach(c => {
                const activeCls = (c.id === activeCategory) ? 'active' : '';
                html += `<button type="button" class="capsule-btn ${activeCls}" onclick="setCategory('${c.id}', this);">${c.label}</button>`;
            });
            categoryCapsules.innerHTML = html;
        }

function setCategory(cat, btn) {
            activeCategory = cat;
            document.querySelectorAll('.capsule-btn').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
            renderExhibits();
            if (currentView === 'wall') renderPosterWall();
        }
