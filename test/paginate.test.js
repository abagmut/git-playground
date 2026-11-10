'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { paginate } = require('../src/paginate');

test('returns one empty page for no items', () => {
  assert.deepEqual(paginate([]), { items: [], page: 1, perPage: 20, total: 0, totalPages: 1 });
});

test('slices the requested page', () => {
  const items = Array.from({ length: 45 }, (_, i) => i);
  const result = paginate(items, { page: 3, perPage: 20 });
  assert.deepEqual(result.items, [40, 41, 42, 43, 44]);
  assert.equal(result.totalPages, 3);
});
