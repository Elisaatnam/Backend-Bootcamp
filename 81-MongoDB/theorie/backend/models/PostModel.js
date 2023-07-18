import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
	title: String,
	content: String,
	author: String,
});

export const Post = mongoose.model("Post", postSchema); //collection name = Post
