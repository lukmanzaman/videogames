if (typeof window !== 'undefined' && window.history && 'scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        const libraryData = rawLibraryData;
        let homeScrollY = 0;


        const folderMap = {};
        libraryData.forEach(f => { folderMap[f.rawName] = f; });

        const homeView = document.getElementById('homeView');
        const readerView = document.getElementById('readerView');
        const heroPosterDeck = document.getElementById('heroPosterDeck');
        const exhibitsGrid = document.getElementById('exhibitsGrid');
        const posterWallGrid = document.getElementById('posterWallGrid');
        const categoryCapsules = document.getElementById('categoryCapsules');
        const matrixSearchInput = document.getElementById('matrixSearchInput');
        const doomFeed = document.getElementById('doomFeed');
        const nav = document.getElementById('readerNav');
        const navFolderTitle = document.getElementById('navFolderTitle');
        const navPickerBtn = document.getElementById('navPickerBtn');
        const navPickerDropdown = document.getElementById('navPickerDropdown');
        const navPickerLabel = document.getElementById('navPickerLabel');
        const navPickerList = document.getElementById('navPickerList');
        const pickerTotalBadge = document.getElementById('pickerTotalBadge');

        let currentView = 'exhibits';
        let activeCategory = 'all';
        let currentSearch = '';
        let currentFeedImages = [];
        let currentFolderRaw = null;
        let currentActiveIdx = 0;
        let observer = null;
        let isNavVisible = false;
        let isRestoring = false;
