'use strict';

const { isAuthorized } = require('../auth');

async function readJson(req) {
  let raw = '';
  for await (const chunk of req) raw += chunk;
  return raw ? JSON.parse(raw) : {};
}

function createTodoRoutes(store) {
  return async function handle(req) {
    if (req.method !== 'GET' && !isAuthorized(req)) {
      return [401, { error: 'Unauthorized' }];
    }

    const url = new URL(req.url, 'http://localhost');

    if (req.method === 'GET' && url.pathname === '/todos') {
      const done = url.searchParams.get('done');
      const todos = store.list();
      return [200, done === null ? todos : todos.filter((t) => String(t.done) === done)];
    }
    if (req.method === 'POST' && url.pathname === '/todos') {
      const body = await readJson(req);
      if (typeof body.title !== 'string' || !body.title.trim()) {
        return [400, { error: 'title is required' }];
      }
      return [201, store.create(body.title.trim())];
    }

    const match = url.pathname.match(/^\/todos\/(\d+)$/);
    if (match) {
      const id = Number(match[1]);
      if (req.method === 'PATCH') {
        const todo = store.update(id, await readJson(req));
        return todo ? [200, todo] : [404, { error: 'Todo not found' }];
      }
      if (req.method === 'DELETE') {
        return store.remove(id) ? [204] : [404, { error: 'Todo not found' }];
      }
    }

    return null;
  };
}

module.exports = { createTodoRoutes, readJson };
