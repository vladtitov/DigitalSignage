/// <reference path="../../typings/express/express.d.ts" />

import * as express from 'express';
import Request = Express.Request;
import Response = Express.Response;
import Q = require('q');

import {TableModel} from "../db/TableModel";

import {DBDriver,  UpdateResult} from "../db/dbDriver";
import Promise = Q.Promise;
import {VOPlaylist, VOLayoutProps, VOPlayListProps, VOPlayLists_Assets} from "../../client/app/services/models";
import {ObjectDatabase} from "../db/ObjectDatabase";
import {PlayerController} from "./PlayerController";



declare var WWW:string;
declare var SERVER:string;
declare  var onError: (err:any, res: express.Response) => void;

var fs = require('fs');

const router = express.Router();

var ctr:PlayerController = new PlayerController();



router.get('/devices', function (request:express.Request, response:express.Response) {
    console.log(request.params);
    var folder :string = request.session['user_folder'];
    ctr.getAllDeviceswithLayoutImage(folder).done(
        devices=>response.json({data:devices})
        ,err=>response.json({error:err})
    )

});






router.get('/mydevice-stats/:id', function (request:express.Request, response:express.Response) {
    var id:number = Number(request.params.id);
    if(isNaN(id)){
        response.json({error:id,where:request.params.id});
        return
    }

    var folder :string = request.session['user_folder'];

    ctr.getDeviceAndLayoutStamps(id,folder).done(
        res=>response.json({data:res})
        ,err=>response.json({error:err})
    )



})

router.get('/layout-stats/:id', function (request:express.Request, response:express.Response) {
    var id:number = Number(request.params.id);

    if(isNaN(id)){
        response.json({error:id,where:request.params.id});
        return
    }

    var folder :string = request.session['user_folder'];

    ctr.getPlaylistStatsByLayout(id,folder).done(
        res=>response.json({data:res})
        ,err=>response.json({error:err})
    )
})
router.get('/layout/:id', function (request:express.Request, response:express.Response) {
    var id:number = Number(request.params.id);

    if(isNaN(id)){
        response.json({error:id,where:request.params.id});
        return
    }

    var folder :string = request.session['user_folder'];


    ctr.getLayout(id,folder).done(
        res=>response.json({data:res})
        ,err=>response.json({error:err})
    )
})
router.get('/playlist-props/:id', function (request:express.Request, response:express.Response) {
    var id:number = Number(request.params.id);
    if(isNaN(id)){
        response.json({error:id,where:request.params.id});
        return
    }

    var folder :string = request.session['user_folder'];
    ctr.getPlaylistProps(id,folder).done(
        res=>response.json({data:res})
        ,err=>response.json({error:err})
    )

});
router.get('/playlist-stats/:id', function (request:express.Request, response:express.Response) {
    var id:number = Number(request.params.id);
    if(isNaN(id)){
        response.json({error:id,where:request.params.id});
        return
    }

    var folder :string = request.session['user_folder'];
    ctr.getPlaylistStats(id,folder).done(
        res=>response.json({data:res})
        ,err=>response.json({error:err})
    )

});
router.get('/playlist/:id', function (request:express.Request, response:express.Response) {
    var id:number = Number(request.params.id);

    if(isNaN(id)){
        response.json({error:id,where:request.params.id});
        return
    }

    var folder :string = request.session['user_folder'];

    ctr.getPlaylistAssets(id,folder).done(
        res=>response.json({data:res})
        ,err=>response.json({error:err})
    )
})


/*router.get('/mydevice/:id', function (request:express.Request, response:express.Response) {
    var ctr:PlayerController = new PlayerController();

    var id:number = Number(request.params.id);
    if(isNaN(id)){
        response.json({error:id,where:request.params.id});
        return
    }

    ctr.getDeviceById(id).done(
        res=>response.json({data:res}),
        err=>response.json({error:err})
    );*/

    /*
     var p = playlisTable.selectContentById(id);

     p.then(function (props:VOPlayListProps) {


     var p2 = playlist_assets.selectPlayListItemsByListId(id);

     p2.then(function (assets: PlayListItemVO[]) {

     var out:PlaylistVO = new PlaylistVO({props:props,list:assets});
     response.json({data:out});
     }, function (err) {
     console.error(err);
     response.json({error:err});

     });
     }, function (err) {
     response.json({error:err});
     console.error(err);
     });*/
//});



router.get('/layout/:id/:token', function (request:express.Request, response:express.Response) {
    var id:number = Number(request.params.id);
    if(isNaN(id)){
        response.json({error:id,where:request.params.id});
        return
    }
/*

    var data:any = req.body;

    var pl:VOPlaylist = new VOPlaylist(req.body);
    //console.log(pl)
    var id:number = Number(req.params.id);
    if(isNaN(id)){
        res.json({error:' id shpuld be present'});
        return
    }
*/


});


router.get('/playlist/:id/:token', function (request:express.Request, response:express.Response) {
    var id:number = Number(request.params.id);
    if(isNaN(id)){
        response.json({error:' id shpuld be present'});
        return
    }

   /* var ctr:PlayerController = new PlayerController(request.session['user_folder']);
    ctr.getPlaylistById(id).done(
        res=>response.json({data:res})
        ,err=>response.json({error:err})
    )*/

});


router.post('/statistics/:id', function (req:express.Request, response:express.Response) {
    var body:any = req.body;
    // res.send(req.body);
    // return;
    var pl:VOLayoutProps = new VOLayoutProps(body);

    /* var promise = playlisTable.updateContent(pl);
     promise.then(function (result: {changes:number}) {
     if(result.changes) {
     res.json({data:result});
     } else {
     onError(result, res);
     }
     }, function (err) {
     console.log(err);
     onError(err, res);
     });*/
});


export = router