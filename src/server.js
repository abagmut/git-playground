'use strict';

const http = require('node:http');
const { TodoStore } = require('./todoStore');
const { createTodoRoutes } = require('./routes/todos');
const { logRequest } = require('./logger');
const { createRateLimiter } = require('./rateLimit');

function createServer(store = new TodoStore()) {
  const handle = createTodoRoutes(store);
  const allow = createRateLimiter({ limit: Number(process.env.RATE_LIMIT) || 100 });

  return http.createServer(async (req, res) => {
    logRequest(req, res);
    const result = allow(req.socket.remoteAddress)
      ? await handle(req)
      : [429, { error: 'Too many requests' }];
    const [status, body] = result ?? [404, { error: 'Not found' }];
    res.writeHead(status, { 'content-type': 'application/json' });
    res.end(body === undefined ? '' : JSON.stringify(body));
  });
}

module.exports = { createServer };
