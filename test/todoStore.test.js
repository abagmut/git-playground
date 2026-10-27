'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { TodoStore } = require('../src/todoStore');

test('creates todos with incrementing ids', () => {
  const store = new TodoStore();
  assert.equal(store.create('a').id, 1);
  assert.equal(store.create('b').id, 2);
});

test('updates and removes todos', () => {
  const store = new TodoStore();
  const todo = store.create('write tests');
  store.update(todo.id, { done: true });
  assert.equal(store.get(todo.id).done, true);
  assert.equal(store.remove(todo.id), true);
  assert.equal(store.get(todo.id), null);
});
