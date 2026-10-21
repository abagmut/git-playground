'use strict';

const { createServer } = require('./server');

const port = Number(process.env.PORT) || 3000;
createServer().listen(port, () => {
  console.log(`tiny-todo listening on http://localhost:${port}`);
});
