// Charakter-Pools pro Fandom.
// Jedes Fandom braucht MINDESTENS 40 Charaktere, damit die Auswahl sauber funktioniert.
// "id" muss innerhalb eines Fandoms eindeutig sein. "img" zeigt auf dein Bilder-Verzeichnis.
//
// -> Einfach hier für jedes Fandom die echten Charaktere eintragen.
// Platzhalter-Einträge sind bereits als Beispiel für "acnh" vorbereitet (40 Stück).

const CHARACTER_POOLS = {
    acnh: [
        // Manuell eingetragene, echte Charaktere:
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
        { id: "acnh_tom_nook", name: "Tom Nook", img: "img/tomnook.jpg" },
    ],

    disney: Array.from({ length: 45 }, (_, i) => ({
        id: `disney_${i + 1}`,
        name: `Charakter ${i + 1}`,
        img: `img/disney/character_${i + 1}.jpg`
    })),

    genshin: Array.from({ length: 45 }, (_, i) => ({
        id: `genshin_${i + 1}`,
        name: `Charakter ${i + 1}`,
        img: `img/genshin/character_${i + 1}.jpg`
    })),

    mlbb: Array.from({ length: 45 }, (_, i) => ({
        id: `mlbb_${i + 1}`,
        name: `Charakter ${i + 1}`,
        img: `img/mlbb/character_${i + 1}.jpg`
    })),

    mha: Array.from({ length: 45 }, (_, i) => ({
        id: `mha_${i + 1}`,
        name: `Charakter ${i + 1}`,
        img: `img/mha/character_${i + 1}.jpg`
    })),

    pokemon: Array.from({ length: 45 }, (_, i) => ({
        id: `pokemon_${i + 1}`,
        name: `Charakter ${i + 1}`,
        img: `img/pokemon/character_${i + 1}.jpg`
    }))
};

const BOARD_SIZE = 42;