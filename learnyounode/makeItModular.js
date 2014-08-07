#!/usr/bin/env node

var filterDir = require("./filterDir");
var directory = process.argv[2];
var extension = process.argv[3];

filterDir(directory, extension, function (err, files) {
  if (err) {
    return console.log('Error: ' + err);
  }

  files.forEach(function (file) {
    console.log(file);
  });
});
