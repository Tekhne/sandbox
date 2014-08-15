#!/usr/bin/env node

var through = require('through');
var trumpet = require('trumpet')();

var loud = trumpet.select('.loud').createStream();

function toUpperCase(buffer) {
    this.queue(buffer.toString().toUpperCase());
}

loud.pipe(through(toUpperCase)).pipe(loud);
process.stdin.pipe(trumpet).pipe(process.stdout);
