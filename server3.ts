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


var path = require('path');
GLOBAL.ROOT = __dirname;
GLOBAL.WWW = path.resolve( __dirname + '/videos');
GLOBAL.SERVER = path.resolve( __dirname + '/server');


//import * as http from 'http';
//import * as request from 'request'
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import {VOAsset} from "./client/app/services/models";
import {VideoProcess} from "./server/assets/VideoProcess";
declare var GLOBAL:any;
declare var ROOT:string;
declare var WWW:string;
declare var SERVER:string;

var fs = require('fs');


//var http = require('http');
//var request = require('request');




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
        var dest = path.resolve(this.asset.workingFolder+'/'+this.asset.filename);
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


    sendReady(asset:VOAsset):void{
        var url:string =this.server+'videoserver/ready'
        console.log(url);
        request.post(url,{json: true,body:asset},(err,res,body)=>{
            console.log(err);
            console.log(body);
        })
    }



    downloadAsset(asset:VOAsset):void{

        var dwd:FileDownloader = new FileDownloader(asset,this.server);
        dwd.onComplete = (err)=>{

            if(err){
                this.onError(err,asset);
                console.log(err);
                return
            }
            var processor:VideoProcess = new VideoProcess(null);

            processor.processVideo(asset).done(
                asset=>{

                    asset.status='processed';

                    var jsonfile:string = 'asset_'+asset.id+'.json';

                    fs.writeFile(path.resolve(WWW+'/ready/'+jsonfile),JSON.stringify(asset), (err)=> {
                        if(err) {
                            return console.log(err);
                        }

                        console.log("Ready asset ");
                        this.sendReady(asset);


                    });
                    console.log(asset);
                }
                ,err=>{

                    console.log(err);
                }
            )
            console.log('oncomplete error '+err);

        }
        dwd.getFile();
    }

    onError(err:any,asset:VOAsset):void{
        console.log('onError ',err);
        console.log('onError ',asset);
    }

    startProcess(asset:VOAsset){

        fs.writeFile(path.resolve(asset.workingFolder+'/asset.json'),JSON.stringify(asset), (err)=> {
            if(err) {
                this.onError(err,asset);
                console.log(err);
            }else {
                this.downloadAsset(asset);
                console.log("new asset "+asset.workingFolder);
            }
        });
    }



    getNewVideos(){
console.log(this.server+'videoserver/get-new-file');
        request.get(this.server+'videoserver/get-new-file',(error, response:http.IncomingMessage, body)=>{
            if(error){
                this.onError(error,null);
                return
            }
            var res:any
            try{
                res = JSON.parse(body);
            }catch (e){
                this.onError(body,null)
            }

            console.log(body);
            if(res && res.data){
                var asset:VOAsset = new VOAsset(res.data);
              //  asset.folder = 'asset_'+asset.id;
                asset.workingFolder= path.resolve(WWW+'/'+asset.folder);

                if(fs.existsSync(asset.workingFolder)){
                    this.startProcess(asset);
                }else{
                    fs.mkdir(asset.workingFolder,(err)=>{
                        if(err){
                            this.onError(err,asset)
                            console.log(err);
                        }else{
                            this.startProcess(asset);
                        }
                    });
                }
            } else this.onError(res,null);


           // console.log(body)


        });

    }
}




var manager:MyVideos = new MyVideos(myserver)

