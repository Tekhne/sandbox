#!/usr/bin/env node

var through = require('through');

stream = through(function (data) {
  this.queue(data.toString().toUpperCase());
});

process.stdin.pipe(stream).pipe(process.stdout);
