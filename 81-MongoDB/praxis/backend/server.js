import express from "express";
import "./models/index.js"; //index.js wird ausgefuehrt und somit d connection hergestelt zu MongoDB
import { Post } from "./models/PostModel.js";

const app = express();
const PORT = 3001;

// express.json() ist eine eingebaute Middleware-Funktion in Express.js.
// Sie analysiert den Anfragekörper, wenn er im JSON-Format vorliegt, und setzt das req.body-Objekt auf die geparsten JSON-Daten.
// Diese Middleware ist erforderlich, um JSON-Daten zu verarbeiten, die von einem Client an den Server gesendet werden, z. B. bei POST-Anfragen mit JSON-Payload.
// Durch das Hinzufügen dieser Middleware wird Express in der Lage sein, den Anfragekörper zu analysieren und die Daten im JSON-Format für weitere Verarbeitung verfügbar zu machen.
app.use(express.json());

const addPost = async post => {
	const newPost = new Post(post);
	const res = await newPost.save();
};

/* addPost({
	title: "ein toller post",
	content: "toller content",
	author: "toller autor",
	date: new Date(),
}); */

/* const findPost = async search => {
	const posts = await Post.find({ author: search });
	console.log(posts);
};
findPost("toller autor"); */

app.get("/api/posts", async (req, res) => {
	const data = await Post.find();
	res.send(data);
});

app.post("/api/posts", async (req, res) => {
	const newPost = await Post.create(req.body);
	res.send(newPost);
});

app.listen(PORT, () => console.log(`server runs on ${PORT}`));
