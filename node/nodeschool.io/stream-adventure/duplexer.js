#!/usr/bin/env node

var duplexer = require('duplexer');
var spawn = require('child_process').spawn;

module.exports = function (command, args) {
    childProcess = spawn(command, args);
    return duplexer(childProcess.stdin, childProcess.stdout);
};
