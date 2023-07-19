import express from "express";
import "./models/index.js";
import { Post } from "./models/PostModel.js";
import { Author } from "./models/AuthorModel.js";

const app = express();
const PORT = 3001;

// express.json() ist eine eingebaute Middleware-Funktion in Express.js.
// Sie analysiert den Anfragekörper, wenn er im JSON-Format vorliegt, und setzt das req.body-Objekt auf die geparsten JSON-Daten.
// Diese Middleware ist erforderlich, um JSON-Daten zu verarbeiten, die von einem Client an den Server gesendet werden, z. B. bei POST-Anfragen mit JSON-Payload.
// Durch das Hinzufügen dieser Middleware wird Express in der Lage sein, den Anfragekörper zu analysieren und die Daten im JSON-Format für weitere Verarbeitung verfügbar zu machen.
app.use(express.json());

// const addPost = async (post) => {
//     const newPost = new Post(post)
//     console.log(newPost)
// newPost
//     const response = await newPost.save()
//     console.log(response)
// }

// // addPost({
// //     title: "Mein erster Post",
// //     content: "Willkommen auf dem Blog",
// //     author: "Marius",
// // })
// // addPost({
// //     title: "Mein erster Post",
// //     content: "Willkommen auf dem Blog",
// //     author: "Farid",
// // })
// // addPost({
// //     title: "Mein erster Post",
// //     content: "Willkommen auf dem Blog",
// //     author: "Olli",
// // })

// const findPost = async (search) => {
//     const posts = await Post.find({ author: search })
//     console.log(posts)
// }
// findPost("Olliasd")

// GET-Anfrage an "/api/posts":

// Diese Route handhabt GET-Anfragen an "/api/posts".
// Die Funktion wird asynchron ausgeführt, um auf die Ergebnisse der Datenbankabfrage zu warten.
// Post.find() wird verwendet, um alle vorhandenen Beiträge aus der Datenbank abzurufen.
// Die erhaltenen Daten werden als JSON an den Client zurückgegeben.

app.get("/api/posts", async (req, res) => {
	const data = await Post.find();
	res.json(data);
});

// POST-Anfrage an "/api/addPost":

// Diese Route handhabt POST-Anfragen an "/api/addPost".
// Die Funktion wird asynchron ausgeführt, um auf die Datenbankoperationen zu warten..
// Post.create(req.body) erstellt einen neuen Datenbankeintrag mit den im Anfragekörper enthaltenen Daten.
// Die Antwort der Datenbankoperation wird als JSON an den Client zurückgegeben.

app.post("/api/posts", async (req, res) => {
	try {
		const author = await Author.findById(req.body.author);
		console.log(author);

		if (author === null) {
			return res.send("Author is invalid");
		}

		const response = await Post.create(req.body);
		res.json(response);
	} catch (error) {
		console.error(error);
		res.status(500).send("Fehler beim hinzufuegen");
	}

	//alternative Ansätze zur Erstellung eines neuen Beitrags zeigen. In diesem Fall wird ein neues Post-Objekt erstellt, der Autor wird festgelegt und der Beitrag wird in der Datenbank gespeichert.
	// const newPost = new Post(post)
	// console.log(newPost)
	// newPost.author ="***"
	// const response2 = await newPost.save()
});

app.post("/api/newAuthor", async (req, res) => {
	try {
		const newAuthor = await Author.create(req.body);
		res.send(newAuthor);
	} catch (err) {
		console.error(err);
		res.send("FEHLER");
	}
});

app.put("/api/editPost/:id", async (req, res) => {
	const edits = req.body;
	const postId = req.params.id;

	try {
		const dbRes = await Post.findByIdAndUpdate(postId, edits, { new: true });
		res.send(dbRes);
	} catch (error) {
		console.error(error);
		res.send("fehler beim editieren");
	}
});

app.delete("/api/deletePost/:id", async (req, res) => {
	const postId = req.params.id;

	try {
		const dbRes = await Post.findByIdAndRemove(postId);
		res.send("post has been deleted");
	} catch (error) {
		console.error(error);
		res.send("fehler beim loeschen");
	}
});

app.get("/api/getPostsByAuthor/:authorId", async (req, res) => {
	try {
		const authorId = req.body.authorId;
		const posts = await Post.find({ author: authorId });
		res.json(posts);
	} catch (error) {
		console.error(error);
		res.send("fehler beim laden der posts");
	}
});

app.listen(PORT, () => console.log("Der Server läuft", PORT));
