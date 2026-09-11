        function switchView(view) {
            currentView = view;
            if (view === 'exhibits') {
                document.getElementById('tabExhibitsBtn').classList.add('active');
                document.getElementById('tabWallBtn').classList.remove('active');
                exhibitsGrid.style.display = 'grid';
                posterWallGrid.style.display = 'none';
            } else {
                document.getElementById('tabWallBtn').classList.add('active');
                document.getElementById('tabExhibitsBtn').classList.remove('active');
                exhibitsGrid.style.display = 'none';
                posterWallGrid.style.display = 'grid';
                renderPosterWall();
            }
        }

        function handleSearch(val) {
            currentSearch = val;
            renderExhibits();
            if (currentView === 'wall') renderPosterWall();
        }

        function checkUrlHash() {
            const hash = window.location.hash.replace('#', '');
            if (hash && folderMap[hash]) {
                openReader(hash, 0, false);
            }
        }

        function init() {
            renderHeroDeck();
            renderCategoryCapsules();
            renderExhibits();
            renderPosterWall();
            setupReaderInteraction();
            checkUrlHash();
        }

window.addEventListener('popstate', () => {
            const hash = window.location.hash.replace('#', '');
            if (!hash && readerView.style.display === 'block') {
                closeReader(false);
            } else if (hash && folderMap[hash] && readerView.style.display !== 'block') {
                openReader(hash, 0, false);
            }
        });

        document.addEventListener('DOMContentLoaded', init);
