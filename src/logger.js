'use strict';

function logRequest(req, res) {
  const started = process.hrtime.bigint();
  res.on('finish', () => {
    const ms = Number(process.hrtime.bigint() - started) / 1e6;
    console.log(`${req.method} ${req.url} ${res.statusCode} ${ms.toFixed(1)}ms`);
  });
}

module.exports = { logRequest };
