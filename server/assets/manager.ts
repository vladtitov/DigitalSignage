/// <reference path="../../typings/express/express.d.ts" />
///<reference path="../../typings/express-session/express-session.d.ts"/>


import * as express from 'express';
//import Request = Express.Request;
//import Response = Express.Response;
import Q = require('q');
// import mytablePI = require("../db/TableModel");

// import fileProcessing = require("./fileProcessing");
import {IFileReq} from "./fileProcessing";
import {FileProcessing} from "./fileProcessing";
import {ImageProcess} from "./ImageProcess";
import {TableModel} from "../db/TableModel";

import {UpdateResult} from "../db/dbDriver";
import {VideoProcess} from "./VideoProcess";
import {VOAsset} from "../../client/app/services/models";
import {AssetsController} from "./AssetsController";
import {VideoServerConnect} from "../videos/VideoServerConnect";

declare var WWW:string;
declare var SERVER:string;
declare  var onError: (err:any, res: express.Response) => void;

const router = express.Router();


var fs = require('fs');

// mytablePI.deleteTable();
// mytablePI.createNewTable().then(function (res) {
//     console.log(res);
// }, function (err) {
//     console.log(err);
// });
// mytablePI.getStucture().then(function (res) {
//     console.log(res);
// });

// var onError = function (err: any, res:express.Response) {
//     console.log('onError error\n', err);
//     //TODO Remove reason in production
//     res.json({error:'error', reason:err});
//
//     var str: string = "\r\n" + new Date().toLocaleString() + "\r\n";
//     str += JSON.stringify(err);
//
//     fs.appendFile(SERVER + 'error.log', str);
// };

// class SUplResult {
//     constructor() {}
//     insertId: number;   // id in DB
//     thumbPath: string;  // path to thumbnail
//     imagePath: string;  // path to original image
// }

/**
 * @api {get} api/assets/select-all Get All Assets
 * @apiVersion 0.0.1
 * @apiName GetAssets
 * @apiGroup Assets
 *
 * @apiDescription Response all assets from DB.
 *
 * @apiSuccessExample {json} Success-Response:
 *     {
 *         "data": [
 *            {
 *               "id": 1,
 *               "originalname": "face.png",
 *               "path": "/clientAssets/uploads/userImages/_1468357328476_face.png",
 *               "thumb": "/clientAssets/uploads/thumbnails/_1468357328476_face.png",
 *               "size": 132545,
 *               "width": 350,
 *               "height": 350,
 *               "mime": "image/png",
 *               "orientation": null,
 *               "active": null,
 *               "orig_duration": null
 *            },
 *            {
 *                "id": 2,
 *                "originalname": "face.png",
 *                "path": "/clientAssets/uploads/userImages/_1468359521555_face.png",
 *                "thumb": "/clientAssets/uploads/thumbnails/_1468359521555_face.png",
 *                "size": 132545,
 *                "width": 350,
 *                "height": 350,
 *                "mime": "image/png",
 *                "orientation": null,
 *                "active": null,
 *                "orig_duration": null
 *            }
 *         ]
 *      }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "errno": 1
 *       "code": "SQLITE_ERROR"
 *     }
 */

router.get('/select-all', function (req:express.Request, res:express.Response) {
    var folder:string = req.session['user_folder'];
    var mytable: TableModel = new TableModel(folder,"assets");

    var promise = mytable.selectAllContent();
    promise.then(function (result) {
        res.json({data:result});
    }, function (err) {
        console.log(err);
        res.json(err);
    });
});

router.post('/byid/:id', function (req:express.Request, res:express.Response) {
    var data:VOAsset = new VOAsset(req.body);
    var folder:string = req.session['user_folder'];
    var mytable: TableModel = new TableModel(folder,"assets");
    mytable.updateContent(data).then(function (result) {
        res.json({data:result});
    }, function (err) {
        console.log(err);
        res.json(err);
    });
});

router.post('/save-asset', function (req:express.Request, res:express.Response) {
    var data:VOAsset = new VOAsset(req.body);
    var folder:string = req.session['user_folder'];
    var mytable: TableModel = new TableModel(folder,"assets");
    // console.log('data ', data);

    if(!data.mimetype){
        res.json({error:"mime not found"});
        return;
    }

    data.id = Number(data.id);

    if(data.id === -1) {
        delete data.id;
        mytable.insertContent(data).then(function (result:UpdateResult) {
            res.json({data:result});
        }, function (err) {
            console.log(err);
            onError(err, res);
        });
    } else {
        mytable.updateContent(data).then(function (result: {changes:number}) {
            if(result.changes) {
                res.json({data:result});
            } else {
                onError(result, res);
            }
        }, function (err) {
            console.log(err);
            onError(err, res);
        });
    }
});


router.post('/delete-asset', function (req:express.Request, res:express.Response) {
    var data:VOAsset = new VOAsset(req.body);
    // console.log('data ', data);
    var folder:string = req.session['user_folder'];
    var mytable: TableModel = new TableModel(folder,"assets");
    mytable.deleteContent(data).then(function (result: {changes:number}) {
        res.json({data:result});
    }, function (err) {
        console.log(err);
        onError(err, res);
    });
});


/**
 * @api {get} api/assets/select/:id Get VOAsset
 * @apiVersion 0.0.1
 * @apiName GetAsset
 * @apiGroup Assets
 *
 * @apiDescription Response asset from DB by id.
 *
 * @apiParam {number} id   id in BD
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "id":  1
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *      {
 *          "data": {
 *               "id": 1,
 *               "originalname": "face.png",
 *               "path": "/clientAssets/uploads/userImages/_1468357328476_face.png",
 *               "thumb": "/clientAssets/uploads/thumbnails/_1468357328476_face.png",
 *               "size": 132545,
 *               "width": 350,
 *               "height": 350,
 *               "mime": "image/png",
 *               "orientation": null,
 *               "active": null,
 *               "orig_duration": null
 *          }
 *      }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "errno": 1
 *       "code": "SQLITE_ERROR"
 *     }
 */

router.get('/byid/:id', function (req:express.Request, res:express.Response) {
   var folder:string = req.session['user_folder'];
    var mytable: TableModel = new TableModel(folder,"assets");
    var promise = mytable.selectContentById(req.params.id);
    // res.json(req.params);
    promise.then(function (result) {
        if(result !== {}) {
            console.log("res", result);
            res.json({data:result});
        } else {
            onError(result, res);
        }
        // res.json({data:result});
    }, function (err) {
        console.log(err);
        onError(err, res);
        // res.json(err);
    });
});

router.post('/select-assets/', function (request:express.Request, response:express.Response) {
    var folder:string = request.session['user_folder'];
    if(!folder){
        response.json({error:'login'});
        return;
    }
    var body:any = request.body;

    var assetsID:number[] = body.assetsID.split(',').map(Number);
    // console.log('assetsID', assetsID);

    var ctr:AssetsController = new AssetsController();

    ctr.getAssets(assetsID,folder).done(
        res => response.json({data:res})
        , err => response.json({error:err})
    );
});

router.get('/used-playlist/:id', function (request:express.Request, response:express.Response) {

    var folder:string = request.session['user_folder'];
    if(!folder){
        response.json({error:'login'});
        return;
    }

    var id:number = Number(request.params.id);
    if(isNaN(id)){
        response.json({error:id,where:request.params.id});
        return
    }

    var ctr:AssetsController = new AssetsController();

    ctr.getUsedPlaylist(id,folder).done(
        res => response.json({data:res})
        , err => response.json({error:err})
    );
});

router.delete('/byid/:id', function (request:express.Request, response:express.Response) {
    var id:number = Number(request.params.id);
    var folder = request.session['user_folder'];

    if(isNaN(id)){
        response.json({error:' id shpuld be present'});
        return;
    }
    if(!folder){
        response.json({error:'login'});
        return;
    }

    var ctr:AssetsController = new AssetsController();

    ctr.deleteAsset(id,folder).done(
        res => response.json({data:res})
        , err => response.json({error:err})
    );
});

/**
 * @api {post} api/assets/upload Upload Image
 * @apiVersion 0.0.1
 * @apiName UploadImage
 * @apiGroup Assets
 *
 * @apiDescription Upload Image and create thumbnail.
 *
 * @apiParamExample {html} Request-Example:
 *      <form name      =  "uploadForm"
 *            id        =  "uploadForm"
 *            enctype   =  "multipart/form-data"
 *            action    =  "/api/assets/upload"
 *            method    =  "POST"
 *      >
 *          <input type="file" name="userImages" />
 *          <input type="submit" value="Upload Image" name="submit">
 *      </form>
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     data {
 *          insertId: 5,
 *          thumbPath: '/clientAssets/uploads/thumbnails/_1468011297776_face.png',
 *          imagePath: '/clientAssets/uploads/userImages/_1468011297776_face.png'
 *     }
 *
 * @apiErrorExample Error-Response:
 *     {
 *       "errno": 1
 *       "code": "SQLITE_ERROR"
 *     }
 */

router.post('/upload', function(req:express.Request,response:express.Response) {
    var folder:string = req.session['user_folder'];
    var token:string = req.session['user_token'];

    var fp:FileProcessing = new FileProcessing(folder);


    fp.uploadFile2(req, response,folder).then(function (asset:VOAsset) {//, fileType:string

        asset.folder = folder;

        var mimetype = asset.mimetype.substr(asset.mimetype.length - 3);
        if(mimetype === 'jpg' || mimetype === 'peg' || mimetype === 'png'){
            asset.type = 'image';
        } else if (mimetype === 'ime' || mimetype === 'avi') {
            asset.type = 'video';
        }else{
            response.status(400);
            response.json({error:'Unknown type '+asset.mimetype})
        }

      ///  console.log(asset)
        if(asset.type === 'image'){

            var ip:ImageProcess = new ImageProcess(folder);
            ip.processImage2(asset).then(
                res=>  response.json({data:res})
                ,err=> response.json({error: err})
            );

        } else if(asset.type === 'video'){
           // response.json({data:'success'});
            var video:VideoServerConnect = new VideoServerConnect(folder);

            video.insertProcess(asset).then(
                res => response.json({data:res})
                ,err => response.json({error: err})
            );
        }
        console.log('uploadFile done');
        // console.log('asset\n', asset);
    }, function (error) {
        console.error(error);
        response.json({error: error});
    });
});

// myltiple uploads - deprecated
// router.post('/uploads', function(req:express.Request,res:express.Response) {
//     // console.log(req.files);
//     // res.send(req.body);
//     // return;
//     var fp:FileProcessing = new FileProcessing();
//     var ip:ImageProcess = new ImageProcess();
//
//     var makeAsset = function (): Asset {
//         var lenWWW: number = WWW.length;
//
//         var asset = new Asset({});
//
//         asset.original_name = fp.fileReq.originalname;
//         asset.mime = fp.fileReq.mimetype;
//         asset.size = fp.fileReq.size;
//
//         asset.width = ip.widthImage;
//         asset.height = ip.heightImage;
//
//         asset.thumb = fp.newImagePathThumb;
//         asset.path = fp.newOriginalImagePath;
//
//         asset.thumb = asset.thumb.substr(lenWWW);
//         asset.path = asset.path.substr(lenWWW);
//
//         return asset;
//     };
//
//
//     var insertInDB = function () {
//         var a: Asset = makeAsset();
//
//         var promise = mytable.insertContent(a);
//         promise.then(function (result: UpdateResult) {
//             // console.log(result);
//             var out: SUplResult = new SUplResult();
//             out.insertId = result.insertId;
//             out.thumbPath = a.thumb;
//             out.imagePath = a.path;
//             res.json({data:out});
//             onSuccess(out, res);
//         }, function (err) {
//             // console.log(err);
//             fp.deleteFile(fp.newImagePathThumb, fp.newOriginalImagePath);
//             onError(err, res);
//         });
//     };
//
//     var processImage = function () {
//         var details:IFileReq = fp.fileReq;
//         // console.log('details\n', details);
//         ip.makeThumbnail(details.path, details.filename).then( function (thumbnailPath:string) {
//             // console.log('thumbnailPath ',thumbnailPath);
//             fp.moveImage(thumbnailPath, details.path, details.filename).then( function (result) {
//                 // console.log('moveFile result ', result);
//                 insertInDB();
//             }, function (err) {
//                 console.error(err);
//                 response.json({error:err});
//                 // onError(err, res);
//             });
//         });
//     };
//
//     // fp.startProces(req, res).then(function (result) {
//     fp.uploadImages(req, res).then(function (result) {
//         // console.log('result\n', result);
//         // console.log('asset\n', asset);
//         processImage();
//     }, function (error) {
//         onError(error, res);
//     });
//
// });

export = router