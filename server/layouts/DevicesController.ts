import {TableModel} from "../db/TableModel";
import Q = require('q');
import {VODevice} from "../../client/app/services/models";
import {UpdateResult, DBDriver} from "../db/dbDriver";
/**
 * Created by Vlad on 7/23/2016.
 */
export class DevicesController{
    private devices:TableModel;
    private db:DBDriver
    constructor(private folder:string){
        this.devices = new TableModel(folder,'devices');
        this.db = new DBDriver(folder);
    }

    getDeviceById(id:number): Q.Promise<any>{
        return this.devices.selectContentById(id);
    }


    mapViewports(dev:VODevice,res:any):VODevice{
        dev.layout.viewports = res
        return dev
    }

    mapDevice(id:number,res1:any):VODevice{

        var mydevice:VODevice = new VODevice( {
            id:id,
            timestamp:res1.d_stamp,
            layout_id:res1.layout_id,
            layout:{props:{
                id:res1.layout_id,
                width:res1.width,
                height:res1.height,
                timestamp:res1.timestamp
                }

            }
        })
        return mydevice
    }
    getDeviceWithLayout(id:number): Q.Promise<any[]>{
        var def: Q.Deferred<any> = Q.defer();
        var sql1: string = 'SELECT * , devices.timestamp AS d_stamp' +
            ' FROM devices LEFT JOIN layouts ON layouts.id=devices.layout_id ' +
            ' WHERE devices.id='+id;
        var sql2:string= 'SELECT * FROM layouts_viewports WHERE layouts_viewports.layout_id=';

        this.db.queryOne(sql1).done(
            res=>{
                if(res && res.layout_id){
                    var dev = this.mapDevice(id,res);
                    this.db.queryAll(sql2+dev.layout_id).done(
                        res2=>{
                            dev = this.mapViewports(dev,res2)
                            def.resolve(dev)
                        }, err=>def.reject(err)
                    );
                }else def.reject(res)

            }, err=>def.reject(err)
        );

       return def.promise;


    }

    updateContentById(row:VODevice, id:number): Q.Promise<UpdateResult | UpdateResult>{
        row.timestamp = Math.floor(Date.now() / 1000);
        if(id === -1)  return this.insertContent(row);
        else  return this.devices.updateContent(row);
    }

    insertContent(row:VODevice): Q.Promise<UpdateResult> {
        if(!row.label)row.label =  'new Device ';
        delete  row.id;
        return this.devices.insertContent(row)
    }


    getAllDevices(): Q.Promise<any[]>{
        var sql: string = 'SELECT * FROM devices';
        ///console.log(sql);
        return this.db.queryAll(sql);
    }

    getDevicesByLayoutId(layout_id:number): Q.Promise<any>{
        var deferred: Q.Deferred<any> = Q.defer();

        var sql = 'SELECT * FROM devices WHERE layout_id = '+ Number(layout_id);

        this.devices.db.queryAll(sql).done(
            res=>deferred.resolve(res)
            , err=>deferred.reject(err)
        );
        return deferred.promise
    }

    updateByLayoutId(layout_id:number): Q.Promise<UpdateResult>{
        var deferred: Q.Deferred<any> = Q.defer();
        var timestamp = Math.floor(Date.now() / 1000);

        var sql = 'UPDATE devices SET timestamp = ' + timestamp + ', layout_id = 0 WHERE layout_id = '+ Number(layout_id);

        this.devices.db.runQuery(sql).done(
            res=>deferred.resolve(res)
            , err=>deferred.reject(err)
        );
        return deferred.promise
    }

    deleteDevice(id:number): Q.Promise<UpdateResult> {
        return this.devices.deleteById(id);
    }

}