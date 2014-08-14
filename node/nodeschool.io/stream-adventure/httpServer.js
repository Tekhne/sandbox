#!/usr/bin/env node

var http = require('http');
var through = require('through');

var port = Number(process.argv[2]);
var server = http.createServer().listen(port);

function upperCase(buffer) {
    this.queue(buffer.toString().toUpperCase());
}

server.on('request', function (request, response) {
    if (request.method !== 'POST') {
        return response.writeHead(405);
    }

    request.pipe(through(upperCase)).pipe(response);
});
