#!/usr/bin/env node

var crypto = require('crypto');
var tar = require('tar');
var zlib = require('zlib');

var cipherName = process.argv[2];
var passphrase = process.argv[3];

var decipher = crypto.createDecipher(cipherName, passphrase);
var gunzip = zlib.createGunzip();
var untar = tar.Parse();

untar.on('entry', function (file) {
    var md5;

    if (file.type !== 'File') { return; }

    md5 = crypto.createHash('md5', { encoding: 'hex' });

    file.on('data', function(data) {
        md5.update(data);
    });

    file.on('end', function() {
        console.log(md5.digest('hex') + ' ' + file.path);
    });
});

process.stdin.pipe(decipher).pipe(gunzip).pipe(untar);
