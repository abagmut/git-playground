'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createRateLimiter } = require('../src/rateLimit');

test('blocks after the limit within one window', () => {
  const allow = createRateLimiter({ limit: 2, windowMs: 1000 });
  assert.equal(allow('ip', 0), true);
  assert.equal(allow('ip', 10), true);
  assert.equal(allow('ip', 20), false);
  assert.equal(allow('ip', 1000), true);
});
