import fs from "node:fs";
import fsPromise from "node:fs/promises";
import fetch from "node-fetch";

const folderPath = new URL("./data", import.meta.url);
const postPath = new URL("./data/post.json", import.meta.url);

//
//
//
export const fetchData = async () => {
	try {
		//*  +++++++der fetch fuer d Posts+++++++
		const postResponse = await fetch(
			"https://jsonplaceholder.typicode.com/posts",
		);
		const postData = await postResponse.json();
		//* ++++++fetch posts ende+++++++++

		//* ++++++++Fetch comments+++++++++++
		const commentsDataPromises = postData.map(async post => {
			const commentsResponse = await fetch(
				`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`,
			);
			const commentsData = await commentsResponse.json();
			return commentsData;
		});

		//! warten bis alle fetches completed sind, erst dann gehts weiter ...
		const commentsDataArray = await Promise.all(commentsDataPromises);

		//* +++++++fetch ende++++++++++++

		// alle Daten miteinander kombinieren
		const combinedData = postData.map((postElm, index) => ({
			...postElm,
			comments: commentsDataArray[index],
		}));
		//nun noch stringify
		const combinedJsonData = JSON.stringify(combinedData, null, 5);

		// die kombinierten Daten in d postPath schreiben
		await fsPromise.writeFile(postPath, combinedJsonData, { encoding: "utf8" });

		//
	} catch (error) {
		console.error("Error fetching or saving the data:", error);
	}
};

//
//
//
//

let doesExist;
let isSetup = false;

export const exists = async path => {
	try {
		await fsPromise.access(path, fs.constants.W_OK);
		doesExist = true;
	} catch (err) {
		doesExist = false;
	}

	return doesExist;
};

export const setup = async () => {
	if (isSetup) return;
	const hasFolder = await exists(folderPath);

	if (!hasFolder) {
		await fsPromise.mkdir(folderPath);
	}

	isSetup = true;
};
