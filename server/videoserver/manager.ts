/**
 * Created by Vlad on 8/24/2016.
 */
import * as express from 'express';
import {DBDriver} from "../db/dbDriver";
import {VOAsset} from "../../client/app/services/models";


import {VideoManager} from "./VideoManager";
declare var WWW:string;


const router = express.Router();

router.get('/get-status/:id', function(request:express.Request, response:express.Response){
    var id:number = Number(request.params.id);
    if(isNaN(id)){
        response.json({error:request.params.id});
        return
    }
    var man:VideoManager = new VideoManager()
    man.getStatus(id).done(
        res=>response.json({data:res})
        ,err=>response.json({error:err})
    )
});

router.get('/get-new-file/:status', function(request:express.Request, response:express.Response){

    var status:string = request.params.status;
    var man:VideoManager = new VideoManager()
    man.getNextVideo(status).done(
        res=>response.json({data:res})
        ,err=>response.json({error:err})
    )
});


router.post('/ready', function(request:express.Request, response:express.Response){
    var asset:VOAsset = new VOAsset(request.body);
    delete  asset.workingFolder;
    var token:string = asset.token;
    delete asset.token;

    asset.path = asset.folder+'/'+asset.filename;

    asset.status='processed';
    console.log(asset);
    var man:VideoManager = new VideoManager();



    man.registerProcessed(asset).done(
        folder=>{
            asset.folder = folder;
            //console.log(asset2);

            man.downloadFiles(asset,folder).done(
                res=>{
                    asset.status='ready';
                    man.finalize(asset,folder).done(
                    res=>response.json({data:asset})
                    ,err=>response.json({error:err})
                )
                }
                ,err=>response.json({error:err})
            )
        }
        ,err=>response.json({error:err})
    )

});







export = router