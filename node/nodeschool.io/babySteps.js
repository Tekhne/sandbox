#!/usr/bin/env node

var sum = process.argv.slice(2).reduce(
  function (previousValue, currentValue, index, array) {
    return Number(previousValue) + Number(currentValue);
  }, 0);

console.log(sum);
