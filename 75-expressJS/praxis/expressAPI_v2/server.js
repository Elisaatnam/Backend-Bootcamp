import express from "express";
import axios from "axios";

import { getPosts } from "./postService.js";

const PORT = 9898;
const app = express();

//* Level 1
//erlaubt uns zu checken, ob d express app funktioniert
app.get("/status", (req, res) => {
	res.status(200).send("OK");
});

//* Level 2
app.get("/post", (req, res) => {
	axios.get("https://jsonplaceholder.typicode.com/posts").then(({ data }) => {
		console.log(data);
		res.send(data);
	});
});

//* Level 2 - ASYNCRON
app.get("/post-async", async (req, res) => {
	const { data } = await axios.get(
		"https://jsonplaceholder.typicode.com/posts",
	);
	console.log(data);
	res.send(data);
});

//* Level 3

app.get("/post/:id", async (req, res) => {
	const id = Number(req.params.id);
	const { data } = await axios.get(
		`https://jsonplaceholder.typicode.com/posts/${id}`,
	);
	res.send(data);
});

//* Level 4
getPosts().then(posts => {
	console.log(posts);
	res.json(posts);
});

//Lv 4 - asynchron
app.get("/post-async", async (req, res) => {
	const posts = await getPosts();

	console.log(posts);
	res.json(posts);
});

app.listen(PORT, () => {
	console.log(`Server is running on PORT: ${PORT}`);
});
