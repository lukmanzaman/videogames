# Museum of Video Games & Interactive Media

Visual Infographic Museum & Continuous Reading Stream.

- **Koleksi**: Video Game Hardware, Genre Evolution, Game Design & Ludology, Engine Technologies, Auteurs, Audio & Sound Design, Gaming Culture, and Industry Economics.
- **Total Visual**: 998 poster infografis beresolusi tinggi (format JPG rasio ~1:2.76, ~530 KB per poster).
- **Struktur Kurikulum**: 8 Paviliun Utama (57 Submodul).
- **Repository**: [lukmanzaman/videogames](https://github.com/lukmanzaman/videogames)

## Cara Menjalankan Secara Lokal
Buka berkas `index.html` langsung dengan klik ganda di Windows File Explorer atau peramban web pilihan Anda (Chrome, Edge, Firefox). Mendukung penuh protokol lokal `file:///` tanpa perlu web server lokal.

## Deployment ke GitHub Pages
Repositori ini telah dirancang 100% *self-contained*:
1. Aktifkan **GitHub Pages** pada repositori ini di menu *Settings > Pages*.
2. Pilih source **Deploy from a branch**, Branch: `main`, folder: `/` (root).
3. Klik **Save**. Web viewer interaktif langsung dapat diakses secara publik.

## Struktur Berkas
- `index.html`: Web viewer responsif dengan Spatial 3D Hero, Exhibits Stage, Full Poster Wall, dan Fast Continuous Stream Reader.
- `css/`: Desain modular (variables, layout, exhibits, reader, wall, stream, controls, toast). Dilengkapi dengan adaptive uniform scale fit-width.
- `js/`: Engine interaktif, dataset katalog (`data.js`), konfigurasi & kamus sinonim (`config.js`), dan komponen modular.
- `favicon.png`: Ikon web resmi.
