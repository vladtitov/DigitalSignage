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
app.use(express.static(WWW));
app.use('/api/assets', require('./server/assets/manager'));
var port = process.env.PORT || 56555;
app.listen(port, function () {
    console.log('http://' + port);
});
//# sourceMappingURL=server3.js.map