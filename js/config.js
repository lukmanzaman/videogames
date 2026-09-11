// Configuration for VIS Museum of Video Games & Interactive Media
const STORAGE_KEY = 'vis_videogames_positions';

const TECH_CATEGORIES = [
    {
        "id": "all",
        "label": "Semua Koleksi",
        "icon": "✨"
    },
    {
        "id": "R1",
        "label": "Perangkat Keras & Konsol",
        "icon": "🕹️",
        "title": "History of Video Game Hardware & Console Wars"
    },
    {
        "id": "R2",
        "label": "Evolusi Genre & Mahakarya",
        "icon": "👾",
        "title": "Landmark Titles & Genre Evolution"
    },
    {
        "id": "R3",
        "label": "Filsafat Desain & Ludologi",
        "icon": "🎲",
        "title": "Game Design Philosophy, Mechanics & Ludology"
    },
    {
        "id": "R4",
        "label": "Teknologi Enjin & Grafika",
        "icon": "⚙️",
        "title": "Game Technology, Engines & Graphics"
    },
    {
        "id": "R5",
        "label": "Tokoh Pelopor & Sutradara",
        "icon": "👤",
        "title": "Pioneering Figures & Game Auteurs"
    },
    {
        "id": "R6",
        "label": "Musik & Desain Suara Gim",
        "icon": "🎧",
        "title": "Video Game Audio, Music & Sound Design"
    },
    {
        "id": "R7",
        "label": "Kultur Gim & Komunitas",
        "icon": "🌐",
        "title": "Gaming Culture, Communities & Social Impact"
    },
    {
        "id": "R8",
        "label": "Ekonomi Industri & Produksi",
        "icon": "💼",
        "title": "Game Industry Economics, Publishing & Production"
    }
];

const SYNONYMS = {
    // Hardware & Consoles
    "konsol": ["console", "hardware", "perangkat keras", "mesin", "sistem", "platform"],
    "console": ["konsol", "hardware", "mesin", "atari", "famicom", "nes", "snes", "playstation", "xbox", "sega"],
    "arkade": ["arcade", "coin-op", "koin", "dingdong", "cabinet", "kabinet"],
    "arcade": ["arkade", "coin-op", "koin", "dingdong", "kabinet"],
    "nintendo": ["nes", "famicom", "snes", "n64", "gamecube", "wii", "switch", "game boy", "mario", "zelda"],
    "sega": ["genesis", "mega drive", "master system", "saturn", "dreamcast", "sonic"],
    "sony": ["playstation", "ps1", "ps2", "ps3", "ps4", "ps5", "psp", "vita"],
    "microsoft": ["xbox", "xbox 360", "xbox one", "xbox series", "directx"],
    "portabel": ["handheld", "game boy", "psp", "ds", "switch", "steam deck"],
    "handheld": ["portabel", "game boy", "psp", "ds", "switch", "steam deck"],
    "prosesor": ["cpu", "chip", "silicon", "transistor", "microprocessor", "z80", "6502", "motorola 68000"],
    "grafis": ["graphics", "gpu", "rasterization", "polygon", "3d", "pixel", "sprite", "ray tracing", "shader"],

    // Genres & Landmark Titles
    "gim": ["game", "video game", "permainan", "ludology", "judul"],
    "game": ["gim", "video game", "permainan", "ludology", "title"],
    "platformer": ["mario", "sonic", "lompat", "side scrolling", "metroidvania", "castlevania"],
    "fps": ["first person shooter", "doom", "quake", "half life", "halo", "tembak", "penembak", "unreal"],
    "rpg": ["role playing", "jrpg", "wrpg", "final fantasy", "dragon quest", "skyrim", "baldur", "witcher"],
    "strategi": ["strategy", "rts", "turn-based", "civilization", "starcraft", "warcraft", "command & conquer"],
    "fighting": ["tarung", "street fighter", "tekken", "mortal kombat", "smash", "arcade"],
    "horror": ["survival horror", "resident evil", "silent hill", "psikologis", "teror"],
    "open world": ["dunia terbuka", "sandbox", "gta", "zelda", "red dead", "eksplorasi"],
    "roguelike": ["roguelite", "prosedural", "permadeath", "deckbuilder", "hades", "slay the spire"],

    // Design & Ludology
    "desain": ["game design", "rancang", "ludologi", "mekanika", "level design"],
    "mekanika": ["mechanics", "gameplay", "loop", "sistem", "aturan", "fisika"],
    "gameplay": ["mekanika", "loop", "interaksi", "game feel", "kontrol"],
    "level": ["level design", "tata ruang", "lingkungan", "peta", "navigasi"],
    "cerita": ["narrative", "narasi", "storytelling", "dialog", "plot", "lore"],
    "ui": ["interface", "antarmuka", "hud", "menu", "ux", "ergonomi"],

    // Technology & Engines
    "enjin": ["engine", "game engine", "unreal", "unity", "id tech", "cryengine", "godot"],
    "engine": ["enjin", "game engine", "unreal", "unity", "id tech", "source"],
    "fisika": ["physics", "ragdoll", "collision", "tabrakan", "simulasi"],
    "jaringan": ["network", "multiplayer", "netcode", "rollback", "server", "koneksi"],
    "ai": ["artificial intelligence", "kecerdasan buatan", "bot", "behavior tree", "fsm", "navmesh"],

    // People & Auteurs
    "tokoh": ["pioneer", "creator", "auteur", "sutradara", "developer", "perancang"],
    "miyamoto": ["shigeru miyamoto", "nintendo", "mario", "zelda", "donkey kong"],
    "kojima": ["hideo kojima", "metal gear", "death stranding", "auteur", "cinematic"],
    "carmack": ["john carmack", "id software", "doom", "quake", "3d engine"],

    // Audio & Music
    "musik": ["audio", "sound", "soundtrack", "ost", "lagu", "komposisi"],
    "audio": ["musik", "sound", "suara", "foley", "akustik", "spasial"],
    "chiptune": ["8-bit", "16-bit", "fm synthesis", "psg", "sid", "mod"],

    // Culture & Esports
    "kultur": ["culture", "budaya", "komunitas", "sosial", "fandom"],
    "esports": ["e-sports", "kompetisi", "turnamen", "pro player", "atlet"],
    "speedrun": ["speedrunning", "tas", "glitch", "rekor", "waktu tercepat"],
    "modding": ["mod", "custom", "modifikasi", "komunitas", "user generated"],

    // Economics & Industry
    "industri": ["industry", "bisnis", "ekonomi", "pasar", "studi"],
    "penerbit": ["publisher", "ea", "activision", "ubisoft", "distribusi"],
    "monetisasi": ["monetization", "f2p", "dlc", "microtransaction", "gaas", "langganan"],
    "indie": ["independen", "solo developer", "indie games", "small studio"]
};
