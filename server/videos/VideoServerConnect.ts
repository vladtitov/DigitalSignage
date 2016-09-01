import {DBDriver} from "../db/dbDriver";
import {VOAsset} from "../../client/app/services/models";
/**
 * Created by Vlad on 8/25/2016.
 */
import * as fs from 'fs';
import * as Q from 'q';
import * as path from 'path';

import * as http from 'http';
import {IncomingMessage} from "http";
declare var WWW:string;


export class FileDownloader{

    destination:string;
    onComplete:Function;
    constructor(private url:string, private folder:string,private filename:string){

    }

    getFile():void{
        this.downloader((err)=>{
            if(this.onComplete) this.onComplete(err)
        })
    }




    downloader(callBack:Function):void{

        var dest = path.resolve(WWW+'/'+this.folder+'/'+this.filename);

        var file:any = fs.createWriteStream(dest);
       // console.log(url,dest);


        http.get(this.url,function(response){
            response.pipe(file);
            file.on('finish', function() {
                file.close(callBack);  // close() is async, call cb after close completes.
            }).on('error', function(err) {
                fs.unlink(dest);
                if (callBack) callBack(err);
            });
        } )
    }
}



export  class VideoServerConnect{

    // folder:string;
    // server:string='http://192.168.1.12:56555';
    // server:string='http://192.168.0.82:56555';
    server:string='http://127.0.0.1:56555';

    constructor(private folder?:string) {

    }


    downloadFiles(asset:VOAsset,folder:string): Q.Promise<any>{
        var def: Q.Deferred<any> = Q.defer();


       folder+='/userVideos';
        var thumbs:string[] = asset.thumb.split(',');

        var down:FileDownloader = new FileDownloader(this.server+'/'+asset.folder+'/'+asset.filename,folder,asset.filename);
        down.onComplete=(err)=>{
            if(err)def.reject(err);
            else {
                asset.path = folder+'/'+asset.filename;
                var ar = thumbs.map(function (item) {
                    return folder +'/'+item;
                })
                asset.thumb= ar.join(',');
                def.resolve(asset)
            }
        }
        down.getFile();


        thumbs.forEach((filename:string)=>{
            var d:FileDownloader = new FileDownloader(asset.folder+'/'+filename,folder,filename);
            d.getFile();
        })



        return def.promise;
    }


    sendNotification(asset:VOAsset): Q.Promise<any>{
        console.log('sendNotification');
        var def: Q.Deferred<any> = Q.defer();
        http.get(this.server+'/'+'wake-up',(res:IncomingMessage)=>{
            // console.log('sendNotification res', res);
            def.resolve(res);
        });
        return def.promise;
    }

    insertProcess(asset:VOAsset): Q.Promise<any>{
        console.log('insertProcess');
        var def: Q.Deferred<any> = Q.defer();
        var db = new DBDriver(null);
        asset.status = 'newvideo';
        asset.timestamp = Math.round(Date.now()/1000);
        db.insertRow(asset,'process').done(
            res=>{
                var db = new DBDriver(this.folder);
                asset.process_id = res.insertId;
                this.sendNotification(asset);
                db.insertRow(asset,'assets').done(
                    res=>def.resolve(res)
                    ,err=> def.reject(err)
                )
            }
            ,err=> def.reject(err)
        )

        return def.promise;
    }


    /*  updateDatabases(asset:VOAsset,folder:string): Q.Promise<any>{
          var def: Q.Deferred<any> = Q.defer();
          var db:DBDriver = new DBDriver(null);
          var db2:DBDriver = new DBDriver(folder);

          console.log('  updateDatabases  folder   '+folder);

          db.updateRow({id:asset.id,status:asset.status},'process').done(
              res=>{
                  console.log(res);
                  var asset2:VOAsset = new VOAsset(asset)
                  asset2.process_id = asset.id;
                  delete asset2.id;
                  delete asset2.token;

                  db2.updateRowByColumn(asset2,'process_id','assets').done(
                 res=> def.resolve(res)
                  ,err=>def.reject(err)
              )}
              ,err=>def.reject(err)
          );



          return def.promise;
      }
  */


  getStatus(id:number):Q.Promise<any>{
      var db:DBDriver = new DBDriver(null);
      return db.selectColumsById(id,'status','process');
    }

  updateStatus(asset:VOAsset,folder:string):Q.Promise<any>{
      var def: Q.Deferred<any> = Q.defer();

      var db:DBDriver = new DBDriver(null);
      db.updateRow({id:asset.id,status:asset.status},'process').done(
          res=>{
              var db2:DBDriver = new DBDriver(folder);
              db2.updateRowByColumn({process_id:asset.id,status:asset.status},'process_id','assets').done(
                  res=>def.resolve(asset)
                  ,err=>def.reject(err)
              )
          }
          ,err=>def.reject(err)
      )


      return def.promise;
  }
    finalize(asset:VOAsset,folder:string): Q.Promise<any>{
        var def: Q.Deferred<any> = Q.defer();

        this.saveAssetData(asset,folder).done(
           res=> this.updateStatus(asset,folder).done(
               res=>def.resolve(asset)
               ,err=>def.reject(err)
           )
            ,err=>def.reject(err)
        )
        ///TODO clenup db and drive


        return def.promise;
    }

    saveAssetData(asset:VOAsset,folder:string): Q.Promise<any>{
        var db2:DBDriver = new DBDriver(folder);
        asset.process_id = asset.id;
        return  db2.updateRowByColumn(new VOAsset(asset),'process_id','assets')
    }


    updateProcessed(asset:VOAsset): Q.Promise<any>{
        var def: Q.Deferred<any> = Q.defer();
        var db:DBDriver = new DBDriver(null);

        db.selectById(asset.id,'process').done( ///need select to confirm folder for security reason
            row =>{
               if(row){
                   var folder:string = row.folder;
                   this.updateStatus(asset,folder).done(
                       res=>def.resolve(folder)
                       ,err=>def.reject(err)
                   )
                  /* db.updateRow({id:asset.id,status:asset.status},'process');

                   this.saveAssetData(asset,folder).done(
                       res=>def.resolve(asset)
                       ,err=>def.reject(err)
                   )*/

               }else def.reject('notexists')
            }
            ,err=>def.reject(err)
        )


        return def.promise;
    }





    getNextVideo(): Q.Promise<any>{
        console.log('getNextVideo');
        var status:string = 'newvideo';
        var def: Q.Deferred<any> = Q.defer();
        var db:DBDriver = new DBDriver(null);
        var sql:string = 'SELECT * FROM process WHERE status=?';
        db.selectAll(sql,[status]).done(
            res=>{
                var out:VOAsset;
                for(var i=0,n= res.length;i<n;i++){
                    var asset:VOAsset = res[i];
                    //console.log(WWW+'/'+asset.path);
                    if(fs.existsSync(WWW+'/'+asset.path)){
                        out = asset;
                        break
                    }else db.deleteById(asset.id,'process');
                }
                if(out){
                    db.updateRow({id:out.id,status:'requested'},'process')
                }
                def.resolve(out|| {});
            }
            ,err=>def.reject(err)
        )

        return def.promise;
    }
}

