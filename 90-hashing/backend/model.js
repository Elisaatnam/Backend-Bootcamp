import crypto from "crypto";
import { Schema, model } from "mongoose";

export const userSchema = new Schema({
	name: String,
	email: {
		type: String,
		unique: true,
		lowercase: true,
	},
	salt: {
		type: String,
		required: true,
		select: false,
	},
	hash: {
		type: String,
		required: true,
		select: false,
	},
});

userSchema.methods.setPassword = function (password) {
	//# SALT erstellen
	this.salt = crypto.randomBytes(64).toString("hex");

	//# Password mit SALT HASHEN
	this.hash = crypto
		.pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
		.toString("hex");
};

userSchema.methods.verifyPassword = function (password) {
	const hash = crypto
		.pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
		.toString("hex");

	return this.hash === hash; // gibt true oder false zurueck;
};

export const User = model("User", userSchema);

export default User;
