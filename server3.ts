/**
 * Created by Vlad on 5/13/2016.
 */
/// <reference path="typings/express/express.d.ts" />
/// <reference path="typings/body-parser/body-parser.d.ts" />
///<reference path="typings/express-session/express-session.d.ts"/>
///<reference path="typings/cookie-parser/cookie-parser.d.ts"/>
///<reference path="typings/request/request.d.ts"/>

import * as express from 'express';
import * as request from 'request';
import * as http from 'http';

//import * as http from 'http';
//import * as request from 'request'
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import {VOAsset} from "./client/app/services/models";
declare var GLOBAL:any;
declare var ROOT:string;
declare var WWW:string;
declare var SERVER:string;

var fs = require('fs');
;

//var http = require('http');
//var request = require('request');

var path = require('path');
GLOBAL.ROOT = __dirname;
GLOBAL.WWW = path.resolve( __dirname + '/videos');



var myserver:string = 'http://192.168.1.10:56777/';
const app = express();

app.use(function(req:express.Request, res:express.Response, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(express.static(WWW));

const port:number = process.env.PORT || 56555;


app.listen(port,function(){
    console.log('http://' + port);
});







class FileDownloader{

    destination:string;

    onComplete:Function;
    constructor(private asset:VOAsset,private server:string){




    }

    getFile():void{
        this.downloader((err)=>{
            if(this.onComplete) this.onComplete(err)
        })
    }



    downloader(callBack:Function):void{
        var dest = WWW+'/'+this.asset.filename;
        this.destination = dest;
        console.log(dest);
        var file = fs.createWriteStream(dest);
        var url:string = this.server+'/'+this.asset.path;
console.log(url);


        http.get(url,function(response){
            response.pipe(file);
            file.on('finish', function() {
                file.close(callBack);  // close() is async, call cb after close completes.
            }).on('error', function(err) {
                fs.unlink(dest);
                if (callBack) callBack(err);
            });
        } )
    }
}
class   MyVideos{

    constructor(private server:string){
                this.getNewVideos();
    }


    downloadAsset(asset:VOAsset):void{

        var dwd:FileDownloader = new FileDownloader(asset,this.server);
        dwd.onComplete = (err)=>{
            console.log('oncomplete error '+err);
        }
        dwd.getFile();
    }
    getNewVideos(){
        request.get(this.server+'videoserver/get-new-file',(error, response:http.IncomingMessage, body)=>{

            var res:any = JSON.parse(body);
            if(res.data){
                var asset:VOAsset = new VOAsset(res.data);
                var jsonfile:string = 'asset_'+asset.id+'.json';

                fs.writeFile(WWW+'/'+jsonfile,JSON.stringify(asset), (err)=> {
                    if(err) {
                        return console.log(err);
                    }

                    this.downloadAsset(asset)

                    console.log("The file was saved!");
                });
                console.log(asset);
            }


           // console.log(body)


        });

    }
}




var manager:MyVideos = new MyVideos(myserver)

