import express from "express"
import cors from "cors"
import { addTodo, todos, updateTodo, deleteTodo } from "./model/TodosModel.js";

const app = express()

const PORT = 3001;

app.use(express.json())
app.use(cors())


app.get("/api/todos", (req, res) => {
    console.log(todos)
    res.send(todos)
})

app.post("/api/todos", async (req, res) => {
    const todo = req.body
    const newTodo = await addTodo(todo)
    res.send(newTodo)
})

app.put("/api/todos/:id", async (req, res) => {
    const { id } = req.params;
    const todo = req.body
    const updatedTodo = await updateTodo(id, todo)
    res.send(updatedTodo)
})


app.delete("/api/todos/:id", async (req, res) => {
    const { id } = req.params
    deleteTodo(id)
    res.send("es wurde gelöscht")
})




app.listen(PORT, () => { console.log(`Server ist am laufen mit diesem Port${PORT}`) })