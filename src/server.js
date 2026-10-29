'use strict';

const crypto = require('node:crypto');
const http = require('node:http');
const { TodoStore } = require('./todoStore');
const { createTodoRoutes } = require('./routes/todos');
const { logRequest } = require('./logger');

function createServer(store = new TodoStore()) {
  const handle = createTodoRoutes(store);

  return http.createServer(async (req, res) => {
    logRequest(req, res);
    res.setHeader('x-request-id', crypto.randomUUID());
    const result = await handle(req);
    const [status, body] = result ?? [404, { error: 'Not found' }];
    res.writeHead(status, { 'content-type': 'application/json' });
    res.end(body === undefined ? '' : JSON.stringify(body));
  });
}

module.exports = { createServer };
