'use strict';

function paginate(items, { page = 1, perPage = 20 } = {}) {
  const start = (page - 1) * perPage;
  return {
    items: items.slice(start, start + perPage),
    page,
    perPage,
    total: items.length,
    totalPages: Math.max(1, Math.ceil(items.length / perPage)),
  };
}

module.exports = { paginate };
