import fs from "node:fs";

//? alternative zum Promises selber schreiben mit Callabacks
import fsPromise from "node:fs/promises";

/* 
//synchroner Ansatz
const data = fs.readFileSync("./input.txt", { encoding: "utf-8" }); //ohne encoding wuerde ich einen buffer zurueck bekommen
console.log(data);
console.log(data.toString());
console.log("Programm Ende");

//asynchroner Ansatz
fs.readFile("./input.txt", { encoding: "utf8" }, (err, data) => {
	if (err) console.err("NOOOO");
	console.log("Async Data");
	console.log(data);
}); */

//! PROMISES - promisify Callback Function
const readFilePromise = filePath =>
	new Promise((resolve, reject) => {
		fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
			if (err) reject(err);
			resolve(data);
		});
	});

readFilePromise("./input.txt").then(data => console.log({ data }));

//? ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//? alternative zum Promises selber schreiben mit Callabacks
const fsPromiseData = fsPromise
	.readFile("./input.txt", { encoding: "utf8" })
	.then(fsPromiseData => console.log({ fsPromiseData }));

//# Async / Await === Promises
const prom = () => new Promise();
//               ⬇️ verwandelt Funktion in Promise
const prom2 = async filePath => {
	if (!filePath === true) {
		//Promise rejected, also (.catch)
		throw new Error("I don't feel like");
	}

	let data = await fsPromise.readFile("./input.txt", { encoding: "utf8" });

	return true; //Promise ist resolved
};

prom2().catch(e => console.error("Here: ", e));

//try and catch
try {
	await fetch("https://google.com");
} catch (error) {
	console.error("CATCH FETCH: ", error);
}
