/**
 * Created by Vlad on 5/13/2016.
 */
/// <reference path="typings/express/express.d.ts" />
/// <reference path="typings/body-parser/body-parser.d.ts" />
///<reference path="typings/express-session/express-session.d.ts"/>
///<reference path="typings/cookie-parser/cookie-parser.d.ts"/>

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as cookie from 'cookie-parser';
declare var GLOBAL:any;
declare var ROOT:string;
declare var WWW:string;
declare var SERVER:string;

var fs = require('fs');
var request = require('request');

var path = require('path');
GLOBAL.ROOT = __dirname;
GLOBAL.WWW = path.resolve(ROOT + '/client');
GLOBAL.SERVER = path.resolve(ROOT + '/server/');



//////////   Types  only/////////////
import {Request} from "express";
import {Response} from "express";
import {Express} from "express";
import {DevicesController} from "./server/layouts/DevicesController";
///////////////////////////////////////

const app:Express = express();
app.use(function(req:Request, res:Response, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



// configure our app to use bodyParser(it let us get the json data from a POST)
app.use(cookie());
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret:'somesecrettokenhere'
}));

var cmd='reload';
app.get('/reload/:timestamp', function(req:express.Request, res:express.Response){
        res.send(cmd);
    cmd='hehe';
})

app.post('/debug', function(req:express.Request, res:express.Response){
    var rawBody:string  ='';
    req.on('data', function(chunk) {
       rawBody += chunk;
    });

    req.on('end', function() {
        console.log(rawBody);
        res.send('hello');
    });

})

app.get('/version/:num', function(req:express.Request, res:express.Response){
    res.sendFile('version.json',{ 'root':path.resolve(WWW)});
});


app.use(express.static(WWW));

app.get('/hbrowser', function(req:express.Request, res:express.Response){

    res.sendFile('hbrowser.html',{ 'root':path.resolve(WWW)});
});
app.use('/hbapi', require('./server/hbrowser/manager'));


const port:number = process.env.PORT || 56888;

app.listen(port,function(){
    console.log('http://' + port);
});

