"use strict";
var express = require('express');
var session = require('express-session');
var cookie = require('cookie-parser');
var fs = require('fs');
var request = require('request');
var path = require('path');
GLOBAL.ROOT = __dirname;
GLOBAL.WWW = path.resolve(ROOT + '/client');
GLOBAL.SERVER = path.resolve(ROOT + '/server/');
var app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cookie());
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'somesecrettokenhere'
}));
var cmd = 'reload';
app.get('/reload/:timestamp', function (req, res) {
    res.send(cmd);
    cmd = 'hehe';
});
app.post('/debug', function (req, res) {
    var rawBody = '';
    req.on('data', function (chunk) {
        rawBody += chunk;
    });
    req.on('end', function () {
        console.log(rawBody);
        res.send('hello');
    });
});
app.get('/version/:num', function (req, res) {
    res.sendFile('version.json', { 'root': path.resolve(WWW) });
});
app.use(express.static(WWW));
app.get('/hbrowser', function (req, res) {
    res.sendFile('hbrowser.html', { 'root': path.resolve(WWW) });
});
app.use('/hbapi', require('./server/hbrowser/manager'));
var port = process.env.PORT || 56888;
app.listen(port, function () {
    console.log('http://' + port);
});
//# sourceMappingURL=server2.js.map