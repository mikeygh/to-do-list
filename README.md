# GraphQL To-Do List

A full-stack To-Do List application with a GraphQL API backend and React frontend.

## Tech Stack

**Backend:** Express, GraphQL, express-graphql, TypeScript, UUID
**Frontend:** React 18, Vite, TypeScript

## Quick Start

You need to run the backend and frontend in **separate terminals**.

### Terminal 1 - Backend

```bash
pnpm install
pnpm dev
```

The API runs at `http://localhost:4000/graphql` (GraphiQL enabled).

### Terminal 2 - Frontend

```bash
cd frontend
pnpm install
pnpm dev
```

The frontend runs at `http://localhost:3000` and proxies `/graphql` requests to the backend.

## Scripts

### Backend

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server with ts-node |
| `pnpm build` | Compile TypeScript to JavaScript |
| `pnpm start` | Run compiled server |
| `pnpm typecheck` | Type check without emitting |

### Frontend

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Vite dev server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |

## GraphQL Schema

### Type

```graphql
type Todo {
  id: String!
  title: String!
  completed: Boolean!
}
```

### Queries

| Query | Arguments | Description |
|-------|-----------|-------------|
| `todos` | None | Get all todos |
| `todo` | `id: String!` | Get a single todo by ID |

### Mutations

| Mutation | Arguments | Description |
|----------|-----------|-------------|
| `createTodo` | `title: String!` | Create a new todo |
| `updateTodo` | `id: String!`, `title: String`, `completed: Boolean` | Update an existing todo |
| `deleteTodo` | `id: String!` | Delete a todo |

### Examples

**Get all todos:**

```graphql
query {
  todos {
    id
    title
    completed
  }
}
```

**Create a todo:**

```graphql
mutation {
  createTodo(title: "Learn GraphQL") {
    id
    title
    completed
  }
}
```

**Toggle completion:**

```graphql
mutation {
  updateTodo(id: "todo-id", completed: true) {
    id
    title
    completed
  }
}
```

**Delete a todo:**

```graphql
mutation {
  deleteTodo(id: "todo-id")
}
```

## Project Structure

```
├── src/
│   ├── index.ts    # Express server + GraphiQL
│   ├── schema.ts   # GraphQL schema (queries & mutations)
│   └── data.ts     # In-memory store with CRUD operations
├── frontend/
│   ├── src/
│   │   ├── main.tsx    # React entry point
│   │   ├── App.tsx     # Todo list UI component
│   │   ├── api.ts      # GraphQL client functions
│   │   └── index.css   # Global styles
│   ├── index.html
│   ├── vite.config.ts  # Vite config with /graphql proxy
│   └── tsconfig.json
├── package.json
└── tsconfig.json
```

## Notes

- Data is stored in-memory and resets on server restart
- Pre-seeded with two sample todos on startup
- Frontend proxies `/graphql` requests to `http://localhost:4000`
