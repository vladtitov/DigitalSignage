import Q = require('q');

//import {AssetTable} from "../assets/AssetTable";
import Promise = Q.Promise;
import {PlaylistsTable} from "./PlaylistsTable";
import {PlaylistItemsTable} from "./PlaylistItemsTable";

import {Playlists_Assets} from "./Playlists_Assets";
import {TableModel} from "../db/TableModel";
import {VOAsset, VOPlayLists_Assets, VOPlaylist} from "../../client/app/services/models";
import {DBDriver} from "../db/dbDriver";



export class PlayListsController{
    constructor(private folder?:string){
    }

    getPlaylistTimestamp(id:number):Q.Promise<any>{
        var db = new DBDriver(this.folder);
        var sql:string ='SELECT timestamp FROM playlists WHERE id='+id;
        return db.queryOne(sql);
    }
    getPlaylistWithAssets(id:number,folder:string): Q.Promise<any>{
        var def: Q.Deferred<any> = Q.defer();

        this.getPlaylistProps(id,folder).done(
            playlis=>{
                this.getPlaylistAssets(id,folder).done(
                    assets=>{
                        def.resolve(new VOPlaylist({props:playlis,list:assets}))
                    },err => def.reject(err)
                )
            },err => def.reject(err)
        )

        return def.promise;
    }



    getPlaylistProps(id:number,folder:string): Q.Promise<any>{
        var db = new DBDriver(folder);
        return db.queryOne('SELECT * FROM playlists WHERE id='+id);
    }

    getPlaylistAssets(id:number,folder:string): Q.Promise<any>{
        var db = new DBDriver(folder);
        return db.queryAll('SELECT * FROM playlists_assets LEFT JOIN assets ON assets.id = playlists_assets.asset_id WHERE playlist_id='+id);
    }

    getAllPlaylists_Assets(folder:string): Q.Promise<any>{
        var db = new DBDriver(folder);
        return db.queryAll('SELECT *, playlists_assets.id AS id ' +
                            'FROM playlists_assets ' +
                            'LEFT JOIN assets ON assets.id = playlists_assets.asset_id')
    }


    getAllPlaylistWithAssets(folder:string): Q.Promise<any>{
        var def: Q.Deferred<any> = Q.defer();
        this.getAllPlaylistsProps(folder).done((playlists)=>{
                this.getAllPlaylists_Assets(folder).done((assets)=>{
                    var out:VOPlaylist[]=[]
                        playlists.forEach(function (playlist) {
                            var list = assets.filter(function(asset){ return asset.playlist_id=== playlist.id})
                            out.push(new VOPlaylist({props:playlist,list:list}))
                        })
                    def.resolve(out);

                },err => def.reject(err)
                )
        }, err => def.reject(err)
        )


        return def.promise;
    }

    getAllPlaylistsProps(folder:string): Q.Promise<any>{
        var db = new DBDriver(folder);
        return db.queryAll('SELECT * FROM playlists')
    }


    getUsedLayoutsLabels(id:number, folder:string): Q.Promise<any>{
        var db = new DBDriver(folder);
        return db.queryAll('SELECT DISTINCT layout_id AS id, layouts.label ' +
                            'FROM layouts_viewports ' +
                            'LEFT JOIN layouts ON layouts.id = layouts_viewports.layout_id ' +
                            'WHERE playlist_id = ' + id)
    }


    deletePlaylist(id:number, folder:string): Q.Promise<any>{
        var deferred: Q.Deferred<any> = Q.defer();

        var timestamp = Math.floor(Date.now() / 1000);

        var db = new DBDriver(folder);

        db.runQuery('UPDATE layouts SET timestamp = ' + timestamp +
                    ' WHERE id IN ' +
                    '(SELECT DISTINCT layout_id AS id FROM layouts_viewports ' +
                    'LEFT JOIN layouts ON layouts.id = layouts_viewports.layout_id ' +
                    'WHERE playlist_id = ' + id + ')').done(
            res => db.runQuery('UPDATE layouts_viewports SET playlist_id = 0, image = null WHERE playlist_id = '+ id).done(
                res =>  db.runQuery('DELETE FROM playlists_assets WHERE playlist_id = ' + id).done(
                    res => db.runQuery('DELETE FROM playlists WHERE id = ' + id).done(
                        res => deferred.resolve(res)
                        , err => deferred.reject(err)
                    )
                    , err => deferred.reject(err)
                )
                , err => deferred.reject(err)
            )
            , err => deferred.reject(err)
        );
        return deferred.promise;
    }

}
