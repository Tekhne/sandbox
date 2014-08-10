#!/usr/bin/env node

var http = require('http');
var map = require('through2-map');

var port = Number(process.argv[2]);
var server = http.createServer().listen(port);

server.on('request', function (request, response) {
  if (request.method !== 'POST') {
    return response.writeHead(405);
  }

  response.writeHead(200, { 'content-type': 'text/plain' });

  request.pipe(map(function (data) {
    return data.toString().toUpperCase();
  })).pipe(response);
});
