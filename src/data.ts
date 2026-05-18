import { v4 as uuid } from "uuid";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

const todos: Todo[] = [
  { id: uuid(), title: "Learn GraphQL", completed: false },
  { id: uuid(), title: "Build a project", completed: false },
];

export function getTodos(): Todo[] {
  return todos;
}

export function getTodo(id: string): Todo | undefined {
  return todos.find((t) => t.id === id);
}

export function createTodo(title: string): Todo {
  const todo: Todo = { id: uuid(), title, completed: false };
  todos.push(todo);
  return todo;
}

export function updateTodo(
  id: string,
  title?: string,
  completed?: boolean
): Todo | null {
  const todo = todos.find((t) => t.id === id);
  if (!todo) return null;
  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;
  return todo;
}

export function deleteTodo(id: string): boolean {
  const idx = todos.findIndex((t) => t.id === id);
  if (idx === -1) return false;
  todos.splice(idx, 1);
  return true;
}
