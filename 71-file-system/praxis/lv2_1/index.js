//! lev2_1

import fsPromise from "node:fs/promises";

async function jsonToTxt() {
	try {
		//* Paths
		const pathJSON = "./data.json";
		const pathTxt = "./outputJSON.txt";

		//* const to read content
		const jsonContent = await fsPromise.readFile(pathJSON, {
			encoding: "utf8",
		});

		//*const/ function to convert jsonContent
		const txtContent = JSON.stringify(JSON.parse(jsonContent), null, 2);

		//* write a new file with content of txtContent
		await fsPromise.writeFile(pathTxt, txtContent);
		console.log("File converted successfully");
	} catch (error) {
		console.error("Error converting the file:", error);
	}
}

jsonToTxt();
