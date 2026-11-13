# tiny-todo

A tiny, dependency-free todo API for Node.js.

## Getting started

    npm start   # http://localhost:3000
    npm test

## API

| Method | Path         | Description      |
| ------ | ------------ | ---------------- |
| GET    | /todos       | List all todos   |
| POST   | /todos       | Create a todo    |
| PATCH  | /todos/:id   | Update a todo    |
| DELETE | /todos/:id   | Delete a todo    |

## Configuration

| Variable     | Default | Description                                  |
| ------------ | ------- | -------------------------------------------- |
| `PORT`       | 3000    | Port to listen on                            |
| `API_TOKEN`  | (none)  | Bearer token required for write requests     |
| `RATE_LIMIT` | 100     | Requests per minute per client IP            |
