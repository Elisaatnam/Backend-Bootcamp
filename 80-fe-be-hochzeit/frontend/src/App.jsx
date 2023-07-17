import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get("/api/todos")
        console.log(res)
        setTodos(res.data)
      } catch (error) {
        console.error("res funktioniert nicht")
      }
    }
    fetchTodos()
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault()
    const title = e.target.elements.todo.value
    try {
      const res = await axios.post("/api/todos", { title })
      console.log(res.data)
      setTodos([...todos, res.data])
      e.target.reset()
    } catch (error) {
      setErrors(error.res.data.errors)
    }
  }

  const deleteTodo = async (id) => {
    try {
      axios.delete(`/api/todos/${id}`)
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <>
      <h1>TODO LIST</h1>
      <form onSubmit={handleSubmit}>
        <input id='todo' type="text" />
        <small>{errors?.title?.message}</small>
        <br />
        <button type='submit'>Submit</button>
      </form>

      {todos?.map((todo) => {
        console.log(todo)
        return (
          <div key={todo.id}>
            {/* <input type="checkbox" onChange={() => { }} checked={todo.completed} /> */}
            <p>{todo.title}</p>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        )

      })}

    </>
  )
}

export default App
