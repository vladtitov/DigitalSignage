/**
 * Created by Vlad on 8/24/2016.
 */
import * as express from 'express';
import {DBDriver} from "../db/dbDriver";
import {VOAsset} from "../../client/app/services/models";

import * as fs from 'fs';
import * as Q from 'q';
declare var WWW:string;


const router = express.Router();


router.get('/get-new-file', function(request:express.Request, response:express.Response){

    var man:VideoManager = new VideoManager()
    man.getNextVideo().done(
        res=>response.json({data:res})
        ,err=>response.json({error:err})
    )
});




class VideoManager{

    getNextVideo(): Q.Promise<any>{
        var def: Q.Deferred<any> = Q.defer();
        var db:DBDriver = new DBDriver(null);
        var sql:string = 'SELECT * FROM process'
        db.queryAll(sql).done(
            res=>{
                var out:VOAsset;
                for(var i=0,n= res.length;i<n;i++){
                    var asset:VOAsset = res[i]
                    console.log(WWW+'/'+asset.path);
                    if(fs.existsSync(WWW+'/'+asset.path)){
                        out = asset
                               break
                    }else db.deleteById(asset.id,'process');
                }

                def.resolve(out)

            }
            ,err=>def.reject(err)
            )

        return def.promise;
    }
}






export = router