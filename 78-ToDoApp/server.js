import express from "express";
import {
	addToDo,
	allToDos,
	toDoByID,
	updateSingleToDo,
	deleteSingleToDo,
} from "./services/todos.js";

const PORT = 9898;
const app = express();

app.use(express.json());

app.get("/todos", async (req, res) => {
	const alleToDos = await allToDos();
	res.send(alleToDos);
});
app.get("/todos/:id", async (req, res) => {
	const singleToDo = await toDoByID(req.params.id);
	res.send(singleToDo);
});
app.post("/todos", async (req, res) => {
	const newToDo = await addToDo(req.body);
	res.send(newToDo);
});
app.put("/todos/:id", async (req, res) => {
	let updatedToDo = req.body;
	await updateSingleToDo(req.params.id, updatedToDo);
	res.send(updatedToDo);
});
app.delete("/todos/:id", async (req, res) => {
	const deletedToDo = await deleteSingleToDo(req.params.id);
	res.send("erfolgreich geloescht");
});

app.listen(PORT, () => console.log("PORT auf:", PORT));
