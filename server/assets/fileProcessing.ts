/// <reference path="../../typings/express/express.d.ts" />
///<reference path="../../typings/q/Q.d.ts"/>
///<reference path="../../typings/multer/multer.d.ts"/>

import Q = require('q');
import * as express from 'express';
import Multer = require("multer");
import {VOAsset} from "../../client/app/services/models";
declare var WWW:string;
declare var SERVER:string;

export interface IFileReq {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
}

var fs = require('fs');
var path = require('path');
var multer = require('multer');

export class FileProcessing {

   // fileReq: IFileReq;
   // filesReq: IFileReq[];

    constructor(private folder:string) { }

   /* uploadFile(req:express.Request, res:express.Response): Q.Promise<any> {
        var deferred: Q.Deferred<any> = Q.defer();

        var storage = multer.diskStorage({
            destination: function (req, file, callback) {
                callback(null, SERVER + '/uploads/' + file.fieldname);
            },
            filename: function (req, file, callback) {
                callback(null, '_' + Date.now() + '_' + file.originalname);
            }
        });

        function fileFilter (req, file, cb){
            var ext = file.originalname.substr(file.originalname.length - 3);
            if(ext === 'jpg' || ext === 'peg' || ext === 'png'){
                cb(null, true);
            } else if (ext === 'mov' || ext === 'avi') {
                cb(null, true);
            } else {
                cb(new Error('file type not supported'));
                // cb(null, false);
            }
        }

        var upload:express.RequestHandler = multer({ storage : storage, fileFilter: fileFilter}).single('file');

        upload(req,res, (err)=> {
            if(err) {
                deferred.reject(err);
            } else {
                var asset: VOAsset = new VOAsset({});
                asset.originalname = req.file.originalname;
                asset.size = req.file.size;
                asset.path = req.file.path;
                asset.mimetype = req.file.mimetype;
                asset.filename = req.file.filename;

                var ext = asset.originalname.substr(asset.originalname.length - 3);
                if(ext === 'jpg' || ext === 'peg' || ext === 'png'){
                    asset.type = 'image';
                } else if (ext === 'mov' || ext === 'avi') {
                    asset.type = 'video';
                }

                fs.stat(asset.path, (err, stats)=> {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        if(asset.size === stats["size"]){
                            deferred.resolve(asset);
                        } else {
                            deferred.reject({assetSize: asset.size, reason: 'not equal stat size'});
                        }
                    }
                });
            }
        });

        return deferred.promise;
    }*/

    uploadFile2(req:express.Request, res:express.Response,folder:string): Q.Promise<any> {
        var def: Q.Deferred<any> = Q.defer();
        console.log('uploadFile2');
        var uploadFolder:string = folder+'/uploads';
        var upload:express.RequestHandler = multer({ dest: WWW+'/'+uploadFolder}).single('file');

        upload(req,res,(err)=>{
            var newname:string = '_'+Math.round(Date.now()/1000)+'_'+req.file.originalname;
            var file = req.file;
//console.log(file);
            var newpath:string =  path.resolve(file.destination+'/'+newname);


            fs.rename(file.path, newpath,(err)=>{
                if(err)def.reject(err);
                else{
                    delete file.fieldname;
                    delete file.destination;
                    var asset:VOAsset = new VOAsset(file);
                    asset.filename = newname;
                    asset.path = uploadFolder+'/'+asset.filename;

                    def.resolve(asset);
                }
            })

        })

        return def.promise;
    }
    deleteFile(thumbnailPath:string, originaImagePath:string) {
        var deferred: Q.Deferred<any> = Q.defer();

        fs.unlink(thumbnailPath, (err)=> {
            if(err){
                deferred.reject(err);
            } else {
                fs.unlink(originaImagePath, (err)=> {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve();
                    }
                });
            }
        });

        return deferred.promise;
    }
}