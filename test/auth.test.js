'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { isAuthorized } = require('../src/auth');

const req = (authorization) => ({ headers: authorization ? { authorization } : {} });

test('allows everything when no token is configured', () => {
  assert.equal(isAuthorized(req(), ''), true);
});

test('checks the bearer token', () => {
  assert.equal(isAuthorized(req('Bearer s3cret'), 's3cret'), true);
  assert.equal(isAuthorized(req('Bearer nope'), 's3cret'), false);
  assert.equal(isAuthorized(req(), 's3cret'), false);
});
