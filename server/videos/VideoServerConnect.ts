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
declare var SETTINGS:any;

export class FileDownloader{

    download(url:string, destination:string,callBack?:Function):void{

        var file:any = fs.createWriteStream(destination);
        http.get(url,function(response){
            response.pipe(file);
            file.on('finish', function() {
                file.close();  // close() is async, call cb after close completes.
                if (callBack) callBack();

            }).on('error', function(err) {
                fs.unlink(destination);
                if (callBack) callBack(err);
            });
        } )
    }
}



export  class VideoServerConnect{

    // folder:string;
    // server:string='http://192.168.1.12:56555';
    // server:string='http://192.168.0.82:56555';
    server:string;

    constructor(private folder?:string) {
            this.server = SETTINGS.video_server;
    }


    downloadFiles(asset:VOAsset,folder:string): Q.Promise<any>{
        var def: Q.Deferred<any> = Q.defer();


       folder+='/userVideos';
        var thumbs:string[] = asset.thumb.split(',');

        var url:string = this.server+'/'+asset.folder+'/'+asset.filename;
        var destination = path.resolve(WWW+'/'+folder+'/'+asset.filename);

        var down:FileDownloader = new FileDownloader();
        down.download(url,destination,(err)=>{
            if(err)def.reject(err);
            else{
                asset.path = folder+'/'+asset.filename;
                var ar = thumbs.map(function (item) {
                    return folder +'/'+item;
                })
                asset.thumb= ar.join(',');
                def.resolve(asset)
            }

        });


        thumbs.forEach((filename:string)=>{
            url =  this.server+'/'+asset.folder+'/'+filename;
            destination = path.resolve(WWW+'/'+folder+'/'+filename);
            down.download(url,destination);
        })



        return def.promise;
    }


    sendNotification(asset:VOAsset): Q.Promise<any>{

        var def: Q.Deferred<any> = Q.defer();
        var url:string = this.server+'/'+'wake-up';
        console.log('sendNotification '+url);
        http.get(url,(res:IncomingMessage)=>{
            console.log('sendNotification res', res);
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
      return db.selectColumnsById(id,'status','process');
    }

  updateStatus(process_id:number,status:string,folder:string):Q.Promise<any>{
      var def: Q.Deferred<any> = Q.defer();

      var db:DBDriver = new DBDriver(null);
      db.updateRow({id:process_id,status:status},'process').done(
          res=>{
              var db2:DBDriver = new DBDriver(folder);
              db2.updateRowByColumn({process_id:process_id,status:status},'process_id','assets').done(
                  res=>def.resolve(res)
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
           res=> this.updateStatus(asset.id,'ready',folder).done(
               res=>{
                   asset.status='ready';
                   def.resolve(asset)

               } ,err=>def.reject(err)
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

    getAssetFolder(asset:VOAsset): Q.Promise<string>{
        var def: Q.Deferred<any> = Q.defer();
        var db:DBDriver = new DBDriver(null);

        db.selectById(asset.id,'process').done(
            row =>{
                if(row) def.resolve(row.folder);
                else def.reject('notexists')
            }
            ,err=>def.reject(err)
        )


        return def.promise;

    }

    /*updateProcessed(asset:VOAsset): Q.Promise<any>{
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
                  /!* db.updateRow({id:asset.id,status:asset.status},'process');

                   this.saveAssetData(asset,folder).done(
                       res=>def.resolve(asset)
                       ,err=>def.reject(err)
                   )*!/

               }else def.reject('notexists')
            }
            ,err=>def.reject(err)
        )


        return def.promise;
    }*/





    getNextVideo(): Q.Promise<any>{
        var status:string = 'newvideo';
        var def: Q.Deferred<any> = Q.defer();
        var db:DBDriver = new DBDriver(null);
       // var sql:string = 'SELECT * FROM process WHERE status=?';

        db.selectByValue(status,'status','process').done(
            res=>{
                var out:VOAsset;
                for(var i=0,n= res.length;i<n;i++){
                    var asset:VOAsset = res[i];
                    //console.log(WWW+'/'+asset.path);
                    if(fs.existsSync(WWW+'/'+asset.path)){
                        asset.status = 'requested';
                        out = asset;

                        break
                    }else db.deleteById(asset.id,'process');
                }
                if(out){
                    db.updateRow({id:out.id,status:'requested'},'process');
                }

                def.resolve(out|| {});
            }
            ,err=>def.reject(err)
        )

        return def.promise;
    }
}

