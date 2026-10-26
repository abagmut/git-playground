'use strict';

const http = require('node:http');
const { TodoStore } = require('./store');
const { createTodoRoutes } = require('./routes/todos');
const { logRequest } = require('./logger');

function createServer(store = new TodoStore()) {
  const handle = createTodoRoutes(store);

  return http.createServer(async (req, res) => {
    logRequest(req, res);
    const result = await handle(req);
    const [status, body] = result ?? [404, { error: 'Not found' }];
    res.writeHead(status, { 'content-type': 'application/json' });
    res.end(body === undefined ? '' : JSON.stringify(body));
  });
}

module.exports = { createServer };
