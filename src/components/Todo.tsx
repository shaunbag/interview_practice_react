import { useState, useEffect } from "react";

type Todo = {
    id: number;
    todo: string;
    completed: boolean;
}


export default function Todo() {

    const [input, setInput] = useState<string>("")
    const [todos, setTodos] = useState<Todo[]>(() => {
        const stored = localStorage.getItem("todos")
        return stored ? JSON.parse(stored) : []
    })

    useEffect(() => {
      localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])

    // when adding todos check the input, and trim any white space
    function addTodo() {
        if (input.trim().length === 0) return
        // set the todo id to Date.now for better key and item discovery in the update 
        setTodos([...todos, { id: Date.now(), completed: false, todo: input.trim() }])
        setInput("")
    }

    function updateTodo(id: number) {
        // check the todos previous state in the setTodos method and map the todos accordingly updating their completed status
        setTodos(todos =>
            todos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        )
    }

    return (
        <>
            <h1>My Todos</h1>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={addTodo}>Add Todo</button>

            <ul style={{listStyle: 'none'}}>
                {
                    todos.map(todo => {
                        return <li key={todo.id} onClick={() => updateTodo(todo.id)} style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}>{todo.todo}</li>
                    })
                }
            </ul>
        </>
    )

}