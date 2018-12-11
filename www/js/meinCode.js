/*jshint esversion: 6 */


/**
 * Event-Handler-Funktion für Erfolgsfall bei Aufruf von Funktion
 * navigator.contacts.find().
 */
function onKontakteGefunden(kontakteArray) {

    const anzahl = kontakteArray.length;

    if (anzahl === 0) {
        alert("Keine Einträge im Adressbuch gefunden.");
        return;
    }

    const listeKontakte = $("#listeKontakte");
    for (let i = 0; i < anzahl; i++) {
        let anzeigeName  = kontakteArray[i].displayName;
        let listenElement = `<li>${anzeigeName}</li>`;
        listeKontakte.append(listenElement);
    }
}


/**
 * Event-Handler-Funktion für Fehlerfall bei Aufruf von Funktion
 * navigator.contacts.find().
 */
function onKontakteFehler(fehlerObjekt) {
    alert("Fehler beim Zugriff auf Adressbuch aufgetreten: " + fehlerObjekt);
}


/**
 * Funktion setzt asynchrone Anfrage an Contacts-Plugin von Cordova
 * ab, um alle Adressbucheinträge zu erhalten.
 */
function holeAlleKontakte() {

    const contactsAPI = navigator.contacts;

    if (contactsAPI === undefined) {
        alert("Adressbuch-API steht nicht zur Verfügung.");
        return;
    }


    const felderArray = [ contactsAPI.fieldType.displayName ];

    const optionen    = new ContactFindOptions();
    optionen.filter   = ""; // Leerer Filter, also alle Kontakte wählen
    optionen.multiple = true;

    contactsAPI.find(felderArray, onKontakteGefunden, onKontakteFehler, optionen); 
}


/* 
 * Event-Handler-Funktion für Cordova-spezifisches Event
 * "deviceready".
 */
function onDeviceReadyHandler() {
    console.log("Cordova ist jetzt bereit.");
    holeAlleKontakte();
    console.log("Abfrage an Adressbuch wurde abgeschickt.");
}


// Event-Handler-Funktion für "deviceready" registrieren
$(document).on("deviceready", onDeviceReadyHandler);

