/**
 * Created by Vlad on 8/24/2016.
 */
import * as express from 'express';
import {DBDriver} from "../db/dbDriver";
import {VOAsset} from "../../client/app/services/models";


import {VideoManager} from "./VideoManager";
declare var WWW:string;


const router = express.Router();


router.get('/get-new-file', function(request:express.Request, response:express.Response){

    var man:VideoManager = new VideoManager()
    man.getNextVideo().done(
        res=>response.json({data:res})
        ,err=>response.json({error:err})
    )
});


router.post('/ready', function(request:express.Request, response:express.Response){
    var asset:VOAsset = new VOAsset(request.body);
    delete  asset.workingFolder;
    console.log(asset);
    var man:VideoManager = new VideoManager();
    man.registerReady(asset).done(
        asset2=>{
            //console.log(asset2);
            man.downloadFiles(asset2,asset2.folder).done(
                res=>{
                    asset2.status='ready';
                    man.finalize(asset2,asset2.folder).done(
                    res=>response.json({data:asset2})
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