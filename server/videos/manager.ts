/**
 * Created by Vlad on 8/24/2016.
 */
import * as express from 'express';
//import {DBDriver} from "../db/dbDriver";
import {VOAsset} from "../../client/app/services/models";


import {VideoServerConnect} from "./VideoServerConnect";
declare var WWW:string;


const router = express.Router();

router.get('/get-status/:id', function(request:express.Request, response:express.Response){
    var id:number = Number(request.params.id);
    if(isNaN(id)){
        response.json({error:request.params.id});
        return
    }
    var man:VideoServerConnect = new VideoServerConnect()
    man.getStatus(id).done(
        res=>response.json({data:res})
        ,err=>response.json({error:err})
    )
});

router.get('/get-new-video', function(request:express.Request, response:express.Response){
    console.log('get-new-video');
    var man:VideoServerConnect = new VideoServerConnect();
    man.getNextVideo().done(
        res=>response.json({data:res})
        ,err=>response.json({error:err})
    )
});


router.post('/processed', function(request:express.Request, response:express.Response){
    var asset:VOAsset = new VOAsset(request.body);

    var token:string = asset.token;
    delete asset.token;
    asset.path = asset.folder+'/'+asset.filename;
    var man:VideoServerConnect = new VideoServerConnect();
    var folder:string;

    console.log('got processed', asset);

    man.getAssetFolder(asset).done(
        res=>{
            folder= res;
            man.updateStatus(asset.id,'precessed',folder).done(
                res=>{
                    asset.status ='precessed';
                    man.downloadFiles(asset,folder).done(
                        asset=>{
                            man.finalize(asset,folder).done(
                                asset=> response.json({data:asset})
                                 ,err=>response.json({error:err})
                            )
                        },err=>response.json({error:err})
                    )

                },err=>response.json({error:err})
            )
        } ,err=>response.json({error:err})
    )




});







export = router