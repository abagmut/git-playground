'use strict';

async function readJson(req) {
  let raw = '';
  for await (const chunk of req) raw += chunk;
  return raw ? JSON.parse(raw) : {};
}

function createTodoRoutes(store) {
  return async function handle(req) {
    if (req.method === 'GET' && req.url === '/todos') {
      return [200, store.list()];
    }
    if (req.method === 'POST' && req.url === '/todos') {
      const body = await readJson(req);
      return [201, store.create(body.title)];
    }

    const match = req.url.match(/^\/todos\/(\d+)$/);
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
