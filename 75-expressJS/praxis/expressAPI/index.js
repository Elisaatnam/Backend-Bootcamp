import express from "express";
import fetch from "node-fetch";
import fs from "fs";
import fsPromise from "node:fs/promises";

const app = express();
const port = 9898;
const pathToLocalJSON = new URL("./data.json", import.meta.url);
const data = JSON.parse(
	fs.readFileSync(pathToLocalJSON, { encoding: "utf-8" }),
);

//* Level 1 - Erstelle einen GET  Endpunkt /status mit dem response-code: 200 der den text zurück gibt OK
app.get("/status", (req, res) => {
	//ich setze den statuscode auf 200 plus inhalt der Antwort ist "OK"
	res.status(200).send("OK");
});

/* //* Level 2 - Erstelle einen GET  Endpunkt /posts der alle posts der Placeholder API zurück gibt. (benutze fetch bei jedem request / livedaten)
app.get("/posts", async (req, res) => {
	try {
		const response = await fetch("https://jsonplaceholder.typicode.com/posts");
		const allPosts = await response.json();
		res.status(200).json(allPosts);
	} catch (err) {
		res.status(500).json({ error: "Internal Server Error" });
	}
});

//* Level 3 - Erstelle einen GET Endpunkt der /posts/<id> der nur den post aus mit der id <id>  zurück gibt.
app.get("/posts/:id", async (req, res) => {
	const postID = req.params.id;
	console.log(postID);

	try {
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/posts/${postID}`,
		);
		const singlePost = await response.json();

		if (singlePost.id) {
			res.status(200).json(singlePost);
		} else {
			res.status(404).json({ error: "Post not found" });
		}
	} catch (err) {
		res.status(500).json({ error: "Internal Server Error" });
	}
}); */

//* Level 4 - Ändere alle /post… Endpunkte so das die Daten nicht aus der Placeholder API kommen sondern aus einer Lokalen JSON Datei (speicher alle Todos als json).Also /post  und /post/<id> benutzen das FS module.

app.get("/posts", (req, res) => {
	fs.readFile(pathToLocalJSON, "utf8", (err, data) => {
		if (err) {
			res.status(500).json({ error: "Internal Server Error" });
		} else {
			const posts = JSON.parse(data);
			res.status(200).json(posts);
		}
	});
});

app.get("/posts/:id", (req, res) => {
	const postId = req.params.id.toString();

	fs.readFile(pathToLocalJSON, "utf8", (err, data) => {
		if (err) {
			res.status(500).json({ error: "Internal Server Error" });
		} else {
			const posts = JSON.parse(data);
			const post = posts.find(p => p.id.toString() === postId);

			if (post) {
				res.status(200).json(post);
			} else {
				res.status(404).json({ error: "Post not found" });
			}
		}
	});
});

//* Level 5 - Füge folgenden Endpunkt: POST /post  hinzu, Daten die übergeben werden sollen. Verwende Postman/thunder client um Post Requests zu senden. Speichere den post in der data.json

app.use(express.json());

app.post("/posts", async (req, res) => {
	const newPost = req.body;

	try {
		let fileContent = await fsPromise.readFile(pathToLocalJSON, "utf8");
		let posts = JSON.parse(fileContent);
		posts.push(newPost);
		await fsPromise.writeFile(pathToLocalJSON, JSON.stringify(posts));
		//!ACHTUNG: die data.json ist nach dem ausfuehren ein String!
		res.status(201).json({ message: "Post created successfully" });
	} catch (err) {
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.listen(port, () => console.log("ready when u are"));
