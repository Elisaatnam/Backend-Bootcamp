import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
	title: String,
	content: String,
	author: String,
	date: Date,
});

export const Post = mongoose.model("Post", postSchema);
