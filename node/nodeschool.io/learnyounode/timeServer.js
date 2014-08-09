#!/usr/bin/env node

var net      = require('net'),
    strftime = require('strftime'),
    port     = Number(process.argv[2]),
    server;

server = net.createServer(function (socket) {
  socket.end(strftime('%Y-%m-%d %H:%M\n'));
})

server.listen(port);
