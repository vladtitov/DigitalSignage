/// <reference path="../../typings/express/express.d.ts" />

import * as express from 'express';
import Request = Express.Request;
import Response = Express.Response;
import Q = require('q');

import {TableModel} from "../db/TableModel";
import {Playlists_Assets} from "./Playlists_Assets";
import {PlaylistItemsTable, ISPlayListItem} from "./PlaylistItemsTable";

import {PlaylistsTable} from "./PlaylistsTable";
import {PlayListsController} from "./controller";
import {DBDriver,  UpdateResult} from "../db/dbDriver";
import Promise = Q.Promise;
import {VOPlaylist, VOLayoutProps, VOPlayListProps, VOPlayLists_Assets} from "../../client/app/services/models";


declare var WWW:string;
declare var SERVER:string;
declare  var onError: (err:any, res: express.Response) => void;

var fs = require('fs');

const router = express.Router();
// var mytablePI: TableModel = new TableModel("playlists", Playlists_Assets.getInit());



///var sqlite3 = require('sqlite3').verbose();
//var db = new sqlite3.Database(SERVER + '/db/ads.db');

// mytablePI.deleteTable();
// mytablePI.createNewTable().then(function (res) {
//     console.log(res);
// }, function (err) {
//     console.log(err);
// });

// mytableP.createNewTable().then(function (res) {
//     console.log(res);
// }, function (err) {
//     console.log(err);
// });




/*
router.get('/all', function (req:express.Request, respond:express.Response) {
    playlist_assets.getAll().done(function(result:any[]){
        respond.json({data:result})
    },function(err){
        respond.json({error:err})
    })

});
*/

/**
 * @api {get} api/playlists/all Get All Playlists Items
 * @apiVersion 0.0.1
 * @apiName GetPlaylistsItems
 * @apiGroup Playlists
 *
 * @apiDescription Response all playlists items are grouped by playlists.
 *
 * @apiSuccessExample {json} Success-Response:
 {
     "data": [
         {
             "list": {
                 "id": 1,
                 "name_pl": null,
                 "description": null,
                 "size": null,
                 "time_from": null,
                 "time_to": null,
                 "created_user": null,
                 "created_time": null,
                 "duration": null,
                 "active": null,
                 "dimension": null
             },
             "item": [
                 {
                     "id": 1,
                     "playlist_id": 1,
                     "asset_id": 84,
                     "duration": 0,
                     "after_id": 0,
                     "type": "img",
                     "position": null,
                     "asset": {
                         "id": 84,
                         "original_name": "1922.jpg",
                         "path": "/clientAssets/uploads/userImages/_1468553585376_1922.jpg",
                         "thumb": "/clientAssets/uploads/thumbnails/_1468553585376_1922.jpg",
                         "size": 98484,
                         "width": 422,
                         "height": 512,
                         "mime": "image/jpeg",
                         "orig_dimension": null,
                         "active": null,
                         "duration": null,
                         "type": null,
                         "time_from": null,
                         "time_to": null,
                         "created_user": null,
                         "created_time": null
                     }
                 },
         ................

      ]
  }
  *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "errno": 1
 *       "code": "SQLITE_ERROR"
 *     }
 */

router.get('/all', function (request:express.Request, response:express.Response) {
    var folder = request.session['user_folder'];
    if(!folder){
        response.json({error:'login'});
        return;
    }


    var ctr:PlayListsController = new PlayListsController();

    ctr.getAllPlaylistWithAssets(folder).done(
        res => response.json({data:res})
        , err => response.json({error:err})
    )
    // all.onComplete = function (out) {
    //     res.json({data:out});
    // }
});


router.get('/used/:id', function (request:express.Request, response:express.Response) {
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


    var ctr:PlayListsController = new PlayListsController();

    ctr.getUsedLayoutsLabels(id,folder).done(
        res => response.json({data:res})
        , err => response.json({error:err})
    );
});

router.get('/props/:id', function (req:express.Request, response:express.Response) {

    var id:number = Number(req.params.id);
    if(isNaN(id)){
        response.json({error:id,where:req.params.id});
        return
    }
    var playlisTable: PlaylistsTable = new PlaylistsTable(req.session['user_folder']);
     var p = playlisTable.selectContentById(id);
    p.then(function (props:VOPlayListProps) {
        response.json({data:props});
   }, function (err) {
     response.json({error:err});
     console.error(err);
     });
});

router.get('/assets/:id', function (req:express.Request, response:express.Response) {

    var id:number = Number(req.params.id);
    if(isNaN(id)){
        response.json({error:id,where:req.params.id});
        return
    }
    var playlist_assets: PlaylistItemsTable = new PlaylistItemsTable(req.session['user_folder']);
        var p2 = playlist_assets.selectPlayListItemsByListId(id);

        p2.then(function (assets: VOPlayLists_Assets[]) {
            response.json({data:assets});
        }, function (err) {
            console.error(err);
            response.json({error:err});

        });

});




/**
 * @api {get} api/playlists/byid/:id Get Playlist By Id
 * @apiVersion 0.0.1
 * @apiName Get Playlist By Id
 * @apiGroup Playlists
 *
 * @apiDescription Response playlist item from DB by ListId.
 *
 * @apiParam {number} id   listid in BD
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "id":  2
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
     {
         "data": {
             "playlist": {
                "id": 3,
                "name_pl": "some name",
                "description": "some description",
                "size": 6574894,
                "time_from": 0,
                "time_to": 25,
                "created_user": 1,
                "created_time": 21,
                "duration": 25,
                "active": 1,
                "dimension": "landscape"
             },
             "items": [
                 {
                     "id": 6,
                     "original_name": "1922.jpg",
                     "path": "/clientAssets/uploads/userImages/_1468553585376_1922.jpg",
                     "thumb": "/clientAssets/uploads/thumbnails/_1468553585376_1922.jpg",
                     "size": 98484,
                     "width": 422,
                     "height": 512,
                     "mime": "image/jpeg",
                     "orig_dimension": null,
                     "active": null,
                     "duration": 10,
                     "type": "img",
                     "time_from": null,
                     "time_to": null,
                     "created_user": null,
                     "created_time": null,
                     "playlist_id": 3,
                     "asset_id": 84,
                     "after_id": 0,
                     "dimension": null
                 },
                 {
                     "id": 7,
                     "original_name": "1920.jpg",
                     "path": "/clientAssets/uploads/userImages/_1468553585370_1920.jpg",
                     "thumb": "/clientAssets/uploads/thumbnails/_1468553585370_1920.jpg",
                     "size": 171987,
                     "width": 720,
                     "height": 506,
                     "mime": "image/jpeg",
                     "orig_dimension": null,
                     "active": null,
                     "duration": 10,
                     "type": "img",
                     "time_from": null,
                     "time_to": null,
                     "created_user": null,
                     "created_time": null,
                     "playlist_id": 3,
                     "asset_id": 85,
                     "after_id": 6,
                     "dimension": null
                 }
             ]
         }
     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "errno": 1
 *       "code": "SQLITE_ERROR"
 *     }
 */

router.get('/byid/:id', function (req:express.Request, response:express.Response) {

    var id:number = Number(req.params.id);
    if(isNaN(id)){
        response.json({error:id,where:req.params.id});
        return
    }


    var playlist_assets: PlaylistItemsTable = new PlaylistItemsTable(req.session['user_folder']);
    var playlisTable: PlaylistsTable = new PlaylistsTable(req.session['user_folder']);
    var p = playlisTable.selectContentById(id);

    p.then(function (props:VOPlayListProps) {


        var p2 = playlist_assets.selectPlayListItemsByListId(id);

        p2.then(function (assets: VOPlayLists_Assets[]) {

            var out:VOPlaylist = new VOPlaylist({props:props,list:assets});
            response.json({data:out});
        }, function (err) {
            console.error(err);
            response.json({error:err});

        });
    }, function (err) {
        response.json({error:err});
        console.error(err);
    });
});


router.post('/byid/:id', function (req:express.Request, res:express.Response) {
    var data:any = req.body;

    var pl:VOPlaylist = new VOPlaylist(req.body);
    //console.log(pl)
    var id:number = Number(req.params.id);
    if(isNaN(id)){
        res.json({error:' id shpuld be present'});
        return
    }

    var playlist_assets: PlaylistItemsTable = new PlaylistItemsTable(req.session['user_folder']);
    var playlisTable: PlaylistsTable = new PlaylistsTable(req.session['user_folder']);
    playlisTable.updateContentById(pl.props,id)
        .done(function(result:UpdateResult){
            // console.log(result);
            if(result.insertId) id = result.insertId;

            playlist_assets.updatePalylist(pl.list,id)
                .done(function(final:any){
                    console.log(final);

                    res.json({data:result});
                },function(err){
                    console.error(err);
                    res.json({error:err});
                })
        })

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

    var ctr:PlayListsController = new PlayListsController();

    ctr.deletePlaylist(id,folder).done(
        res => response.json({data:res})
        , err => response.json({error:err})
    );
});



// router.get('/get-playlist-byid/:id', function (req:express.Request, res:express.Response) {
//
//     var out = {params:null, items:null};
//
//     var p = mytablePI.selectPlayListItemsByListId(req.params.id);
//     // res.json(req.params);
//     p.then(function (result: ISPlayListItem[]) {
//         out.items = result;
//         res.json({data:out});
//     }, function (err) {
//         console.log(err);
//         onError(err, res);
//     });
// });

/**
 * @api {get} api/playlists/create-playlist Create New Playlist
 * @apiVersion 0.0.1
 * @apiName NewPlaylist
 * @apiGroup Playlists
 *
 * @apiDescription Create New Playlist ID in DB.
 *
 * @apiSuccessExample {json} Success-Response:
 *     {
 *         "data": {
 *                 "playlistId": 11
 *             }
 *      }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "errno": 1
 *       "code": "SQLITE_ERROR"
 *     }
 */

/*
router.get('/create-playlist', function (req:express.Request, res:express.Response) {
    var pl:VOLayoutProps = new VOLayoutProps({name_pl:'new playlist '});
    // res.json(req.params);
    var p = playlisTable.insertContent(pl);
    p.then(function (result: UpdateResult) {
        res.json({data:{'playlistId':result.insertId}});
    }, function (err) {
        console.log(err);
        onError(err, res);
    });
});
*/

// router.get('/create-playlist', function (req:express.Request, res:express.Response) {
//     var column_name: string = 'playlist_id';
//     var promise = mytablePI.selectMax(column_name);
//     // res.json(req.params);
//     promise.then(function (result: {column_name:number}) {
//         var max = result[column_name] ? ++result[column_name] : 1;
//         var p = mytablePI.insertContent(result);
//         p.then(function (result: {id:number}) {
//             // console.log("res", column_name, result.playlist_id);
//             res.json({data:{'playlistId':max}});
//         }, function (err) {
//             onError(err, res);
//         });
//         // res.json({data:result});
//     }, function (err) {
//         console.log(err);
//         onError(err, res);
//         // res.json(err);
//     });
// });

/**
 * @api {post} api/playlists/update-playlist Update Playlist
 * @apiVersion 0.0.1
 * @apiName UpdatePlaylist
 * @apiGroup Playlists
 *
 * @apiDescription Update Playlist (fields of playlist) in DB.
 *
 * @apiParam {Number} id    required parameter (prime).
 *
 *
 * @apiParam {Number} duration   optional
 *
 * @apiParamExample {json} Request-Example:
     {
         "id": 3,
         "name_pl": "some name",
         "description": "some description",
         "size": 6574894,
         "time_from": 0,
         "time_to": 25,
         "created_user": 1,
         "created_time": 21,
         "duration": 25,
         "active": 1,
         "dimension": "landscape"
     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *       {
 *          "data": {
 *              "changes": 1
 *          }
 *       }
 *
 * @apiErrorExample Error-Response:
 *     {
 *       "error": "error",
 *       "reason": {
 *          "changes": 0
 *       }
 *     }
 */

router.post('/update-playlist', function (req:express.Request, res:express.Response) {
    var body:any = req.body;
    // res.send(req.body);
    // return;
    var pl:VOLayoutProps = new VOLayoutProps(body);
    var playlisTable: PlaylistsTable = new PlaylistsTable(req.session['user_folder']);
    var promise = playlisTable.updateContent(pl);
    promise.then(function (result: {changes:number}) {
        if(result.changes) {
            res.json({data:result});
        } else {
            onError(result, res);
        }
    }, function (err) {
        console.log(err);
        onError(err, res);
    });
});

/**
 * @api {post} api/playlists/insert-playlist-item Insert Playlist Item
 * @apiVersion 0.0.1
 * @apiName InsertPlaylistItem
 * @apiGroup Playlists
 *
 * @apiDescription Insert Content into playlist in position where after_id previous content id.
 *                 Return all inserted fields of playlists + full assets.
 *
 * @apiParam {Number} playlist_id     required parameter and must be > 0.
 * @apiParam {Number} asset_id    required parameter and must be > 0.
 * @apiParam {Number} after_id    required parameter and must be !< 0.
 * @apiParam {Number} duration   optional
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "playlist_id":7,
 *       "asset_id": 3,
 *       "after_id":6
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *       {
 *        "data": [
 *          {
 *            "id": 30,
 *            "original_name": "face.png",
 *            "path": "/clientAssets/uploads/userImages/_1468363584469_face.png",
 *            "thumb": "/clientAssets/uploads/thumbnails/_1468363584469_face.png",
 *            "size": 132545,
 *            "width": 350,
 *            "height": 350,
 *            "mime": "image/png",
 *            "orientation": null,
 *            "active": null,
 *            "orig_duration": null,
 *            "playlist_id": 7,
 *            "asset_id": 3,
 *            "duration": null,
 *            "after_id": 6
 *          }
 *        ]
 *      }
 *
 * @apiErrorExample Error-Response:
 *     {
 *       "errno": 1
 *       "code": "SQLITE_ERROR"
 *     }
 */

router.post('/insert-playlist-item', function (req:express.Request, res:express.Response) {
    var body:any = req.body;
    // res.send(req.body);
    // return;
    var pl = new Playlists_Assets(body);

    // var isValid = function (arg:Playlists_Assets) {
    //     return (typeof pl.playlist_id === 'number' && typeof pl.asset_id === 'number' && typeof pl.after_id === 'number');
    // };
    var err: string;

    var isValid = function (arg:Playlists_Assets) {
        if(arg.listId <= 0 || typeof arg.listId !== 'number') {
            err = 'playlist_id <= 0 or must by number';
            return err;
        } else if (arg.assetId <= 0 || typeof arg.assetId !== 'number') {
            err = 'asset_id <= 0 or must by number';
            return err;
        } else if (arg.afterId < 0 || typeof arg.afterId !== 'number') {
            err = 'after_id < 0 or must by number';
            return err;
        }
    };

    if(isValid(pl)) {
        res.json({error:err, pl:pl});
        return;
    }

    var playlist_assets: PlaylistItemsTable = new PlaylistItemsTable(req.session['user_folder']);

    var promise = playlist_assets.insertContent(pl);
    promise.then(function (result:UpdateResult) {
        pl.id = result.insertId;
        var p1 = playlist_assets.updatePlaylist_Item(pl);
        p1.then(function (result1:{changes:number}) {
            var p2 = playlist_assets.selectPlayListItemById(result.insertId);
            p2.then(function (result: ISPlayListItem[]) {
                res.json({data:result});
            }, function (err) {
                console.log(err);
                onError(err, res);
            });
        })
    }, function (err) {
        console.log(err);
        onError(err, res);
        // res.json(err);
    });
});

/**
 * @api {post} api/playlists/update-playlist-item Update Playlist Item
 * @apiVersion 0.0.1
 * @apiName UpdatePlaylistItem
 * @apiGroup Playlists
 *
 * @apiDescription Update Playlist item(fields of playlist) in DB.
 *
 * @apiParam {Number} id         required parameter (prime).
 * @apiParam {Number} after_id    optional
 * @apiParam {Number} duration   optional
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "id":28,
 *       "duration":20,
 *       "after_id":6
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *       {
 *          "data": {
 *              "changes": 1
 *          }
 *       }
 *
 * @apiErrorExample Error-Response:
 *     {
 *       "error": "error",
 *       "reason": {
 *          "changes": 0
 *       }
 *     }
 */

router.post('/update-playlist-item', function (req:express.Request, res:express.Response) {
    var body:any = req.body;
    // res.send(req.body);
    // return;
    var pl = new Playlists_Assets(body);
    var playlist_assets: PlaylistItemsTable = new PlaylistItemsTable(req.session['user_folder']);

    var promise = playlist_assets.updateContent(pl);
    promise.then(function (result: {changes:number}) {
        if(result.changes) {
            res.json({data:result});
        } else {
            onError(result, res);
        }
    }, function (err) {
        console.log(err);
        onError(err, res);
    });
});

/**
 * @api {get} api/playlists/delete-playlist-item-byid/:id Delete Playlist Item By Id
 * @apiVersion 0.0.1
 * @apiName DeletePlaylistItemById
 * @apiGroup Playlists
 *
 * @apiDescription Delete Playlist(fields of playlist) in DB.
 *
 * @apiParam {Number} id         required parameter (prime).
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "id":28
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *       {
 *          "data": {
 *              "changes": 1
 *          }
 *       }
 *
 * @apiErrorExample Error-Response:
 *     {
 *       "error": "error",
 *       "reason": {
 *          "changes": 0
 *       }
 *     }
 *
 */

router.get('/delete-playlist-item-byid/:id', function (req:express.Request, res:express.Response) {
    // var id:any = req.params.id;
    // res.send(req.body);
    // return;
    var pl = new Playlists_Assets({id:req.params.id});
    if(isNaN(pl.id)) {
        res.json({error:req.params.id});
        return;
    }

    var playlist_assets: PlaylistItemsTable = new PlaylistItemsTable(req.session['user_folder']);

    var promise = playlist_assets.deletePlaylists_Assets(pl.id);
    promise.then(function (result: {changes:number}) {
        if(result.changes) {
            res.json({data:result});
        } else {
            onError(result, res);
        }
    }, function (err) {
        console.log(err);
        onError(err, res);
    });

    // var promise = mytablePI.deleteContent(pl);
    // promise.then(function (result: {changes:number}) {
    //     if(result.changes) {
    //         res.json({data:result});
    //     } else {
    //         onError(result, res);
    //     }
    // }, function (err) {
    //     console.log(err);
    //     onError(err, res);
    // });
});

/**
 * @api {get} api/playlists/delete-playlist-byid/:id Delete Playlist ById
 * @apiVersion 0.0.1
 * @apiName DeletePlaylistById
 * @apiGroup Playlists
 *
 * @apiDescription Delete Playlist ById.
 *
 * @apiParam {Number} Id         required parameter (prime).
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "id":2,
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *       {
 *          "data": {
 *              "changes": 2
 *          }
 *       }
 *
 * @apiErrorExample Error-Response:
 *     {
 *       "error": "error",
 *       "reason": {
 *          "changes": 0
 *       }
 *     }
 *
 */

router.get('/delete-playlist-byid/:id', function (req:express.Request, res:express.Response) {


    var pl = new Playlists_Assets({listId:req.params.id});
    var id:number = Number(req.params.id);
    if(isNaN(id)) {
        res.json({error:req.params.id});
        return;
    }
    var playlist_assets: PlaylistItemsTable = new PlaylistItemsTable(req.session['user_folder']);
    var promise = playlist_assets.deletePlatlist(id);
    promise.then(function (result: {changes:number}) {
        if(result.changes) {
            res.json({data:result});
        } else {
            onError(result, res);
        }
    }, function (err) {
        console.log(err);
        onError(err, res);
    });
});

export = router