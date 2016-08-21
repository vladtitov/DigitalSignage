/// <reference path="../../typings/express/express.d.ts" />
///<reference path="../../typings/q/Q.d.ts"/>


import Q = require('q');
import * as express from 'express';
import {VOAsset} from "../../client/app/services/models";
import {TableModel} from "../db/TableModel";
import {UpdateResult} from "../db/dbDriver";

declare var WWW:string;
declare var SERVER:string;

var path = require('path');
var Jimp = require("jimp");
var fs = require('fs');

export class  ImageProcess {

    tempFolder: string;

    thumbSize: number = 128;

    constructor(private folder:string) {
        this.tempFolder = SERVER + '/uploads/thumbnails/';
    }

    makeThumbnail(asset:VOAsset): Q.Promise<any>{

        // this.pathDest = this.tempFolder + filename;
        // this.filename = filename;
        var deferred: Q.Deferred<any> = Q.defer();


        Jimp.read(asset.path).then((image)=> {
            asset.width = image.bitmap.width;
            asset.height = image.bitmap.height;

            try {
                var isLandScape = image.bitmap.height < image.bitmap.width;
                var p:any = isLandScape ? image.resize(Jimp.AUTO, this.thumbSize) :
                    image.resize(this.thumbSize, Jimp.AUTO);
            } catch (e) {
                deferred.reject(e);
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
            asset.thumb = this.folder+'thumbnails/'+asset.filename;

            p.write(WWW+asset.thumb, (err) => {
                if(err) deferred.reject(err);
                else deferred.resolve(asset);
            });
        }).catch(function (err) {
            console.error(err);
            deferred.reject(err);
        });

        return deferred.promise;
    }

    processImage(asset) {
        var deferred: Q.Deferred<any> = Q.defer();
        // console.log('details\n', details);
        this.makeThumbnail(asset).then( (asset:VOAsset)=> {
            console.log('ip.makeThumbnail done ');
            var newPath:string = this.folder + 'userImages/'+asset.filename;
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

    insertInDB(asset:VOAsset): Q.Promise<any>  {
        var deferred: Q.Deferred<any> = Q.defer();
        var mytable: TableModel = new TableModel(this.folder, "assets");

        var promise = mytable.insertContent(asset);
        promise.then(function (result: UpdateResult) {
            deferred.resolve(result);
            // onSuccess(out, res);
        }, (err)=> {deferred.reject(err)});
        return deferred.promise;
    };
}
