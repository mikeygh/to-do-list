import { useState, useEffect, FormEvent } from 'react'
import { Todo, fetchTodos, createTodo, updateTodo, deleteTodo } from './api'

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTitle, setNewTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadTodos = async () => {
    try {
      setLoading(true)
      const data = await fetchTodos()
      setTodos(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load todos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTodos()
  }, [])

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    try {
      const todo = await createTodo(newTitle.trim())
      setTodos([...todos, todo])
      setNewTitle('')
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create todo')
    }
  }

  const handleToggle = async (todo: Todo) => {
    try {
      const updated = await updateTodo(todo.id, undefined, !todo.completed)
      setTodos(todos.map((t) => (t.id === updated.id ? updated : t)))
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id)
      setTodos(todos.filter((t) => t.id !== id))
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo')
    }
  }

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>To-Do List</h1>

      {error && (
        <div style={{
          padding: '0.75rem',
          marginBottom: '1rem',
          backgroundColor: '#fee',
          border: '1px solid #fcc',
          borderRadius: '4px',
          color: '#c00',
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Add a new todo..."
          style={{
            flex: 1,
            padding: '0.5rem 0.75rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '1rem',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#4a90d9',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          Add
        </button>
      </form>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : todos.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>No todos yet. Add one above!</p>
      ) : (
        <ul style={{ listStyle: 'none' }}>
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                marginBottom: '0.5rem',
                backgroundColor: '#fff',
                borderRadius: '4px',
                border: '1px solid #e0e0e0',
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo)}
                style={{ width: '1.2rem', height: '1.2rem', cursor: 'pointer' }}
              />
              <span
                style={{
                  flex: 1,
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? '#888' : '#333',
                }}
              >
                {todo.title}
              </span>
              <button
                onClick={() => handleDelete(todo.id)}
                style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: '#e74c3c',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
