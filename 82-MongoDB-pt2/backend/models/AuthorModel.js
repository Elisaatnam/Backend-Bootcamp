import mongoose from "mongoose";

const authorSchema = mongoose.Schema({
	name: {
		type: String,
		minlength: 2,
		maxlength: 30,
		required: true,
	},
	email: {
		type: String,
		required: [true, "Please enter Email"],
	},
	role: {
		type: String,
		enum: { values: ["admin", "user"], message: "INVALID ROLE" },
		default: "user",
	},
});

export const Author = mongoose.model("Author", authorSchema);
