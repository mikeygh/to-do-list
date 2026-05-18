export interface Todo {
    id: string;
    title: string;
    completed: boolean;
}
export declare function getTodos(): Todo[];
export declare function getTodo(id: string): Todo | undefined;
export declare function createTodo(title: string): Todo;
export declare function updateTodo(id: string, title?: string, completed?: boolean): Todo | null;
export declare function deleteTodo(id: string): boolean;
