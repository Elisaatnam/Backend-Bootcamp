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
	inventory: [{ type: mongoose.Types.ObjectId, ref: "Inventory" }], // bei ref muss der Name von Zeile 12 rein, den ich in "" uebergeben habe bei mongoose.model
});

const User = mongoose.model("User", userSchema);

const inventoryPiece = await Inventory.findOneAndUpdate(
	{ name: "Couch", category: "bigstuff" },
	{ name: "Couch", category: "bigstuff" },
	{ upsert: true },
); //upsert = an update that inserts a new document if no document matches the filter
/* console.log(inventoryPiece); */

/* await User.findOneAndUpdate(
	{ name: "Klaus" },
	{ name: "Klaus", inventory: [inventoryPiece] },
	{ upsert: true },
); //upsert = an update that inserts a new document if no document matches the filter
 */

const user = await User.findOne({ name: "Klaus" }).populate("inventory"); //* In Mongoose, the populate() method is used to fill referenced fields in a document with actual data from another collection (also known as "joining" in traditional database terms). It is used to resolve references or relationships between different collections.

/* user.inventory.push(inventoryPiece);
await user.save();
 */
console.log(user);

//brauchen wir wegen zeile 3, sonst wuerde es infinite laufen
await mongoose.disconnect();
