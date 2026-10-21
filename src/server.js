'use strict';

const http = require('node:http');

function createServer() {
  return http.createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ ok: true }));
  });
}

module.exports = { createServer };
