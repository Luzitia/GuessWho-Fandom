// Variablen für die Auswahl speichern
let selectedFandom = null;

// 1. Fandom-Auswahl Logik
const fandomCards = document.querySelectorAll('.fandom-card');

fandomCards.forEach(card => {
    card.addEventListener('click', () => {
        // Vorherige Auswahl aufheben
        fandomCards.forEach(c => c.classList.remove('selected'));

        // Neue Karte auswählen
        card.classList.add('selected');
        // Das gewählte Fandom aus dem "data-fandom" Attribut auslesen (genshin, mha, acnh)
        selectedFandom = card.getAttribute('data-fandom');

        console.log("Ausgewähltes Fandom:", selectedFandom);
    });
});

// 2. Funktion um einen zufälligen Raum-Code zu generieren (z.B. A8F3)
function generateRoomCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// 3. "Raum erstellen" Button
const btnCreateRoom = document.getElementById('btn-create-room');
btnCreateRoom.addEventListener('click', () => {
    if (!selectedFandom) {
        alert("Bitte wähle zuerst ein Fandom aus!");
        return;
    }

    const roomCode = generateRoomCode();
    console.log(`Raum wird erstellt! Fandom: ${selectedFandom}, Code: ${roomCode}`);

    // HIER kommt im nächsten Schritt die Firebase-Verbindung hin!
    // Fürs Erste simulieren wir den Erfolg:
    alert(`Raum erfolgreich erstellt!\nThema: ${selectedFandom}\nCode: ${roomCode}\n\n(Im nächsten Schritt verbindet uns das mit der Echtzeit-Datenbank!)`);

    // Später leiten wir hier weiter, z.B.:
    // window.location.href = `${selectedFandom}.html?room=${roomCode}&role=host`;
});

// 4. "Raum beitreten" Button
const btnJoinRoom = document.getElementById('btn-join-room');
const roomCodeInput = document.getElementById('room-code-input');

btnJoinRoom.addEventListener('click', () => {
    const enteredCode = roomCodeInput.value.trim().toUpperCase();

    if (enteredCode.length !== 4) {
        alert("Bitte gib einen gültigen 4-stelligen Raum-Code ein!");
        return;
    }

    console.log("Versuche Raum beizutreten mit Code:", enteredCode);

    // HIER prüfen wir später via Firebase, welches Fandom zu diesem Code gehört.
    alert(`Suche nach Raum ${enteredCode}... (Firebase-Verbindung folgt im nächsten Schritt)`);
});