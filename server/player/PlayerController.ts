import {TableModel} from "../db/TableModel";
import {ObjectDatabase, IndexTable} from "../db/ObjectDatabase";
import Q = require('q');
import Promise = Q.Promise;
import {VOViewport, VOPlaylist, VOAsset} from "../../client/app/services/models";
import {DBDriver} from "../db/dbDriver";

/**
 * Created by Vlad on 8/2/2016.
 */
export class PlayerController{


    getAllDeviceswithLayoutImage(folder:string): Q.Promise<any>{
        var db = new DBDriver(folder);
        return db.queryAll('SELECT *,layouts.image,layouts.label, devices.id AS id FROM devices LEFT JOIN layouts ON layouts.id = devices.layout_id');
    }

    getFolderByToken(token:string):Promise<any>{
        var db = new DBDriver(null);
        return db.selectOne('SELECT folder FROM users WHERE token=?',[token]);
    }
    getPlaylistStatsByLayout(id:number,folder):Promise<any>{
        var db = new DBDriver(folder);
        return db.queryAll('SELECT layouts_viewports.id AS id, layouts_viewports.playlist_id,playlists.label,playlists.timestamp,' +
            'FROM layouts_viewports LEFT JOIN playlists ON layouts_viewports.playlist_id=playlists.id' +
            '  WHERE layouts_viewports.layout_id='+id)
    }

    getPlaylistsByLayout(id:number,folder):Promise<any>{
        var db = new DBDriver(folder);
        return db.queryAll('SELECT  layouts_viewports.*, playlists.timestamp AS platlist_stamp ' +
            ' FROM layouts_viewports LEFT JOIN playlists ON layouts_viewports.playlist_id=playlists.id' +
            ' WHERE layouts_viewports.layout_id='+id)
    }
    getPlaylistStats(id:number,folder:string): Q.Promise<any>{
        var db = new DBDriver(folder);
        return db.queryOne('SELECT id,label,timestamp FROM playlists WHERE id='+id);
    }
    getPlaylistProps(id:number,folder:string): Q.Promise<any>{
        var db = new DBDriver(folder);
        return db.queryOne('SELECT * FROM playlists WHERE id='+id);
    }

    getLayout(id:number,folder:string): Q.Promise<any>{
        var def: Q.Deferred<any> = Q.defer();
        this.getLayoutProps(id,folder).done(
            layout=>this.getPlaylistsByLayout(id,folder).done(
               viewports =>{
                   layout.viewports=viewports
                   def.resolve(layout)
               }
                ,err=>def.reject(err)
            )
           , err=>def.reject(err)
        )

        return def.promise
    }

    getLayoutProps(id:number,folder:string): Q.Promise<any>{
        var db = new DBDriver(folder);
        return db.queryOne('SELECT id,width,height,background,timestamp FROM layouts WHERE id='+id);
    }



    getPlaylistAssets(id:number,folder:string): Q.Promise<any>{
        var db = new DBDriver(folder);
        return db.queryAll('SELECT playlists_assets.* , playlists_assets.id AS id, ' +
            'assets.height, assets.width, assets.duration, assets.path, assets.type, assets.mime, assets.orig_dimension, assets.active, assets.time_from, assets.time_to' +
            ', playlists.timestamp AS playlists_stamp,  playlists.time_from AS playlists_from,  playlists.time_to AS playlists_to ' +
            ' FROM playlists_assets' +
            ' LEFT JOIN assets ON assets.id = playlists_assets.asset_id ' +
            ' LEFT JOIN playlists ON playlists.id = playlists_assets.playlist_id ' +
            'WHERE playlist_id='+id);
    }

    getDeviceAndLayoutStamps(id:number,folder:string):Promise<any>{
        var db = new DBDriver(folder);
        return db.queryOne('SELECT devices.id AS id, devices.label, devices.layout_id, layouts.label as llabel,' +
            ' devices.timestamp AS dstamp,layouts.timestamp AS lstamp ' +
            'FROM devices LEFT JOIN layouts ON devices.layout_id=layouts.id ' +
            ' WHERE devices.id='+id);
    }


}