///<reference path="../../typings/q/Q.d.ts"/>

import Q = require('q');
import {DBDriver, UpdateResult} from "../db/dbDriver";
// import {IDBDriver} from "../db/dbDriver";
import {TableModel} from "../db/TableModel";
import {Playlists_Assets} from "./Playlists_Assets";
import {VOPlayLists_Assets, VOAsset} from "../../client/app/services/models";
import Promise = Q.Promise;
;



export class PlaylistItemsTable extends TableModel {

    dbtable:TableModel;
    constructor(folder:string){
        super(folder,"playlists_assets", new Playlists_Assets());

    }

    deletePlatlist(id:number): Q.Promise<{changes:number}> {
        var sql: string = "DELETE FROM " + this.table + " WHERE playlist_id =? ";
       // console.log(sql);
        return this.db.deleteQuery(sql,[id]);
    }



    updatePalylist(list:VOPlayLists_Assets[], playlistId:number): Q.Promise<{changes:number} |{insertId:number}>{
        var deferred: Q.Deferred<any> = Q.defer();
        this.deletePlatlist(playlistId).done((res)=>{

            var sql:string =  "INSERT INTO playlists_assets (playlist_id, asset_id, lasting, position) VALUES (?,?,?,?)";
            var out:any[]=[];
            var i=0;
            ///sanitize values before insert
            list.forEach(function(item:VOPlayLists_Assets){
                i++;
                if(!item.position)item.position = i;
                if(item.id) item.asset_id = item.id;
                if(!item.lasting && item.id) item.lasting = item.duration;

                out.push([playlistId,item.asset_id,item.lasting,item.position])
            })

          //  console.log(sql);
            this.db.arrayQuery(sql,out).done(function (res) {
                deferred.resolve(res)
            })


        })
        return deferred.promise

    }
    selectAllPlayLists(): Q.Promise<ISPlayListItem[]> {
        var sql: string = "SELECT * FROM assets, " + this.table + " WHERE playlists_assets.asset_id = assets.id";
        var data: any[] = [];

        return this.db.selectAll(sql, data);
    }

    // selectAllPlayListsByListId(): Q.Promise<ISPlayListItem[]> {
    //     var sql: string = "SELECT * FROM assets, " + this.table + " WHERE playlists.assetid = assets.id GROUP BY playlist_id";
    //     var data: any[] = [];
    //
    //     return this.db.selectAll(sql, data);
    // }
    getAll(){

        var sql:string = 'SELECT *, playlists_assets.id as psid, playlists_assets.playlist_id as plid FROM  playlists_assets LEFT JOIN assets ON playlists_assets.asset_id = assets.id LEFT JOIN playlists ON playlists_assets.listid=playlists.id ';

        return this.db.selectAll(sql, []);
    }
    selectPlayListItemById(id:number): Q.Promise<ISPlayListItem[]> {
        var sql: string = "SELECT * FROM assets, " + this.table + " WHERE playlists_assets.id = ? AND playlists_assets.asset_id = assets.id";
        var data: any[] = [id];

        return this.db.selectAll(sql, data);
    }

    selectPlayListItemsByListId(id:number): Q.Promise<VOPlayLists_Assets[]> {
        var deferred: Q.Deferred<any> = Q.defer();

        var sql: string = "SELECT * FROM  playlists_assets LEFT JOIN assets ON playlists_assets.asset_id = assets.id WHERE playlists_assets.playlist_id = ?";
        var data: any[] = [id];


       this.db.selectAll(sql, data).done(function(res){
           var out:VOPlayLists_Assets[] = [];

           res.forEach(function(item){
               var pli:VOPlayLists_Assets = new VOPlayLists_Assets(item);
               out.push(pli)
           })


           // res.forEach(function(item){
           //     var pli:VOPlayLists_Assets = new VOPlayLists_Assets({
           //                  duration:item.duration,
           //                  position:item.position
           //     })
           //     pli.asset = new VOAsset(item);
           //   out.push(pli)
           // })


           deferred.resolve(out)
       },function(err){

       })



        return deferred.promise

    }



    deletePlaylists_Assets(id:number) {
        var deferred: Q.Deferred<any> = Q.defer();

        var p = this.selectContentById(id).then((item1:Playlists_Assets)=> {
            this.deleteContent({id:id});
            var sql = "SELECT *  FROM " + this.table + " WHERE playlist_id = ? AND after_id = ?";

            this.db.selectOne(sql,[item1.listId, item1.id]).then((item2:Playlists_Assets)=> {
                var sql = "UPDATE " + this.table + " SET after_id = ? WHERE id = ?";
                this.db.updateOne(sql,[item1.afterId, item2.id]).then(function (result:{changes:number}) {
                    deferred.resolve(result);
                }, function (err) {
                    console.log('error', err);
                    deferred.reject(err);
                });
            }, function (err) {
                console.log('error', err);
                deferred.reject(err);
            });
        }, function (err) {
            deferred.reject(err);
            console.log('error', err);
        });

        return deferred.promise;
    }

    updatePlaylist_Item(item1:Playlists_Assets){
        var deferred: Q.Deferred<any> = Q.defer();

        if(item1.afterId === 0){
            deferred.resolve({});
            return;
        }

        var sql = "SELECT *  FROM " + this.table + " WHERE playlist_id = ? AND after_id = ?";

        this.db.selectOne(sql,[item1.listId, item1.id]).then((item2:Playlists_Assets)=> {

            if(!item2.id) {
                deferred.resolve({});
                return;
            }

            var sql = "UPDATE " + this.table + " SET after_id = ? WHERE id = ?";
            this.db.updateOne(sql,[item1.id, item2.id]).then(function (result:{changes:number}) {
                deferred.resolve(result);
            }, function (err) {
                console.log('error', err);
                deferred.reject(err);
            });
        }, function (err) {
            console.log('error', err);
            deferred.reject(err);
        });

        return deferred.promise;
    };

    movePlaylistItem(){};

}

export interface ISPlayListItem {
    id: number,
    originalName: string,
    path: string,
    thumb: string,
    size: number,
    width: number,
    height: number,
    mime: string,
    orig_dimension: string,
    active: number,
    duration: number,
    type: string,
    time_from: number,
    time_to: number,
    created_user: number,
    created_time: number,
    listId: number,
    assetId: number,
    afterId:number
}