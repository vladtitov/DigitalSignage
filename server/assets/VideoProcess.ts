///<reference path="../../typings/q/Q.d.ts"/>


import Q = require('q');
import {VOAsset} from "../../client/app/services/models";
import {UpdateResult} from "../db/dbDriver";
import {TableModel} from "../db/TableModel";

declare var WWW:string;
declare var SERVER:string;

var fs = require('fs');
var ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(SERVER + "/ffmpeg/bin/ffmpeg.exe");
ffmpeg.setFfprobePath(SERVER + "/ffmpeg/bin/ffprobe.exe");

export class  VideoProcess {

    metadata: {};

    constructor(private folder:string) {}

    makeThumbnails(asset:VOAsset): Q.Promise<any> {
        var deferred: Q.Deferred<any> = Q.defer();

        var filename:string = asset.filename;
        var srcPath = asset.path;
        var cientFolder = this.folder + 'userVideos/';
        var destPath = cientFolder + filename;
        var thumbs: string[];
        var w = 256;
        var k=w/asset.width;
        var h:number= Math.round(asset.height*k);
        if(asset.height>asset.width){
            h=256;
            k=h/asset.height;
            w=Math.round(asset.width*k);
        }

        var proc = ffmpeg(WWW+srcPath)
            .on('filenames', function(filenames) {
                thumbs = filenames.map(function(val) {
                    return cientFolder + val;
                });
                asset.thumb = thumbs.join(', ');
                // console.log('screenshots are ' + thumbs.join(', '));
            })
            .on('end', function() {
                deferred.resolve(asset);
               console.log('screenshots   saved');
            })
            .on('error', function(err) {
                deferred.reject(err);
            })
            .takeScreenshots(
                {
                    filename: filename +'.png',
                    // count: 1,
                    timemarks: ['10%','30%','50%'],
                    size: w+'x'+h
                },
                WWW + cientFolder
            )

        return deferred.promise;
    }

    convertVideo(asset:VOAsset): Q.Promise<any>{
        var def: Q.Deferred<any> = Q.defer();
        var filename:string = asset.filename;
        var srcPath = asset.path;
        var cientFolder = this.folder + 'userVideos/';
        var destPath = cientFolder + filename.substr(0, filename.lastIndexOf('.'))+'.mp4';

        var cientFolder = this.folder + 'userVideos/';
        ffmpeg(srcPath)
            .on('end', function() {
               console.log('end convert');
                asset.path = destPath;
                def.resolve(asset);

            })
            .on('error', function(err) {
                def.reject(err);
            })
           // .audioCodec('libfaac')
            .videoCodec('libx264')
            .format('mp4')

            .save(WWW+destPath);

        return def.promise
}
    getMetadata(asset:VOAsset): Q.Promise<any>  {
        var deferred: Q.Deferred<any> = Q.defer();
        // console.log('tempDir+filename = ', this.tempDir+filename);
        this.metadata = ffmpeg.ffprobe(asset.path, function(err, mdata) {
            if(err) { deferred.reject(err); return; }
            // console.log('metadata ', mdata);
            var stream = mdata.streams[0];

            asset.width = stream.width;
            asset.height = stream.height;
            asset.duration = Math.round(stream.duration);

            // asset.metadata = JSON.stringify(mdata);
            deferred.resolve(asset);
        });
        return deferred.promise;
    }


    processVideo(asset:VOAsset): Q.Promise<any> {
        var deferred: Q.Deferred<any> = Q.defer();

        this.getMetadata(asset).then( (asset:VOAsset)=> {
            // console.log('metadata ', vp.metadata);
            this.convertVideo(asset).then( (asset:VOAsset)=> {
                this.makeThumbnails(asset).then( (asset:VOAsset)=> {
                    // console.log('vp.makeThumbnail done ', asset);
                    this.insertInDB(asset).then(function (result:UpdateResult) {
                        deferred.resolve(result);
                    }, (err)=> {deferred.reject(err)});

                }, (err)=> {deferred.reject(err)});
            }, (err)=> {deferred.reject(err)});
        }, (err)=> {deferred.reject(err)});
        // console.log('processVideo');
        return deferred.promise;
    };


    insertInDB(asset:VOAsset) {
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
