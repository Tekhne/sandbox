#!/usr/bin/env node

var http = require('http');
var url = require('url');

var port = Number(process.argv[2]);
var server = http.createServer().listen(port);

function buildTime(time) {
  return {
    'hour': time.getHours(),
    'minute': time.getMinutes(),
    'second':  time.getSeconds()
  };
}

function buildUnixTime(time) {
  return {'unixtime': time.getTime()};
}

server.on('request', function (request, response) {
  var urlData = url.parse(request.url, true);
  var date = new Date(urlData.query.iso);
  var result;

  if (request.method !== 'GET') {
    return response.writeHead(405);
  }

  if (urlData.pathname === '/api/parsetime') {
    result = buildTime(date);
  } else if (urlData.pathname === '/api/unixtime') {
    result = buildUnixTime(date);
  }

  if (result) {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(result));
  } else {
    response.writeHead(404);
    response.end();
  }
});
