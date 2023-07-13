import fs from "node:fs";
import fsPromise from "node:fs/promises";

const filePath = new URL("./blog1.txt", import.meta.url);
let content = await fsPromise.readFile(filePath, { encoding: "utf8" });

await fsPromise.writeFile(
	filePath,
	"das ist ein test",
	{ encoding: "utf8" },
	console.log(content),
);

//! 4.

const pathAssets = new URL("./assets", import.meta.url);

if (fs.existsSync(pathAssets)) {
	console.log("File exists");
} else {
	console.log("File not found");
	await createDirectory().catch(err => console.error(err));
}

async function createDirectory() {
	try {
		await fsPromise.mkdir(pathAssets);
		console.log("File created successfully");
	} catch (error) {
		console.error("Error creating the file:", error);
	}
}
//! 5.

const pathDelete = new URL("./delete.txt", import.meta.url);

if (fs.existsSync(pathDelete)) {
	await deleteFile().catch(err => console.error(err));
} else {
	console.log("File not found");
	await createFile().catch(err => console.error(err));
}

async function createFile() {
	try {
		await fsPromise.writeFile(pathDelete, "");
		console.log("File created successfully");
	} catch (error) {
		console.error("Error creating the file:", error);
	}
}

async function deleteFile() {
	try {
		await fsPromise.unlink(pathDelete, "");
		console.log("File deleted successfully");
	} catch (error) {
		console.error("Error deleting the file:", error);
	}
}

//! 7
const pathHello = new URL("./Hello.txt", import.meta.url);

async function createFileHello() {
	try {
		await fsPromise.writeFile(pathHello, "beliebiger Text");
		console.log("File created successfully");
		await fsPromise.rename("Hello.txt", "HelloWorld.txt");
	} catch (error) {
		console.error("Error creating the file:", error);
	}
}

createFileHello();
