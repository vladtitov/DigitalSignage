"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookie = require('cookie-parser');
var fs = require('fs-extra');
var request = require('request');
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({
    changeOrigin: true,
    port: 80
});
var path = require('path');
var SETTINGS = JSON.parse(fs.readFileSync('settings.json', 'utf8'));
GLOBAL.ROOT = __dirname;
GLOBAL.WWW = path.resolve(ROOT + '/client/');
GLOBAL.SERVER = path.resolve(ROOT + '/server/');
GLOBAL.DBALL = ROOT + '/server/db/';
GLOBAL.SETTINGS = SETTINGS;
if (SETTINGS.ENV == 'prod') {
    console.log = function () { };
    console.error = function (err) {
        var str = "\r\n" + new Date().toLocaleString() + "\r\n";
        str += JSON.stringify(err);
        fs.appendFile(SERVER + '/error.log', str);
    };
}
var dbDriver_1 = require("./server/db/dbDriver");
var app = express();
app.use(cookie());
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'somesecrettokenherehello'
}));
app.use(express.static(WWW));
app.get('/', function (req, res) {
    if (SETTINGS.ENV == 'prod') {
        var folder = req.session['user_folder'];
        if (folder)
            res.sendFile('indexts.html', { 'root': WWW });
        else
            res.redirect('/login');
    }
    else if (SETTINGS.ENV == 'dev') {
        res.sendFile('indexts.html', { 'root': WWW });
    }
});
app.get('/login', function (req, res) {
    res.sendFile('mylogin.html', { 'root': WWW });
});
app.get('/login/*', function (req, res) {
    res.sendFile('mylogin.html', { 'root': WWW });
});
app.get('/preview/*', function (req, res) {
    if (SETTINGS.ENV == 'prod') {
        var folder = req.session['user_folder'];
        if (folder)
            res.sendFile('player-preview.html', { 'root': WWW });
        else
            res.redirect('/login');
    }
    else if (SETTINGS.ENV == 'dev') {
        res.sendFile('player-preview.html', { 'root': WWW });
    }
});
app.get('/playlist-preview/*', function (req, res) {
    if (SETTINGS.ENV == 'prod') {
        var folder = req.session['user_folder'];
        if (folder)
            res.sendFile('playlist-preview.html', { 'root': WWW });
        else
            res.redirect('/login');
    }
    else if (SETTINGS.ENV == 'dev') {
        res.sendFile('playlist-preview.html', { 'root': WWW });
    }
});
app.get('/dashboard', function (req, res) {
    if (SETTINGS.ENV == 'prod') {
        var folder = req.session['user_folder'];
        if (folder)
            res.sendFile('indexts.html', { 'root': WWW });
        else
            res.redirect('/login');
    }
    else if (SETTINGS.ENV == 'dev') {
        res.sendFile('indexts.html', { 'root': WWW });
    }
});
app.get('/dashboard/*', function (req, res) {
    if (SETTINGS.ENV == 'prod') {
        var folder = req.session['user_folder'];
        if (folder)
            res.sendFile('indexts.html', { 'root': WWW });
        else
            res.redirect('/login');
    }
    else if (SETTINGS.ENV == 'dev') {
        res.sendFile('indexts.html', { 'root': WWW });
    }
});
app.get('/apidocs', function (req, res) {
    res.sendFile('index.html', { 'root': path.resolve(WWW + '/apidocs/') });
});
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.all('/proxy/*', function (req, res) {
    var proxyURL = "http://digitalsignage.front-desk.ca/";
    req.url = req.url.substr(6);
    var options = { target: proxyURL };
    proxy.web(req, res, options);
});
app.use('/account', bodyParser.urlencoded({ extended: true }));
app.use('/account', bodyParser.json());
app.use('/account', require('./server/account/manager'));
app.use('/videos', bodyParser.urlencoded({ extended: true }));
app.use('/videos', bodyParser.json());
app.use('/videos', require('./server/videos/manager'));
app.use('/player/:token/', function (req, res, next) {
    var folder = req.session['user_folder'];
    if (folder)
        next();
    else {
        var token = req.params.token;
        if (!token) {
            res.json({ error: 'token' });
            return;
        }
        var db = new dbDriver_1.DBDriver(null);
        db.selectOne('SELECT folder FROM users WHERE token = ?', [token]).done(function (folder) {
            if (folder) {
                req.session['user_folder'] = folder.folder;
                next();
            }
            else
                res.json({ error: 'notoken' });
        }, function (err) { return res.json({ error: err }); });
    }
});
app.use('/api', bodyParser.urlencoded({ extended: true }));
app.use('/api', bodyParser.json());
app.use('/api', function (req, res, next) {
    var folder = req.session['user_folder'];
    if (SETTINGS.ENV == 'prod') {
        if (folder)
            next();
        else
            res.json({ error: 'login' });
    }
    else if (SETTINGS.ENV == 'dev') {
        if (folder)
            next();
        else if (!folder) {
            console.log(' user not loged in go to ' + SETTINGS.dev_folder);
            req.session['user_folder'] = SETTINGS.dev_folder;
            next();
        }
    }
});
var port = process.env.PORT || 56777;
app.use('/player/:token', require('./server/player/manager'));
app.use('/api/preview', require('./server/player/preview'));
app.use('/api/content', require('./server/content/manager'));
app.use('/api/assets', require('./server/assets/manager'));
app.use('/api/playlists', require('./server/playlists/manager'));
app.use('/api/layouts', require('./server/layouts/manager'));
var rss = require('./server/libs/rss');
app.get('/api/rss/:id', function (req, res) {
    rss.read(req.params.id, function (result) {
        res.json({ data: result });
    });
});
var phantom = require('node-phantom');
var webshot = require('webshot');
app.get('/api/web2/:id', function (req, res) {
    var phantom = require('node-phantom');
    phantom.create(function (err, ph) {
        res.json(err);
        console.log(ph);
    });
});
app.get('/api/webpage/:id', function (req, res) {
    webshot('uplight.ca', 'uplight.png', function (err) {
        res.json(err);
    });
});
app.listen(port, function () {
    console.log('http://127.0.0.1:' + port);
    console.log('http://127.0.0.1:' + port + '/api');
});
//# sourceMappingURL=server.js.map