/**
 * Created by Vlad on 8/19/2016.
 */
import * as express from 'express';
import Request = Express.Request;
import Response = Express.Response;
import Q = require('q');
import {DevicesController} from "../layouts/DevicesController";
import {PlayListsController} from "../playlists/controller";

declare var WWW:string;
declare var SERVER:string;

const router = express.Router();
const myfolder = '/clientAssets/folder_hbrowser'

router.get('/device/:id', function (request:express.Request, response:express.Response) {
    var id:number = Number(request.params.id);
    if(isNaN(id)){
        response.json({error:' id shpuld be present'});
        return
    }
    var ctr:DevicesController = new DevicesController(myfolder);
    ctr.getDeviceWithLayout(id).done(
        res=>response.json({data:res})
        ,err=>response.json({error:err})
    )
});
router.get('/playlist/:id', function (request:express.Request, response:express.Response) {
    var id:number = Number(request.params.id);
    if(isNaN(id)){
        response.json({error:' id shpuld be present'});
        return
    }

    var ctr:PlayListsController = new PlayListsController();
    ctr. getPlaylistWithAssets(id,myfolder).done(
        res=>response.json({data:res})
        ,err=>response.json({error:err})
    );

});

router.get('/playlist-timestamp/:id', function (request:express.Request, response:express.Response) {
    var id:number = Number(request.params.id);
    if(isNaN(id)){
        response.json({error:' id shpuld be present'});
        return
    }

    var ctr:PlayListsController = new PlayListsController(myfolder);
    ctr.getPlaylistTimestamp(id).done(
        res=>response.json({data:res})
        ,err=>response.json({error:err})
    );

});





export = router