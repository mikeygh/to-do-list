"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodos = getTodos;
exports.getTodo = getTodo;
exports.createTodo = createTodo;
exports.updateTodo = updateTodo;
exports.deleteTodo = deleteTodo;
const uuid_1 = require("uuid");
const todos = [
    { id: (0, uuid_1.v4)(), title: "Learn GraphQL", completed: false },
    { id: (0, uuid_1.v4)(), title: "Build a project", completed: false },
];
function getTodos() {
    return todos;
}
function getTodo(id) {
    return todos.find((t) => t.id === id);
}
function createTodo(title) {
    const todo = { id: (0, uuid_1.v4)(), title, completed: false };
    todos.push(todo);
    return todo;
}
function updateTodo(id, title, completed) {
    const todo = todos.find((t) => t.id === id);
    if (!todo)
        return null;
    if (title !== undefined)
        todo.title = title;
    if (completed !== undefined)
        todo.completed = completed;
    return todo;
}
function deleteTodo(id) {
    const idx = todos.findIndex((t) => t.id === id);
    if (idx === -1)
        return false;
    todos.splice(idx, 1);
    return true;
}
