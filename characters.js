// Charakter-Pools pro Fandom.
// Jedes Fandom braucht MINDESTENS 40 Charaktere, damit die Auswahl sauber funktioniert.
// "id" muss innerhalb eines Fandoms eindeutig sein. "img" zeigt auf dein Bilder-Verzeichnis.
//
// -> Einfach hier für jedes Fandom die echten Charaktere eintragen.
// Platzhalter-Einträge sind bereits als Beispiel für "acnh" vorbereitet (40 Stück).

const CHARACTER_POOLS = {
    acnh: [
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

    genshin: [
        { id: "genshin_keqing", name: "Keqing", img: "img/keqing.jpg" },
        { id: "genshin_qiqi", name: "Qiqi", img: "img/qiqi.jpg" },
        { id: "genshin_chonyun", name: "Chonyun", img: "img/chonyun.jpg" },
        { id: "genshin_xingqiu", name: "Xingqiu", img: "img/xingqiu.jpg" },
        { id: "genshin_xiangling", name: "Xiangling", img: "img/xiangling.jpg" },
        { id: "genshin_ningguang", name: "Ningguang", img: "img/ningguang.jpg" },
        { id: "genshin_mona", name: "Mona", img: "img/mona.jpg" },
        { id: "genshin_sucrose", name: "Sucrose", img: "img/sucrose.jpg" },
        { id: "genshin_fischl", name: "Fischl", img: "img/fischl.jpg" },
        { id: "genshin_noelle", name: "Noelle", img: "img/noelle.jpg" },
        { id: "genshin_bennett", name: "Bennett", img: "img/bennett.jpg" },
        { id: "genshin_", name: "", img: "img/" },
        { id: "genshin_", name: "", img: "img/" },
        { id: "genshin_", name: "", img: "img/" },
        { id: "genshin_", name: "", img: "img/" },
        { id: "genshin_", name: "", img: "img/" },
        { id: "genshin_", name: "", img: "img/" },
        { id: "genshin_", name: "", img: "img/" },
        { id: "genshin_", name: "", img: "img/" },
        { id: "genshin_", name: "", img: "img/" },
        { id: "genshin_", name: "", img: "img/" },
        { id: "genshin_", name: "", img: "img/" },
        { id: "genshin_", name: "", img: "img/" },
        { id: "genshin_", name: "", img: "img/" },
        { id: "genshin_", name: "", img: "img/" },
        { id: "genshin_", name: "", img: "img/" },
        { id: "genshin_", name: "", img: "img/" },
        { id: "genshin_", name: "", img: "img/" },
        { id: "genshin_", name: "", img: "img/" },
        { id: "genshin_", name: "", img: "img/" },
        { id: "genshin_", name: "", img: "img/" },
    ],

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

const BOARD_SIZE = 30;