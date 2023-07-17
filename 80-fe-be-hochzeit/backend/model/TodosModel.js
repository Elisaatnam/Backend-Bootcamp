
import fs from "node:fs/promises"
import { v4 as uuidv4 } from "uuid"

const File_path = "./data/todos.json"

export let todos = [];

const _setUp = async () => {
    try {
        const buffer = await fs.readFile(File_path)
        todos = JSON.parse(buffer)
    } catch (error) {
        console.error("Error reading todos from file", error)
    }
}

_setUp()

const _saveTodo = async () => {
    try {
        await fs.writeFile(File_path, JSON.stringify(todos))
    } catch (error) {
        console.error("Error saving todos to file", error)
    }
}

export const addTodo = async (todo) => {
    const newTodo = { ...todo, id: uuidv4() }
    todos.push(newTodo)
    await _saveTodo()
    return newTodo;
}


const _findEntryIndex = (id) => {
    return todos.findIndex((todo) => todo.id === id)
}



export const updateTodo = async (id, todo) => {
    const todoIndex = _findEntryIndex(id)
    if (todoIndex !== -1) {
        const updatedTodo = { ...todos[todoIndex], ...todo }
        todos[todoIndex] = updatedTodo
        await _saveTodo();
        return updatedTodo;
    }
    return null;
}

export const deleteTodo = async (id) => {
    const todoIndex = _findEntryIndex(id)
    if (todoIndex !== -1) {
        todos.splice(todoIndex, 1)
        await _saveTodo()
        return true
    }
    return false
}


