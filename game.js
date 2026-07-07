const firebaseConfig = {
    apiKey: "AIzaSyAaplM2DUxEw1STZ2J_BdK0Hx1OApRykXk",
    authDomain: "guesswho-f5e5e.firebaseapp.com",
    databaseURL: "https://guesswho-f5e5e-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "guesswho-f5e5e",
    storageBucket: "guesswho-f5e5e.firebasestorage.app",
    messagingSenderId: "649791258212",
    appId: "1:649791258212:web:5fcf94cea7f822dfdba971"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// URL Parameter auslesen
const urlParams = new URLSearchParams(window.location.search);
const roomCode = urlParams.get('room');
const fandom = urlParams.get('fandom');
const myRole = urlParams.get('role'); // 'host' oder 'guest'

document.getElementById('display-room-code').innerText = roomCode;

let myTeam = null;

// BEISPIEL-POOL (Hier fügst du später all deine 115 Charaktere ein!)
const characterPools = {
    genshin: [
        { name: "Aether", img: "assets/genshin/aether.jpg" },
        { name: "Lumine", img: "assets/genshin/lumine.jpg" },
        { name: "Zhongli", img: "assets/genshin/zhongli.jpg" },
        { name: "Raiden Shogun", img: "assets/genshin/raiden.jpg" },
        { name: "Furina", img: "assets/genshin/furina.jpg" },
        { name: "Venti", img: "assets/genshin/venti.jpg" },
        { name: "Nahida", img: "assets/genshin/nahida.jpg" },
        { name: "Diluc", img: "assets/genshin/diluc.jpg" }
        // ... fülle das beliebig auf 40+ auf
    ],
    mha: [
        { name: "Deku", img: "assets/mha/deku.jpg" },
        { name: "Bakugo", img: "assets/mha/bakugo.jpg" },
        { name: "Todoroki", img: "assets/mha/todoroki.jpg" },
        { name: "All Might", img: "assets/mha/allmight.jpg" }
    ]
};

// Falls der Pool zu klein ist, füllen wir ihn für diesen Test kurz künstlich auf, damit das Script nicht abstürzt
while(characterPools.genshin.length < 40) {
    characterPools.genshin.push({name: "Platzhalter " + characterPools.genshin.length, img: "assets/genshin.jpg"});
}

// 1. Echtzeit-Lobbyüberwachung (Teamwahl)
const roomRef = database.ref('rooms/' + roomCode);

roomRef.on('value', (snapshot) => {
    const roomData = snapshot.val();
    if (!roomData) return;

    // Buttons sperren, wenn ein Team schon besetzt ist
    document.getElementById('btn-team-blue').disabled = !!roomData.teamBlue;
    document.getElementById('btn-team-red').disabled = !!roomData.teamRed;

    // Wenn beide Teams besetzt sind, startet das Spiel!
    if (roomData.teamBlue && roomData.teamRed) {
        startGame(roomData);
    }
});

// Buttons für Teamwahl aktivieren
document.getElementById('btn-team-blue').addEventListener('click', () => selectTeam('teamBlue'));
document.getElementById('btn-team-red').addEventListener('click', () => selectTeam('teamRed'));

function selectTeam(teamKey) {
    myTeam = teamKey === 'teamBlue' ? 'Blau' : 'Rot';
    document.getElementById('player-team-text').innerText = "Team " + myTeam;

    // In Firebase eintragen, dass ich dieses Team habe
    roomRef.update({ [teamKey]: myRole });

    // Wenn ich der Host bin, generiere ICH jetzt die 40 Charaktere für das Board
    if (myRole === 'host') {
        generateSharedBoard();
    }
}

// Nur der Host würfelt die 40 Karten aus
function generateSharedBoard() {
    const fullPool = characterPools[fandom] || [];
    // Array mischen (Shuffle)
    const shuffled = fullPool.sort(() => 0.5 - Math.random());
    // Die ersten 40 auswählen
    const selectedCards = shuffled.slice(0, 40);

    // Host bestimmt auch die geheimen Charaktere für beide Teams zufällig aus den 40 Karten
    const secretBlue = selectedCards[Math.floor(Math.random() * 40)].name;
    const secretRed = selectedCards[Math.floor(Math.random() * 40)].name;

    roomRef.update({
        boardCards: selectedCards,
        secretBlue: secretBlue,
        secretRed: secretRed
    });
}

// 2. Spiel starten und Boards zeichnen
function startGame(roomData) {
    // Lobby ausblenden, Spiel einblenden
    document.getElementById('lobby-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');

    // Geheimen Charakter anzeigen (je nachdem in welchem Team ich bin)
    const mySecret = myTeam === 'Blau' ? roomData.secretBlue : roomData.secretRed;
    document.getElementById('secret-character-name').innerText = mySecret;

    // Spielfeld leeren und neu aufbauen
    const boardGrid = document.getElementById('grid-board');
    boardGrid.innerHTML = "";

    roomData.boardCards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = "char-card";
        cardDiv.innerHTML = `
            <img src="${card.img}" alt="${card.name}">
            <p>${card.name}</p>
        `;

        // Klassische "Wer ist es?" Logik: Anklicken dreht die Karte um (wird grau)
        cardDiv.addEventListener('click', () => {
            cardDiv.classList.toggle('flipped');
        });

        boardGrid.appendChild(cardDiv);
    });
}