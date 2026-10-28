#!/bin/sh
# Restart the server whenever a source file changes.
exec node --watch src/index.js
