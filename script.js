import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, onValue, update } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// --- CHARAKTER POOLS ---
const characterPools = {
    genshin: [
        { id: 1, name: "Aether", img: "https://placehold.co/120x140/34495e/fff?text=Aether" },
        { id: 2, name: "Lumine", img: "https://placehold.co/120x140/7f8c8d/fff?text=Lumine" },
        { id: 3, name: "Zhongli", img: "https://placehold.co/120x140/1a252f/fff?text=Zhongli" },
        { id: 4, name: "Raiden", img: "https://placehold.co/120x140/8e44ad/fff?text=Raiden" },
        { id: 5, name: "Venti", img: "https://placehold.co/120x140/27ae60/fff?text=Venti" },
        { id: 6, name: "Diluc", img: "https://placehold.co/120x140/c0392b/fff?text=Diluc" }
    ],
    crossing: [
        { id: 1, name: "Tom Nook", img: "https://placehold.co/120x140/d35400/fff?text=Tom+Nook" },
        { id: 2, name: "Isabelle", img: "https://placehold.co/120x140/f1c40f/333?text=Isabelle" },
        { id: 3, name: "K.K. Slider", img: "https://placehold.co/120x140/ecf0f1/333?text=K.K.+Slider" },
        { id: 4, name: "Blathers", img: "https://placehold.co/120x140/795548/fff?text=Blathers" },
        { id: 5, name: "Raymond", img: "https://placehold.co/120x140/34495e/fff?text=Raymond" },
        { id: 6, name: "Ankha", img: "https://placehold.co/120x140/f39c12/fff?text=Ankha" }
    ]
};
const BOARD_SIZE = 4;

// --- FIREBASE KONFIGURATION ---
// ERSETZE DIESE WERTE MIT DEINEN EIGENEN FIREBASE CODES:
const firebaseConfig = {
    apiKey: "DEIN_API_KEY",
    authDomain: "DEIN_PROJEKT.firebaseapp.com",
    databaseURL: "https://DEIN_PROJEKT-default-rtdb.firebaseio.com",
    projectId: "DEIN_PROJEKT",
    storageBucket: "DEIN_PROJEKT.appspot.com",
    messagingSenderId: "DEINE_ID",
    appId: "DEINE_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const gameRef = ref(db, "games/global_room");

function shuffle(array) {
    let cur = array.length, rnd;
    while (cur != 0) {
        rnd = Math.floor(Math.random() * cur); cur--;
        [array[cur], array[rnd]] = [array[rnd], array[cur]];
    }
    return array;
}

const isMenu = document.getElementById("menu-container") !== null;
const isGame = document.getElementById("game-container") !== null;

// --- MENÜ (index.html) ---
if (isMenu) {
    const roleSelect = document.getElementById("role-select");
    const themeSelect = document.getElementById("theme-select");
    const startBtn = document.getElementById("start-btn");

    roleSelect.addEventListener("change", (e) => {
        themeSelect.disabled = (e.target.value === "p2");
    });

    startBtn.addEventListener("click", () => {
        const role = roleSelect.value;
        sessionStorage.setItem("myRole", role);

        if (role === "p1") {
            const theme = themeSelect.value;
            const fullPool = [...characterPools[theme]];
            const boardChars = shuffle(fullPool).slice(0, BOARD_SIZE);

            const initialGameState = {
                theme: theme,
                board: boardChars,
                phase: 'selecting',
                p1TargetId: "",
                p2TargetId: "",
                p1Flipped: "",
                p2Flipped: "",
                winner: ""
            };
            set(gameRef, initialGameState).then(() => {
                window.location.href = "game.html";
            });
        } else {
            window.location.href = "game.html";
        }
    });
}

// --- SPIEL (game.html) ---
if (isGame) {
    const myRole = sessionStorage.getItem("myRole") || "p1";
    const opponentRole = (myRole === "p1") ? "p2" : "p1";

    const playerTitle = document.getElementById("player-title");
    const opponentCounter = document.getElementById("opponent-counter");
    const statusBanner = document.getElementById("status-banner");
    const boardContainer = document.getElementById("board");
    const secretCard = document.getElementById("secret-card");
    const globalGuessBtn = document.getElementById("global-guess-btn");

    playerTitle.innerText = (myRole === "p1") ? "Spieler 1 (Host)" : "Spieler 2 (Gast)";
    let guessModeActive = false;

    onValue(gameRef, (snapshot) => {
        const state = snapshot.val();
        if (!state) {
            statusBanner.innerText = "Warte auf Spieler 1...";
            return;
        }
        renderGame(state);
    });

    function renderGame(state) {
        document.body.className = "theme-" + state.theme;

        const myFlipped = state[myRole + "Flipped"] ? state[myRole + "Flipped"].split(",") : [];
        const oppFlipped = state[opponentRole + "Flipped"] ? state[opponentRole + "Flipped"].split(",") : [];

        const oppOpenCards = BOARD_SIZE - oppFlipped.length;
        opponentCounter.innerText = `Gegner hat noch ${oppOpenCards}/${BOARD_SIZE} Karten offen`;

        const myTargetId = state[myRole + "TargetId"];
        if (myTargetId) {
            const targetChar = state.board.find(c => c.id == myTargetId);
            secretCard.innerHTML = `<img src="${targetChar.img}" class="card-img"><div class="card-name">${targetChar.name}</div>`;
            secretCard.classList.remove("empty");
        } else {
            secretCard.innerText = "Wähle eine Karte!";
            secretCard.classList.add("empty");
        }

        if (state.phase === 'selecting') {
            globalGuessBtn.disabled = true;
            if (!myTargetId) {
                statusBanner.innerText = "Phase 1: Klicke unten auf eine Karte, um dein Geheimnis festzulegen!";
                statusBanner.style.backgroundColor = "#e67e22";
            } else {
                statusBanner.innerText = "Warte auf die Wahl des Gegners...";
                statusBanner.style.backgroundColor = "#95a5a6";
            }
        } else if (state.phase === 'playing') {
            globalGuessBtn.disabled = false;
            if (!guessModeActive) {
                statusBanner.innerText = "Phase 2: Raten! Linksklick klappt Karten um. Drücke links auf 'Lösen' für den finalen Tipp.";
                statusBanner.style.backgroundColor = "var(--primary-color)";
            }
        } else if (state.phase === 'finished') {
            globalGuessBtn.disabled = true;
            guessModeActive = false;
            globalGuessBtn.classList.remove("active");
            const iWon = (state.winner === myRole);
            statusBanner.innerText = iWon ? "🎉 DU HAST GEWONNEN! 🎉" : "❌ DU HAST VERLOREN!";
            statusBanner.style.backgroundColor = iWon ? "#2ecc71" : "#e74c3c";
        }

        boardContainer.innerHTML = "";
        state.board.forEach(char => {
            const card = document.createElement("div");
            card.className = "card";

            if (myFlipped.includes(char.id.toString())) {
                card.classList.add("flipped");
            }

            card.innerHTML = `
                <img src="${char.img}" class="card-img" alt="${char.name}">
                <div class="card-name">${char.name}</div>
            `;

            card.addEventListener("click", () => {
                if (state.phase === 'selecting' && !myTargetId) {
                    const updates = {};
                    updates[myRole + "TargetId"] = char.id;
                    if ((myRole === 'p1' && state.p2TargetId) || (myRole === 'p2' && state.p1TargetId)) {
                        updates["phase"] = "playing";
                    }
                    update(gameRef, updates);
                }
                else if (state.phase === 'playing') {
                    if (guessModeActive) {
                        executeFinalGuess(char.id, state);
                    } else {
                        let index = myFlipped.indexOf(char.id.toString());
                        if (index > -1) myFlipped.splice(index, 1);
                        else myFlipped.push(char.id.toString());

                        const updates = {};
                        updates[myRole + "Flipped"] = myFlipped.join(",");
                        update(gameRef, updates);
                    }
                }
            });
            boardContainer.appendChild(card);
        });
    }

    globalGuessBtn.addEventListener("click", () => {
        guessModeActive = !guessModeActive;
        if (guessModeActive) {
            globalGuessBtn.classList.add("active");
            boardContainer.classList.add("guess-mode-active");
            statusBanner.innerText = "🚨 ANKLAGE-MODUS! Klicke jetzt auf den Charakter, den du einloggen willst!";
            statusBanner.style.backgroundColor = "#e74c3c";
        } else {
            globalGuessBtn.classList.remove("active");
            boardContainer.classList.remove("guess-mode-active");
            statusBanner.innerText = "Phase 2: Raten!";
            statusBanner.style.backgroundColor = "var(--primary-color)";
        }
    });

    function executeFinalGuess(guessedId, state) {
        const confirmGuess = confirm(`Möchtest du wirklich "${state.board.find(c => c.id == guessedId).name}" einloggen?`);
        if (!confirmGuess) return;

        const opponentTargetId = state[opponentRole + "TargetId"];
        const updates = { phase: "finished" };

        if (parseInt(guessedId) === parseInt(opponentTargetId)) {
            updates["winner"] = myRole;
        } else {
            updates["winner"] = opponentRole;
        }

        guessModeActive = false;
        globalGuessBtn.classList.remove("active");
        boardContainer.classList.remove("guess-mode-active");
        update(gameRef, updates);
    }
}