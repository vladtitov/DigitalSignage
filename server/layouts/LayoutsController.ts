/**
 * Created by Vlad on 7/23/2016.
 */
//import {TableModel} from "../db/TableModel";
import Q = require('q');
import {VOLayout, VOLayoutProps, VOViewport, VOTemplate} from "../../client/app/services/models";
import {UpdateResult, DBDriver} from "../db/dbDriver";

export class LayoutsController{
    //private layouts:TableModel;
   // private layouts_viewports;
   // private devices;
    private db:DBDriver;
    constructor(private folder:string){
        this.db = new DBDriver(this.folder);
       // this.layouts = new TableModel(folder,'layouts');
       // this.layouts_viewports = new TableModel(folder,'layouts_viewports');
       // this.devices = new TableModel(folder,'devices');
    }


    deleteContentById(id:number):Q.Promise<UpdateResult>{
        var deferred: Q.Deferred<any> = Q.defer();
        var db= this.db;

        db.deleteById(id,'layouts').done(
            res1 =>db.deleteByIdinColumn(id,'layout_id','layouts_viewports').done(
                res2=>deferred.resolve(res2)
                ,err=>deferred.reject(err)
            ),err=>deferred.reject(err)
        )
       /* this.layouts.deleteById(id).done((res1:UpdateResult)=>{
            this.layouts_viewports.deleteByFieldId('layout_id',id).done((res2:UpdateResult)=>{
                res1.changes += res2.changes;
                deferred.resolve(res1);
            },err=>deferred.reject(err))
        },err=>deferred.reject(err));*/
        return deferred.promise
    }


    updateViewPorts(list:VOViewport[], layoutId:number):Q.Promise<any>{
        var def: Q.Deferred<any> = Q.defer();
        var db:DBDriver = this.db;

        db.deleteByIdinColumn(layoutId,'layout_id','layouts_viewports').done((res)=>{

            var sql:string =  "INSERT INTO layouts_viewports (layout_id, viewport_id, playlist_id, x, y, width, height,  player_type, label, image) VALUES (?,?,?,?,?,?,?,?,?,?)";
            var out:any[]=[];
            var i=0;
            ///sanitize values before insert
            list.forEach(function(item:VOViewport){
                i++;
                if(!item.id)item.id = i;
                if(!item.playlist_id) item.playlist_id = 0;
                if(!item.playertype)item.playertype ='player-lite';
                if(!item.label)item.label =item.x+','+item.y+'-'+item.width+'x'+item.height;

               // out.push([layoutId,item.id,item.playlistid,item.playertype,item.x,item.y,item.width,item.height,item.image,item.label])
                out.push([layoutId,item.id,item.playlist_id,item.x,item.y,item.width,item.height,item.playertype,item.label,item.image])
            })

            db.arrayQuery(sql,out).done(function (res) {
                def.resolve(res);
            },function (err) {
                def.reject(err);
            })



        },err=> def.reject(err)
        );

        return def.promise
    }


   /* getViewportsByLayoutId(id:number):Q.Promise<any[]>{
        var deferred: Q.Deferred<any> = Q.defer();
        var out:VOViewport[]=[];

        var sql:string ='SELECT * FROM layouts_viewports WHERE layout_id =?';

        this.layouts_viewports.db.selectAll(sql,[id]) .done(function(res){
            res.forEach(function(item){
                out.push(new VOViewport(item))
            })
            deferred.resolve(out)

        },function (err) {
            deferred.reject(err);
        })



        return deferred.promise;

    }*/

    getLayoutFull(id:number): Q.Promise<any>{
        var def: Q.Deferred<any> = Q.defer();
        var db = this.db;
        db.selectById(id,'layouts' ).done(
            res1=>db.selectByValue(id,'layout_id','layouts_viewports').done(
                res2=> def.resolve({props:res1,viewports:res2})
                ,err=>def.reject(err)
            )
            ,err=>def.reject(err)
        )

        return  def.promise;

    }

   /* deleteViewPorts(id:number): Q.Promise<{changes:number}> {

       return this.db.deleteByIdinColumn(id,'layout_id','layouts_viewports');
    }*/

    updateContentById(row:VOLayoutProps, id:number): Q.Promise<UpdateResult | UpdateResult>{
        row.timestamp = Math.floor(Date.now() / 1000);

        if(id==-1)  return this.db.insertRow(row,'layouts');
        else  return this.db.updateRow(row,'layouts');
    }

    /*insertContent(row:VOLayoutProps): Q.Promise<UpdateResult> {
        if(!row.label)row.label =  'new layout ';
        delete  row.id;
        return this.layouts.insertContent(row)
    }
*/

    margeTables(layouts:VOLayoutProps[], lay_vp:any[]):VOLayout[]{
        var lays:VOLayout[]=[];
        var getViewports = function(id:number,lay_vp:any[]){
            var out:VOViewport[]=[];
            lay_vp.forEach(function(item){
                if(item.layout_id == id ) out.push(new VOViewport(item));
            })
            return out;
        }

        layouts.forEach(function(item){
            var layout:VOLayout = new VOLayout({
                props:item,
                viewports:getViewports(item.id,lay_vp)
            })
            lays.push(layout);
        });
        return lays
    }


    getAllAssembled(): Q.Promise<any[]>{
        var def: Q.Deferred<any> = Q.defer();
        var db:DBDriver = this.db;
        db.selectAllTable('layouts').done(
            lays=>db.selectAllTable('layouts_viewports').done(
                l_v=>def.resolve(this.margeTables(lays,l_v))
                    ,err=>def.reject(err)
            )
            ,err=>def.reject(err)
        )


/*
        this.layouts.selectAllContent().done((lays)=>{
            this.layouts_viewports.selectAllContent().done((l_v)=>{
                deferred.resolve(this.margeTables(lays,l_v));
            },function(err){deferred.reject(err); })
        },function(err){deferred.reject(err);})*/
        return def.promise
    }

    getAllTemplates(): Q.Promise<any[]>{
        var deferred: Q.Deferred<any> = Q.defer();
        var db:DBDriver = this.db;
        db.selectAllTable('templates').done(function (rows) {
            var out:any[]=[]
            rows.forEach(function(item){
                item.viewports = JSON.parse(item.viewports);
                out.push( new VOTemplate(item));
                deferred.resolve(out);
            })
        },function(err){ deferred.reject(err)})
        return deferred.promise

    }


/*
    saveAssemble(layout:any,id:number): Q.Promise<any[]>{
        var deferred: Q.Deferred<any> = Q.defer();







        return deferred.promise
    }*/
}