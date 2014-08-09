#!/usr/bin/env node

var http   = require("http"),
    url    = process.argv[2],
    string = '';

http.get(url, function (response) {
  response.setEncoding('utf8');

  response.on('data', function (data) {
    string = string + data;
  });

  response.on('end', function () {
    console.log(string.length);
    console.log(string);
  })
});
