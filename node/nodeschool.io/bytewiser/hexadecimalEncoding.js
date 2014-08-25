#!/usr/bin/env node

var buffer = new Buffer(process.argv.slice(2));
console.log(buffer.toString('hex'));
