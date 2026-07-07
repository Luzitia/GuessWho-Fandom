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

// --- URL Parameter auslesen ---
const urlParams = new URLSearchParams(window.location.search);
const roomCode = urlParams.get('room');
const role = urlParams.get('role'); // "host" oder "guest"
const fandom = urlParams.get('fandom');

if (!roomCode || !role || !fandom) {
    alert("Ungültiger Raum-Link. Du wirst zur Startseite weitergeleitet.");
    window.location.href = "index.html";
}

const roomRef = database.ref('rooms/' + roomCode);

// Mein eigenes Farbe/Rolle
let myColor = null; // "blau" oder "rot"
let mySecretPicked = false;
let gameEnded = false;
let currentBoard = []; // Array von Charakter-Objekten in fixer Reihenfolge
let flippedIds = new Set(); // lokal umgedrehte Karten (nur eigene Ansicht)

const boardEl = document.getElementById('game-board');
const guessBoardEl = document.getElementById('guess-board');
const statusText = document.getElementById('status-text');
const roomCodeDisplay = document.getElementById('room-code-display');
const playerColorDisplay = document.getElementById('player-color-display');
const secretBox = document.getElementById('secret-character-box');
const btnGuess = document.getElementById('btn-guess');

const secretModal = document.getElementById('secret-modal');
const btnCancelSecretPick = document.getElementById('btn-cancel-secret-pick');
const guessModal = document.getElementById('guess-modal');
const btnCancelGuess = document.getElementById('btn-cancel-guess');
const endModal = document.getElementById('end-modal');
const endTitle = document.getElementById('end-title');
const endText = document.getElementById('end-text');
const btnBackHome = document.getElementById('btn-back-home');

roomCodeDisplay.textContent = `Raum: ${roomCode}`;

let pickingSecretMode = false;
let pickingGuessMode = false;
let selectedGuessId = null;

// --- Hilfsfunktionen ---

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function buildBoard(fandomKey) {
    const pool = CHARACTER_POOLS[fandomKey];
    if (!pool || pool.length < BOARD_SIZE) {
        console.error("Charakter-Pool zu klein oder nicht vorhanden für Fandom:", fandomKey);
        return [];
    }
    return shuffleArray(pool).slice(0, BOARD_SIZE);
}

function renderBoard(container, board, { clickable, mode }) {
    container.innerHTML = '';
    board.forEach(char => {
        const card = document.createElement('div');
        card.className = 'char-card';
        card.dataset.charId = char.id;

        if (mode === 'main' && flippedIds.has(char.id)) {
            card.classList.add('flipped');
        }
        if (mode === 'guess' && char.id === selectedGuessId) {
            card.classList.add('selected-guess');
        }

        card.innerHTML = `
            <img src="${char.img}" alt="${char.name}">
            <div class="char-name">${char.name}</div>
        `;

        if (clickable) {
            card.addEventListener('click', () => handleCardClick(char, mode));
        }

        container.appendChild(card);
    });
}

function handleCardClick(char, mode) {
    if (mode === 'main') {
        if (pickingSecretMode) {
            pickSecretCharacter(char);
            return;
        }
        // Karte lokal umdrehen (kein Firebase-Sync nötig, ist nur eigene Merkhilfe)
        if (flippedIds.has(char.id)) {
            flippedIds.delete(char.id);
        } else {
            flippedIds.add(char.id);
        }
        renderBoard(boardEl, currentBoard, { clickable: true, mode: 'main' });
    } else if (mode === 'guess') {
        selectedGuessId = char.id;
        renderBoard(guessBoardEl, currentBoard, { clickable: true, mode: 'guess' });
    }
}

function renderSecretBox(char) {
    secretBox.innerHTML = `
        <div class="secret-card">
            <img src="${char.img}" alt="${char.name}">
            <p>${char.name}</p>
        </div>
    `;
}

// --- Geheimcharakter auswählen ---

function pickSecretCharacter(char) {
    pickingSecretMode = false;
    secretModal.classList.add('hidden');
    mySecretPicked = true;
    renderSecretBox(char);

    const myField = myColor === 'blau' ? 'blauSecret' : 'rotSecret';
    roomRef.child(myField).set(char.id);
}

// --- Raum-Setup: Farbe zuweisen, Board erstellen (nur Host) ---

function initRoom() {
    roomRef.once('value').then(snapshot => {
        const room = snapshot.val();
        if (!room) {
            alert("Dieser Raum existiert nicht mehr.");
            window.location.href = "index.html";
            return;
        }

        if (role === 'host') {
            // Host generiert Board + Farbzuteilung EINMALIG, falls noch nicht vorhanden
            if (!room.board) {
                const board = buildBoard(fandom).map(c => c.id);
                const hostIsBlau = Math.random() < 0.5;

                roomRef.update({
                    board: board,
                    hostColor: hostIsBlau ? 'blau' : 'rot',
                    guestColor: hostIsBlau ? 'rot' : 'blau',
                    blauSecret: null,
                    rotSecret: null,
                    guessResult: null
                });
            }
        }

        listenToRoom();
    });
}

function listenToRoom() {
    roomRef.on('value', snapshot => {
        const room = snapshot.val();
        if (!room) {
            // Raum wurde gelöscht (Spiel vorbei / abgebrochen)
            return;
        }

        // Board initial aufbauen, sobald verfügbar
        if (room.board && currentBoard.length === 0) {
            currentBoard = room.board.map(id => {
                const pool = CHARACTER_POOLS[fandom];
                return pool.find(c => c.id === id);
            }).filter(Boolean);

            renderBoard(boardEl, currentBoard, { clickable: true, mode: 'main' });
        }

        // Meine Farbe bestimmen
        if (room.hostColor && room.guestColor && !myColor) {
            myColor = role === 'host' ? room.hostColor : room.guestColor;
            playerColorDisplay.textContent = myColor.toUpperCase();
            playerColorDisplay.classList.add(myColor);
        }

        // Status-Text updaten
        updateStatus(room);

        // Gewinn-Check
        if (room.guessResult && !gameEnded) {
            handleGameEnd(room.guessResult);
        }
    });
}

function updateStatus(room) {
    if (!room.guestConnected) {
        statusText.textContent = "Warte auf Mitspieler...";
        btnGuess.disabled = true;
        return;
    }

    const mySecret = myColor === 'blau' ? room.blauSecret : room.rotSecret;
    const opponentSecret = myColor === 'blau' ? room.rotSecret : room.blauSecret;

    if (!mySecret) {
        statusText.textContent = "Wähle deinen Geheimcharakter (Klick auf 'Geheimcharakter wählen')!";
    } else if (!opponentSecret) {
        statusText.textContent = "Warte, bis dein Gegner seinen Geheimcharakter gewählt hat...";
        btnGuess.disabled = true;
    } else {
        statusText.textContent = "Das Spiel läuft! Stelle Fragen und rate, wenn du bereit bist.";
        btnGuess.disabled = false;
    }
}

const btnPickSecret = document.getElementById('btn-pick-secret');
btnPickSecret.addEventListener('click', () => {
    if (mySecretPicked) {
        alert("Du hast bereits einen Geheimcharakter gewählt. Dieser kann nicht mehr geändert werden.");
        return;
    }
    if (currentBoard.length === 0) {
        alert("Das Spielbrett wird noch geladen, bitte kurz warten.");
        return;
    }
    pickingSecretMode = true;
    secretModal.classList.remove('hidden');
});

btnCancelSecretPick.addEventListener('click', () => {
    secretModal.classList.add('hidden');
    pickingSecretMode = false;
});

// --- Lösung raten ---

btnGuess.addEventListener('click', () => {
    if (btnGuess.disabled) return;
    selectedGuessId = null;
    renderBoard(guessBoardEl, currentBoard, { clickable: true, mode: 'guess' });
    guessModal.classList.remove('hidden');
});

btnCancelGuess.addEventListener('click', () => {
    guessModal.classList.add('hidden');
});

// Bestätigen-Button dynamisch einfügen (Guess-Modal braucht noch einen Confirm-Button)
const btnConfirmGuess = document.createElement('button');
btnConfirmGuess.className = 'btn';
btnConfirmGuess.textContent = 'Bestätigen';
btnConfirmGuess.style.marginLeft = '10px';
btnCancelGuess.insertAdjacentElement('beforebegin', btnConfirmGuess);

btnConfirmGuess.addEventListener('click', () => {
    if (!selectedGuessId) {
        alert("Bitte wähle zuerst einen Charakter aus!");
        return;
    }

    roomRef.once('value').then(snapshot => {
        const room = snapshot.val();
        const opponentSecret = myColor === 'blau' ? room.rotSecret : room.blauSecret;

        const isCorrect = selectedGuessId === opponentSecret;
        const winnerColor = isCorrect ? myColor : (myColor === 'blau' ? 'rot' : 'blau');

        roomRef.update({
            guessResult: {
                winner: winnerColor,
                guesserColor: myColor,
                wasCorrect: isCorrect
            }
        });

        guessModal.classList.add('hidden');
    });
});

// --- Spielende ---

function handleGameEnd(guessResult) {
    gameEnded = true;
    const iWon = guessResult.winner === myColor;

    endTitle.textContent = iWon ? "🎉 Du hast gewonnen!" : "😢 Du hast verloren!";
    endText.textContent = iWon
        ? "Du hast den Geheimcharakter richtig erraten."
        : (guessResult.wasCorrect === false && guessResult.guesserColor === myColor
            ? "Deine Vermutung war leider falsch."
            : "Dein Gegner hat den richtigen Charakter erraten.");

    endModal.classList.remove('hidden');

    // Raum nach kurzer Verzögerung löschen (nur einmal, egal wer zuerst dran ist)
    if (role === 'host') {
        setTimeout(() => {
            roomRef.remove();
        }, 1000);
    }
}

btnBackHome.addEventListener('click', () => {
    window.location.href = "index.html";
});

// Falls der Raum von außen gelöscht wird (z.B. Gegner hat Seite verlassen -> optional)
roomRef.on('value', snapshot => {
    if (!snapshot.exists() && currentBoard.length > 0 && !gameEnded) {
        // Raum wurde gelöscht, während das Spiel noch lief
        gameEnded = true;
        endTitle.textContent = "Spiel beendet";
        endText.textContent = "Der Raum wurde geschlossen.";
        endModal.classList.remove('hidden');
    }
});

initRoom();