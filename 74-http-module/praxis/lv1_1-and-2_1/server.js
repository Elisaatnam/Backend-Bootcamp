import http from "node:http";
import fs from "node:fs";

// Die Funktion sendFile hat die Aufgabe, eine Datei als HTTP-Antwort zu senden.
const sendFile = (path, response, statusCode) => {
	// Lesen der Datei am angegebenen Pfad
	fs.readFile(path, (err, data) => {
		if (err) {
			// Wenn ein Fehler beim Lesen der Datei auftritt, wird ein HTTP-Statuscode "500 Internal Server Error" an den Client gesendet.
			response.writeHead(500);
			response.end();
			return;
		}
		if (path.includes(".jpeg")) {
			// Wenn der Dateipfad den Text ".jpeg" enthält, wird angenommen, dass es sich um eine JPEG-Bilddatei handelt.
			// In diesem Fall wird der Statuscode "200 OK" an den Client gesendet, und der Header der HTTP-Antwort wird auf den MIME-Typ "image/jpeg" gesetzt.
			response.writeHead(200, {
				"Content-Type": "image/jpeg",
			});
			// Der Inhalt der gelesenen Datei (JPEG-Bild) wird als Antwort gesendet.
			response.end(data);
			return;
		}
		// Wenn es sich nicht um eine JPEG-Datei handelt, wird der Inhalt der Datei als Text interpretiert.
		// Der Inhalt wird als HTTP-Antwort geschrieben.
		response.write(data.toString());
		// Die HTTP-Antwort wird abgeschlossen.
		response.end();
	});
};

const handleRequest = (req, res) => {
	// Die Funktion handleRequest wird verwendet, um HTTP-Anfragen zu verarbeiten.

	if (req.url === "/") {
		// Wenn die URL der Anfrage "/"" entspricht, wird die Datei "index.html" gesendet.

		sendFile("./index.html", res);
	} else {
		// Wenn die URL der Anfrage nicht "/"" entspricht, wird die angeforderte Datei gesendet.

		sendFile("." + req.url, res);
	}
};

//! Funktionsweise der handleRequest-Funktion:
// Die Funktion handleRequest wird verwendet, um HTTP-Anfragen zu verarbeiten.
// Sie akzeptiert zwei Parameter: req (die HTTP-Anfrage) und res (die HTTP-Antwort).

// Der Code überprüft zunächst, ob die URL der Anfrage "/" entspricht.
// Dies wird mit der Bedingung req.url === "/" überprüft.

// Wenn die URL der Anfrage "/" entspricht, wird die Funktion sendFile aufgerufen, um die Datei "index.html" zu senden.
// Dies geschieht mit dem Dateipfad "./index.html" als erstes Argument und dem res-Objekt als zweites Argument.

// Wenn die URL der Anfrage nicht "/" entspricht (d.h. es handelt sich um eine andere URL),
// wird die Funktion sendFile erneut aufgerufen.
// Diesmal wird der Dateipfad als "." + req.url gebildet, um den angeforderten Dateipfad relativ zur aktuellen Arbeitsverzeichnis zu konstruieren.
// Das res-Objekt wird wieder als zweites Argument übergeben.

// Die Funktion handleRequest fungiert als Router für die HTTP-Anfragen.
// Wenn die URL der Anfrage "/" entspricht, wird die Datei "index.html" gesendet.
// Andernfalls wird die angeforderte Datei basierend auf der URL der Anfrage gesendet.
// Die eigentliche Dateiübertragung wird von der sendFile-Funktion durchgeführt,
// während die handleRequest-Funktion den Dateipfad und das res-Objekt an die sendFile-Funktion weiterleitet.

const server = http.createServer(handleRequest);

server.listen(9898, () => console.log("Ich stehe vor der Tür und warte"));
