#!/usr/bin/env node

var combiner = require('stream-combiner');
var gzip = require('zlib').createGzip();
var split = require('split');
var through = require('through');

module.exports = function () {
    var genre;

    function write(line) {
        var json;

        if (line.length === 0) { return; }
        json = JSON.parse(line);

        if (json.type === 'genre') {
            if (genre) { this.queue(JSON.stringify(genre) + '\n'); }
            genre = {name: json.name, books: []};
        } else if (json.type === 'book'){
            genre.books.push(json.name);
        }
    }

    function end() {
        if (genre) { this.queue(JSON.stringify(genre) + '\n'); }
        this.queue(null);
    }

    return combiner(split(), through(write, end), gzip);
};
