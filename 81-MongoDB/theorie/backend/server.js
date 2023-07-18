import express from "express";
import "./models/index.js"; //index.js wird dadurch ausgefuehrt
import { Post } from "./models/PostModel.js";

const app = express();
const PORT = 3001;

app.use(express.json());

const addPost = async post => {
	const newPost = new Post(post);
	const response = await newPost.save(); // mit save() wird es in d DB reingepushed
	console.log(response);
};

/* addPost({
	title: "Mein erster Post",
	content: "willkomen auf meinem Blog",
	author: "Elisa",
});
addPost({
	title: "Mein zweiter Post",
	content: "hallo inhalt",
	author: "Magda",
});
addPost({
	title: "Mein dritter Post",
	content: "ich habe was interessantes geschrieben",
	author: "Ankor",
}); */

/* const findPost = async search => {
	const filteredPosts = Post.find({ author: search });
	console.log(filteredPosts);
};
findPost("Elisa"); */

app.get("/api/posts", async (req, res) => {
	const data = await Post.find();
	res.json(data);
});

app.post("/api/posts", async (req, res) => {
	const response = await Post.create(req.body);
	res.json(response);
});

app.listen(PORT, () => console.log(`Server laeuft auf: ${PORT}`));
