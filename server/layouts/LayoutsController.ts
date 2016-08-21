import {TableModel} from "../db/TableModel";
import Q = require('q');
import {VOLayout, VOLayoutProps, VOViewport, VOTemplate} from "../../client/app/services/models";
import {UpdateResult} from "../db/dbDriver";
/**
 * Created by Vlad on 7/23/2016.
 */
export class LayoutsController{
    private layouts:TableModel;
    private layouts_viewports;
    private devices;
    constructor(folder:string){
        this.layouts = new TableModel(folder,'layouts');
        this.layouts_viewports = new TableModel(folder,'layouts_viewports');
        this.devices = new TableModel(folder,'devices');
    }


    deleteContentById(id:number):Q.Promise<UpdateResult>{
        var deferred: Q.Deferred<any> = Q.defer();
        this.layouts.deleteById(id).done((res1:UpdateResult)=>{
            this.layouts_viewports.deleteByFieldId('layout_id',id).done((res2:UpdateResult)=>{
                res1.changes += res2.changes;
                deferred.resolve(res1);
            },err=>deferred.reject(err))
        },err=>deferred.reject(err));
        return deferred.promise
    }


    updateViewPorts(list:VOViewport[], layoutId:number):Q.Promise<any>{
        var deferred: Q.Deferred<any> = Q.defer();

        this.deleteViewPorts(layoutId).done((res)=>{
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

            this.layouts_viewports.db.arrayQuery(sql,out).done(function (res) {
                deferred.resolve(res);
            },function (err) {
                deferred.reject(err);
            })



        },function(err){
            deferred.reject(err)
        })

        return deferred.promise
    }




    getViewportsByLayoutId(id:number):Q.Promise<any[]>{
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

    }
    getLayoutById(id:number): Q.Promise<any>{
        return this.layouts.selectContentById(id);
    }

    deleteViewPorts(id:number): Q.Promise<{changes:number}> {
       /// this.layouts_viewports.table = 'layouts_viewports';
        var sql: string = "DELETE FROM layouts_viewports WHERE layout_id =? ";
        return this.layouts_viewports.db.deleteAll(sql,[id]);
    }

    updateContentById(row:VOLayoutProps, id:number): Q.Promise<UpdateResult | UpdateResult>{
        row.timestamp = Math.floor(Date.now() / 1000);

        if(id==-1)  return this.insertContent(row);
        else  return this.layouts.updateContent(row);
    }

    insertContent(row:VOLayoutProps): Q.Promise<UpdateResult> {
        if(!row.label)row.label =  'new layout ';
        delete  row.id;
        return this.layouts.insertContent(row)
    }


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
        })


        return lays



    }


    getAllAssembled(): Q.Promise<any[]>{
        var deferred: Q.Deferred<any> = Q.defer();

        this.layouts.selectAllContent().done((lays)=>{
            this.layouts_viewports.selectAllContent().done((l_v)=>{
                deferred.resolve(this.margeTables(lays,l_v));
            },function(err){deferred.reject(err); })
        },function(err){deferred.reject(err);})
        return deferred.promise
    }

    getAllTemplates(): Q.Promise<any[]>{
        var deferred: Q.Deferred<any> = Q.defer();
        this.layouts.selectAllContent('templates').done(function (rows) {
            var out:any[]=[]
            rows.forEach(function(item){
                item.viewports = JSON.parse(item.viewports)
               // row.id=item.id
                out.push( new VOTemplate(item));
                deferred.resolve(out);
            })
        },function(err){ deferred.reject(err)})
        return deferred.promise

    }

    saveAssemble(layout:any,id:number): Q.Promise<any[]>{
        var deferred: Q.Deferred<any> = Q.defer();







        return deferred.promise
    }
}