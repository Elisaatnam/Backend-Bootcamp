// Importieren der erforderlichen Module
import express from "express"; // Das Express-Framework wird verwendet, um den Server zu erstellen und Routen zu definieren
import fs from "node:fs"; // Das fs-Modul bietet Funktionen zum Lesen und Schreiben von Dateien

// Konstante für den Server-Port
const PORT = 3000;

// Pfad zur Kontaktdatei
const contactsPath = new URL("./data/contacts.json", import.meta.url);

// Lese den Inhalt der Kontaktdatei und parsiere ihn als JSON
let contentOfContacts = JSON.parse(
	fs.readFileSync(contactsPath, { encoding: "utf8" }),
);

// Erstelle eine Express-Anwendung
const app = express();

// Middleware, um JSON im Request-Body zu parsen
app.use(express.json());

// GET-Anfrage für alle Kontakte
app.get("/contacts", (req, res) => {
	// Sende den Inhalt der Kontaktliste als JSON zurück
	res.json(contentOfContacts);
});

// GET-Anfrage für einen bestimmten Kontakt basierend auf der ID
app.get("/contacts/:id", (req, res) => {
	// Extrahiere die ID des angeforderten Kontakts aus den Request-Parametern
	const idPerson = Number(req.params.id);

	// Finde den Kontakt mit der entsprechenden ID in der Kontaktliste
	const contactById = contentOfContacts.find(p => p.id === idPerson);

	// Sende den gefundenen Kontakt als JSON zurück
	res.json(contactById);
});

// POST-Anfrage zum Hinzufügen eines neuen Kontakts
app.post("/contacts", (req, res) => {
	// Extrahiere die Daten des neuen Kontakts aus dem Request-Body
	const newContact = req.body;

	// Füge den neuen Kontakt zur Kontaktliste hinzu
	contentOfContacts.push(newContact);

	// Schreibe die aktualisierte Kontaktliste zurück in die Datei
	fs.writeFileSync(contactsPath, JSON.stringify(contentOfContacts, null, 2));

	// Sende eine Bestätigung als JSON zurück
	res.json("OK, alles gut");
});

// PUT-Anfrage zum Bearbeiten eines Kontakts basierend auf der ID
app.put("/contacts/:id", (req, res) => {
	// Extrahiere die Daten des bearbeiteten Kontakts aus dem Request-Body
	const editedContact = req.body;

	// Extrahiere die ID des zu bearbeitenden Kontakts aus den Request-Parametern
	const idPerson = Number(req.params.id);

	// Finde den Index des zu bearbeitenden Kontakts in der Kontaktliste
	const index = contentOfContacts.findIndex(person => person.id === idPerson);

	// Aktualisiere den Kontakt mit den neuen Daten
	contentOfContacts[index] = editedContact;

	// Schreibe die aktualisierte Kontaktliste zurück in die Datei
	fs.writeFileSync(contactsPath, JSON.stringify(contentOfContacts, 0, 2));

	// Sende eine Bestätigung als JSON zurück
	res.json("Kontakt wurde geändert");
});

// DELETE-Anfrage zum Löschen eines Kontakts basierend auf der ID
app.delete("/contacts/:id", (req, res) => {
	// Extrahiere die ID des zu löschenden Kontakts aus den Request-Parametern
	const idPerson = Number(req.params.id);

	// Finde den Index des zu löschenden Kontakts in der Kontaktliste
	const index = contentOfContacts.findIndex(p => p.id === idPerson);

	// Entferne den Kontakt aus der Kontaktliste
	contentOfContacts.splice(index, 1);

	// Schreibe die aktualisierte Kontaktliste zurück in die Datei
	fs.writeFileSync(contactsPath, JSON.stringify(contentOfContacts, null, 2));

	// Sende eine Bestätigung als JSON zurück
	res.json("Kontakt wurde gelöscht");
});

// Starte den Server und höre auf den angegebenen Port
app.listen(PORT, () => console.log("Ich bin bereit auf PORT:", PORT));
