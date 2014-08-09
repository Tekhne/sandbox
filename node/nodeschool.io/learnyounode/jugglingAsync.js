#!/usr/bin/env node

var http     = require("http"),
    finished = 0,
    results  = ['', '', ''],
    urls     = process.argv.slice(2, 5);

function processEndEvent() {
  if (finished >= 2) {
    results.forEach(function (result) {
      console.log(result);
    });
  } else {
    finished++;
  }
}

function processUrl(index, response) {
    response.setEncoding('utf8');

    response.on('data', function (data) {
      results[index] = results[index] + data;
    });

    response.on('end', function () {
      processEndEvent();
    });
}

for (var i = 0; i < 3; i++) {
  http.get(urls[i], processUrl.bind(this, i));
}
