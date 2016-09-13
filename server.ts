/**
 * Created by Vlad on 5/13/2016.
 */
/// <reference path="typings/express/express.d.ts" />
/// <reference path="typings/body-parser/body-parser.d.ts" />
///<reference path="typings/express-session/express-session.d.ts"/>
///<reference path="typings/cookie-parser/cookie-parser.d.ts"/>
///<reference path="typings/request/request.d.ts"/>


import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as cookie from 'cookie-parser';
declare var GLOBAL:any;
declare var ROOT:string;
declare var WWW:string;
declare var SERVER:string;
declare var DBALL:string;


interface MyRequest extends express.Request{

}

var fs = require('fs-extra');
var request = require('request');
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({
    changeOrigin:true,
    port:80
});

interface Settings{
    ENV:string;
    dev_folder:string;
    video_server:string;
}


var path = require('path');

const SETTINGS:Settings = JSON.parse(fs.readFileSync('settings.json','utf8'));
GLOBAL.ROOT = __dirname;
GLOBAL.WWW = path.resolve(ROOT + '/client/');
GLOBAL.SERVER = path.resolve(ROOT + '/server/');
GLOBAL.DBALL =  ROOT + '/server/db/';
GLOBAL.SETTINGS = SETTINGS;

if(SETTINGS.ENV == 'prod') {
    console.log = function () {};

    console.error = function (err:any) {
        var str:string = "\r\n" + new Date().toLocaleString() + "\r\n";
        str += JSON.stringify(err);
        fs.appendFile(SERVER + '/error.log', str);
    };
}
//////////   Types  only/////////////
import {Request} from "express";
import {Response} from "express";
import {Express} from "express";
import {DBDriver} from "./server/db/dbDriver";
///////////////////////////////////////

const app:Express = express();

// configure our app to use bodyParser(it let us get the json data from a POST)
app.use(cookie());
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret:'somesecrettokenherehello'
   /* ,cookie: {
        httpOnly: false, // key
        maxAge: null
    }*/

}));


app.use(express.static(WWW));

app.get('/', function(req:express.Request, res:express.Response){
    if(SETTINGS.ENV == 'prod'){
        var folder = req.session['user_folder'];
        if(folder) res.sendFile('indexts.html',{ 'root':WWW});
        else res.redirect('/login');
    } else if(SETTINGS.ENV == 'dev') {
        res.sendFile('indexts.html',{ 'root':WWW});
    }

    // res.sendFile('indexts.html',{ 'root':WWW});
});

app.get('/login', function(req:express.Request, res:express.Response){
    res.sendFile('mylogin.html',{ 'root': WWW});
});
app.get('/login/*', function(req:express.Request, res:express.Response){
    res.sendFile('mylogin.html',{ 'root': WWW});
});

app.get('/preview/*', function(req:express.Request, res:express.Response){
    if(SETTINGS.ENV == 'prod'){
        var folder = req.session['user_folder'];
        if(folder) res.sendFile('player-preview.html',{ 'root': WWW});
        else res.redirect('/login');
    } else if(SETTINGS.ENV == 'dev') {
        res.sendFile('player-preview.html',{ 'root': WWW});
    }

    // res.sendFile('player-preview.html',{ 'root': WWW});
});

app.get('/playlist-preview/*', function(req:express.Request, res:express.Response){
    if(SETTINGS.ENV == 'prod'){
        var folder = req.session['user_folder'];
        if(folder) res.sendFile('playlist-preview.html',{ 'root': WWW});
        else res.redirect('/login');
    } else if(SETTINGS.ENV == 'dev') {
        res.sendFile('playlist-preview.html',{ 'root': WWW});
    }

    // res.sendFile('player-preview.html',{ 'root': WWW});
});

app.get('/dashboard', function(req:express.Request, res:express.Response){
    if(SETTINGS.ENV == 'prod'){
        var folder = req.session['user_folder'];
        if(folder) res.sendFile('indexts.html',{ 'root':WWW});
        else res.redirect('/login');
    } else if(SETTINGS.ENV == 'dev') {
        res.sendFile('indexts.html',{ 'root':WWW});
    }


    // res.sendFile('indexts.html',{ 'root':WWW});
});

// app.get('/screen/*', function(req:express.Request, res:express.Response){
//     var folder = req.session['user_folder'];
//     if(folder) res.sendFile('screen.html',{ 'root':WWW});
//     else res.sendFile('mylogin.html',{ 'root': WWW});
//
//     // res.sendFile('screen.html',{ 'root':WWW});
// });
app.get('/dashboard/*', function(req:express.Request, res:express.Response){
    if(SETTINGS.ENV == 'prod'){
        var folder = req.session['user_folder'];
        if(folder) res.sendFile('indexts.html',{ 'root':WWW});
        else res.redirect('/login');
    } else if(SETTINGS.ENV == 'dev') {
        res.sendFile('indexts.html',{ 'root':WWW});
    }

    // else res.sendFile('mylogin.html',{ 'root': WWW});

    // res.sendFile('indexts.html',{ 'root':WWW});
});

app.get('/apidocs', function(req:express.Request, res:express.Response){

    res.sendFile('index.html',{ 'root':path.resolve(WWW + '/apidocs/')});
});

app.use(function(req:Request, res:Response, next) {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// app.use('/myversion/*',function(req:Request, res:Response, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//
//     next();
// });



app.all('/proxy/*', function(req: express.Request, res:express.Response) {
    var proxyURL = "http://digitalsignage.front-desk.ca/" ;
    req.url = req.url.substr(6);
    var options = {target : proxyURL};
    proxy.web(req, res, options);

});

app.use('/account',bodyParser.urlencoded({extended: true}));
app.use('/account',bodyParser.json());
app.use('/account', require('./server/account/manager'));

app.use('/videos',bodyParser.urlencoded({extended: true}));
app.use('/videos',bodyParser.json());
app.use('/videos', require('./server/videos/manager'));


app.use('/player/:token/', function(req:Request, res:Response, next) {
    var folder = req.session['user_folder'];
    if(folder)next();
    else{
        var token:string = req.params.token;
        if(!token) {
            res.json({error:'token'})
            return;
        }
        var db:DBDriver = new DBDriver(null);
        db.selectOne('SELECT folder FROM users WHERE token = ?',[token]).done(
            folder=>{
                if(folder){
                    req.session['user_folder'] = folder.folder;
                    next();
                }else res.json({error:'notoken'})
            }
            ,err=>res.json({error:err})
        )

    }
});

app.use('/api',bodyParser.urlencoded({extended: true}));
app.use('/api',bodyParser.json());

app.use('/api',function(req:Request, res:Response, next) {
    var folder = req.session['user_folder'];
    if(SETTINGS.ENV == 'prod') {
        if (folder) next();
        else res.json({error: 'login'});
    }
    else if(SETTINGS.ENV == 'dev') {
        if (folder) next();
        else if(!folder){
            console.log(' user not loged in go to '+SETTINGS.dev_folder);
            req.session['user_folder'] = SETTINGS.dev_folder;
            next();
        }
    }

    // if(!folder){
    //     console.log(' user not loged in go to '+SETTINGS.dev_folder)
    //     req.session['user_folder'] = SETTINGS.dev_folder;
    // }
    // next();
});

const port:number = process.env.PORT || 56777;
// app.use('/api/users', require('./server/users/index'));
// app.use('/api/user', require('./server/users/user'));
//app.use('/api/test', require('./server/test/index'));
app.use('/player/:token', require('./server/player/manager'));
app.use('/api/preview', require('./server/player/preview'));
app.use('/api/content', require('./server/content/manager'));
app.use('/api/assets', require('./server/assets/manager'));
app.use('/api/playlists', require('./server/playlists/manager'));
app.use('/api/layouts', require('./server/layouts/manager'));
//app.use('/api/messages', require('./server/message/manager'));
var rss = require('./server/libs/rss');

app.get('/api/rss/:id',function(req: express.Request, res:express.Response){
    rss.read(req.params.id,function(result){
        res.json({data:result})
    });
});

var phantom = require('node-phantom');
var webshot = require('webshot');
//var webpage = require('webpage');
app.get('/api/web2/:id',function(req: express.Request, res:express.Response){
    var phantom =require('node-phantom');
    phantom.create(function(err,ph) {
        res.json(err)
        console.log(ph);
    });
});

app.get('/api/webpage/:id',function(req: express.Request, res:express.Response){

   /* var page = webpage.create();
    page.open('http://uplight.ca', function(status) {
        console.log("Status: " + status);
        if(status === "success") {
            page.render('example.png');
        }

        phantom.exit();
        res.json(status)
    });*/

    webshot('uplight.ca', 'uplight.png', function(err) {
        // screenshot now saved to google.png
        res.json(err);
    });
   /* phantom.create(function(error,ph){
        console.log(error);
        res.json(ph)
        ph.createPage(function(err,page){
            page.open('http://uplight.ca' ,function(err,status){
                page.render('example.png');

            });
        });

    });*/
});

app.listen(port,function(){
    console.log('http://127.0.0.1:' + port);
    console.log('http://127.0.0.1:' + port + '/api');
});

