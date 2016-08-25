/// <reference path="../../typings/express/express.d.ts" />
///<reference path="../../typings/q/Q.d.ts"/>


import Q = require('q');
import * as express from 'express';
import {VOAsset} from "../../client/app/services/models";
import {TableModel} from "../db/TableModel";
import {UpdateResult, DBDriver} from "../db/dbDriver";

declare var WWW:string;
declare var SERVER:string;

var path = require('path');
var Jimp = require("jimp");
var fs = require('fs');

export class  ImageProcess {

  //  tempFolder: string;

    thumbSize: number = 128;

    constructor(private folder:string) {
     //   this.tempFolder = SERVER + '/uploads/thumbnails/';
    }

    makeThumbnail(asset:VOAsset): Q.Promise<any>{


        var def: Q.Deferred<any> = Q.defer();
        var thumb:string = asset.path.replace('/userImages/','/thumbnails/');

        Jimp.read(WWW+'/'+asset.path).then((image)=> {
            asset.width = image.bitmap.width;
            asset.height = image.bitmap.height;

            try {
                var isLandScape = image.bitmap.height < image.bitmap.width;
                var p:any = isLandScape ? image.resize(Jimp.AUTO, this.thumbSize) :
                    image.resize(this.thumbSize, Jimp.AUTO);
            } catch (e) {
                def.reject(e);
                return;
            }

            let x = 0;
            let y = 0;

            if(isLandScape){
                x = (image.bitmap.width-this.thumbSize)/2;
            } else {
                y = (image.bitmap.height-this.thumbSize)/2;
            }

            // p.crop(x,y,this.thumbSize,this.thumbSize)


            p.write(WWW+'/'+thumb, (err) => {
                if(err){
                    console.error(err);
                    def.reject(err);
                }
                else{
                    asset.thumb = thumb;
                    def.resolve(asset);
                }
            });
        }).catch(function (err) {
            console.error(err);
            def.reject(err);
        });

        return def.promise;
    }

    processImage(asset) {
        var deferred: Q.Deferred<any> = Q.defer();
        // console.log('details\n', details);
        this.makeThumbnail(asset).then( (asset:VOAsset)=> {
            console.log('ip.makeThumbnail done ');
            var newPath:string = this.folder + '/userImages/'+asset.filename;
            fs.rename(asset.path, WWW+newPath, (err)=> {
                if(err) deferred.reject(err);
                else{
                    asset.path = newPath;
                    this.insertInDB(asset).then(function (res:UpdateResult) {
                        deferred.resolve(res);
                    }, (err)=> {deferred.reject(err)});
                }
            });
        }, (err)=> {deferred.reject(err)});
        return deferred.promise;
    }

    processImage2(asset) {
        var def: Q.Deferred<any> = Q.defer();
    // console.log('processImage2', asset);
        var newPath:string = this.folder + '/userImages/'+asset.filename;


            fs.rename(path.resolve(WWW+'/'+asset.path),path.resolve(WWW+'/'+newPath), (err)=> {
                if(err){
                    console.log(err);
                    def.reject(err);
                }
                else{

                    asset.path = newPath;
                    this.makeThumbnail(asset).then(

                        (asset:VOAsset)=> {
                           // console.log('processImage23', asset);
                                this.insertInDB(asset).then(
                                    res=> def.resolve(res)
                                    ,(err)=> {def.reject(err)});

                    }, (err)=> {def.reject(err)});
                }
            });

        return def.promise;
    }


    insertInDB(asset:VOAsset): Q.Promise<any>  {

        var db:DBDriver = new DBDriver(this.folder);
        return db.insertRow(asset,'assets');
    };
}
