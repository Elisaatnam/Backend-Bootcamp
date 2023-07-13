import fsPromise from "node:fs/promises";
import { v4 as uuid } from "uuid";

//der Pfad zur toDos.json
const toDosFilePath = new URL("../data/toDos.json", import.meta.url);

let fileContent;
const init = async () => {
	//fileContent auslesen
	const fileContentString = await fsPromise.readFile(toDosFilePath, {
		encoding: "utf-8",
	});
	//zu einem Objekt parsen
	fileContent = JSON.parse(fileContentString);
};
//init funktion lostreten und falls fehler auftreten diesen dann auffangen (.catch)
init().catch(err =>
	console.error("Initialization of todos service failed with: ", err),
);

const write = async () => {
	const fileContentString = JSON.stringify(fileContent, null, 2);
	await fsPromise.writeFile(toDosFilePath, fileContentString, {
		encoding: "utf-8",
	});
};

//!Funktion zum hinzufuegen eines To Do's
export const addToDo = async todo => {
	//hier bekommt das todo eine unique ID mit Hilfe des npm Packages uuid
	todo.id = uuid();
	//der fileContent bekommt das neue todo dazu (push)
	fileContent.push(todo);
	//fuehre die write fkt aus und schreibe die aktualisierten todos in die datei
	await write();
	//das todo zurueck geben (quasi an server.js)
	return todo;
};

//!Funktion zum anzeigen aller To Do's
export const allToDos = async () => {
	//gib bitte den Inhalt von der toDos.json zurueck
	return fileContent;
};

//!Funktion zum anzeigen eines einzelnen To Do's
export const toDoByID = async id => {
	const singleToDo = fileContent.find(item => item.id === id);
	return singleToDo;
};

//!Funktion zum editieren/aktualisieren eines einzelnen To Do's
export const updateSingleToDo = async (id, updatedToDo) => {
	const selectedToDo = fileContent.find(item => item.id === id);
	Object.assign(selectedToDo, updatedToDo);
	await write();
	return fileContent;
};

//!Funktion zum loeschen eines einzelnen To Do's
export const deleteSingleToDo = async id => {
	const index = fileContent.findIndex(item => item.id === id);
	fileContent.splice(index, 1);

	await write();
	return fileContent;
};
