#!/usr/bin/env node

var duplexer = require('duplexer');
var through = require('through');

module.exports = function (counter) {
    var counts = {};

    var writable = through(function (data) {
        counts[data.country] = (counts[data.country] || 0) + 1;
    }, function () {
        counter.setCounts(counts);
    });

    return duplexer(writable, counter);
};
