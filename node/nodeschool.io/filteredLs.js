#!/usr/bin/env node

var fs = require("fs");
var path = require("path");
var directory = process.argv[2];
var filter = process.argv[3];

fs.readdir(directory, function (err, files) {
  files.forEach(function (file) {
    if (path.extname(file) === ("." + filter)) console.log(file);
  });
});
