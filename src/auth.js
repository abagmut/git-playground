'use strict';

const crypto = require('node:crypto');

function isAuthorized(req, token = process.env.API_TOKEN) {
  if (!token) return true; // auth is disabled when no token is configured
  const header = req.headers.authorization ?? '';
  const given = Buffer.from(header.replace(/^Bearer /, ''));
  const expected = Buffer.from(token);
  return given.length === expected.length && crypto.timingSafeEqual(given, expected);
}

module.exports = { isAuthorized };
