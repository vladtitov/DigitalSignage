import {DBDriver} from "./server/db/dbDriver";
/**
 * Created by Vlad on 8/24/2016.
 */


var express = require('express');

import * as bodyParser from 'body-parser';


import {Request} from "express";
import {Response} from "express";

var http = require('http');
var fs = require('fs');
var path = require('path')
var serverurl:string ='';


declare var  GLOBAL:any;

var app = express();

GLOBAL.SERVER = path.resolve(__dirname + '/server/');

app.post('/file-ready/', function(req: Request, res:Response){
var filename:string = req.body.filename;



    res.json({data:'OK'})
});


app.get('/get-new-file', function(req: Request, response:Response){
   var db:DBDriver = new DBDriver(null);
    var sql:string = 'SELECT * FROM process'
    db.queryAll(sql).done(
        res=>{

            var first = res[0];
            console.log(first)
            response.json({data:first});

        }
        ,err=>response.json({error:err})
    )
});




//var file = fs.createWriteStream("file.jpg");








var download = function(url, dest, cb) {
    var file = fs.createWriteStream(dest);

    var request = http.get(url, function(response) {
        response.pipe(file);
        file.on('finish', function() {
            file.close(cb);  // close() is async, call cb after close completes.
        });
    }).on('error', function(err) { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        if (cb) cb(err.message);
    });
};





const port:number = process.env.PORT || 56555;

app.listen(port,function(){
    console.log('http://' + port);
});







