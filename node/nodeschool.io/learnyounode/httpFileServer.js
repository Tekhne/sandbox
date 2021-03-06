#!/usr/bin/env node

var fs = require('fs');
var http = require('http');

var file = process.argv[3];
var port = Number(process.argv[2]);

var server = http.createServer(function (request, response) {
  response.writeHead(200, { 'content-type': 'text/plain' });
  fs.createReadStream(file).pipe(response);
});

server.listen(port);
