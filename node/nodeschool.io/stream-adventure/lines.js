#!/usr/bin/env node

var split = require('split');
var through = require('through');
var count = 1;

process.stdin
       .pipe(split())
       .pipe(through(function (line) {
           line = line.toString();

           if ((count % 2) === 0) {
               this.queue(line.toUpperCase() + '\n');
           } else {
               this.queue(line.toLowerCase() + '\n');
           }

           count++;
       }))
       .pipe(process.stdout);
