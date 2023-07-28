import mongoose from "mongoose";

await mongoose.connect("mongodb://localhost:27017/relations-intro");

const inventorySchema = new mongoose.Schema({
	name: String,
	category: {
		type: String,
		enum: ["bigstuff", "smallstuff"],
	},
});
const Inventory = mongoose.model("Inventory", inventorySchema);

const userSchema = new mongoose.Schema({
	name: String,
	inventory: [inventorySchema],
});

const User = mongoose.model("User", userSchema);

await Inventory.findOneAndUpdate(
	{ name: "Couch", category: "bigstuff" },
	{ name: "Couch", category: "bigstuff" },
	{ upsert: true },
); //upsert = an update that inserts a new document if no document matches the filter

await User.findOneAndUpdate(
	{ name: "Klaus" },
	{ name: "Klaus", inventory: [{ name: "Couch", category: "bigstuff" }] },
	{ upsert: true },
); //upsert = an update that inserts a new document if no document matches the filter

//brauchen wir wegen zeile 3, sonst wuerde es infinite laufen
await mongoose.disconnect();
