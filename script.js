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

let selectedFandom = null;

// 1. Fandom Auswahl
const fandomCards = document.querySelectorAll('.fandom-card');
fandomCards.forEach(card => {
    card.addEventListener('click', () => {
        fandomCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedFandom = card.getAttribute('data-fandom');
    });
});

// Code Generator
function generateRoomCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// 2. RAUM ERSTELLEN (In Firebase speichern)
const btnCreateRoom = document.getElementById('btn-create-room');
btnCreateRoom.addEventListener('click', () => {
    if (!selectedFandom) {
        alert("Bitte wähle zuerst ein Fandom aus!");
        return;
    }

    const roomCode = generateRoomCode();

    // Wir speichern den Raum in Firebase unter "rooms/CODE"
    database.ref('rooms/' + roomCode).set({
        fandom: selectedFandom,
        status: "waiting",
        hostConnected: true,
        guestConnected: false
    }).then(() => {
        // Weiterleitung zur Spielseite mit Parametern in der URL
        window.location.href = `game.html?room=${roomCode}&role=host&fandom=${selectedFandom}`;
    }).catch(error => {
        console.error("Fehler beim Erstellen des Raums:", error);
    });
});

// 3. RAUM BEITRETEN (In Firebase prüfen)
const btnJoinRoom = document.getElementById('btn-join-room');
const roomCodeInput = document.getElementById('room-code-input');

btnJoinRoom.addEventListener('click', () => {
    const enteredCode = roomCodeInput.value.trim().toUpperCase();

    if (enteredCode.length !== 4) {
        alert("Bitte gib einen 4-stelligen Code ein!");
        return;
    }

    // In Firebase schauen, ob dieser Raum existiert
    database.ref('rooms/' + enteredCode).once('value').then((snapshot) => {
        if (snapshot.exists()) {
            const roomData = snapshot.val();

            if (roomData.guestConnected) {
                alert("Dieser Raum ist bereits voll!");
                return;
            }

            // Dem Raum in Firebase mitteilen, dass ein Gast beitritt
            database.ref('rooms/' + enteredCode).update({
                guestConnected: true,
                status: "playing"
            });

            // Weiterleitung zur Spielseite als Gast
            window.location.href = `game.html?room=${enteredCode}&role=guest&fandom=${roomData.fandom}`;
        } else {
            alert("Dieser Raum-Code existiert nicht!");
        }
    });
});