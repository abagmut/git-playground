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

    return null;
  };
}

module.exports = { createTodoRoutes, readJson };
