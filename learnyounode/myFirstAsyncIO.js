#!/usr/bin/env node

var fs = require('fs');
var fileName = process.argv[2];

fs.readFile(fileName, function (err, buffer) {
  if (err) throw err;
  lines = buffer.toString().split('\n').length - 1;
  console.log(lines);
});
