'use strict';

class TodoStore {
  constructor() {
    this.todos = new Map();
    this.nextId = 1;
  }

  list() {
    return [...this.todos.values()];
  }

  get(id) {
    return this.todos.get(id) ?? null;
  }

  create(title) {
    const todo = { id: this.nextId++, title, done: false };
    this.todos.set(todo.id, todo);
    return todo;
  }

  update(id, changes) {
    const todo = this.todos.get(id);
    if (!todo) return null;
    Object.assign(todo, changes);
    return todo;
  }

  remove(id) {
    return this.todos.delete(id);
  }
}

module.exports = { TodoStore };
