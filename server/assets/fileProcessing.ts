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

    fileReq: IFileReq;
    filesReq: IFileReq[];

    constructor(private folder:string) { }

    uploadFile(req:express.Request, res:express.Response): Q.Promise<any> {
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
                asset.original_name = req.file.originalname;
                asset.size = req.file.size;
                asset.path = req.file.path;
                asset.mime = req.file.mimetype;
                asset.filename = req.file.filename;

                var ext = asset.original_name.substr(asset.original_name.length - 3);
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