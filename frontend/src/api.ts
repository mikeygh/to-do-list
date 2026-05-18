export interface Todo {
  id: string
  title: string
  completed: boolean
}

async function graphqlRequest<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const response = await fetch('/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  })

  const result = await response.json()

  if (result.errors) {
    throw new Error(result.errors[0].message)
  }

  return result.data
}

export async function fetchTodos(): Promise<Todo[]> {
  const data = await graphqlRequest<{ todos: Todo[] }>(`
    query {
      todos {
        id
        title
        completed
      }
    }
  `)
  return data.todos
}

export async function createTodo(title: string): Promise<Todo> {
  const data = await graphqlRequest<{ createTodo: Todo }>(`
    mutation($title: String!) {
      createTodo(title: $title) {
        id
        title
        completed
      }
    }
  `, { title })
  return data.createTodo
}

export async function updateTodo(
  id: string,
  title?: string,
  completed?: boolean
): Promise<Todo> {
  const data = await graphqlRequest<{ updateTodo: Todo }>(`
    mutation($id: String!, $title: String, $completed: Boolean) {
      updateTodo(id: $id, title: $title, completed: $completed) {
        id
        title
        completed
      }
    }
  `, { id, title, completed })
  return data.updateTodo
}

export async function deleteTodo(id: string): Promise<boolean> {
  const data = await graphqlRequest<{ deleteTodo: boolean }>(`
    mutation($id: String!) {
      deleteTodo(id: $id)
    }
  `, { id })
  return data.deleteTodo
}
