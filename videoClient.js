"use strict";
var dbDriver_1 = require("./server/db/dbDriver");
var express = require('express');
var http = require('http');
var fs = require('fs');
var path = require('path');
var serverurl = '';
var app = express();
GLOBAL.SERVER = path.resolve(__dirname + '/server/');
app.post('/file-ready/', function (req, res) {
    var filename = req.body.filename;
    res.json({ data: 'OK' });
});
app.get('/get-new-file', function (req, response) {
    var db = new dbDriver_1.DBDriver(null);
    var sql = 'SELECT * FROM process';
    db.queryAll(sql).done(function (res) {
        var first = res[0];
        console.log(first);
        response.json({ data: first });
    }, function (err) { return response.json({ error: err }); });
});
var download = function (url, dest, cb) {
    var file = fs.createWriteStream(dest);
    var request = http.get(url, function (response) {
        response.pipe(file);
        file.on('finish', function () {
            file.close(cb);
        });
    }).on('error', function (err) {
        fs.unlink(dest);
        if (cb)
            cb(err.message);
    });
};
var port = process.env.PORT || 56555;
app.listen(port, function () {
    console.log('http://' + port);
});
//# sourceMappingURL=videoClient.js.map