///<reference path="../../typings/q/Q.d.ts"/>

import Q = require('q');
import {DBDriver, UpdateResult} from "../db/dbDriver";


export class IndexTable{
    table:string;
    column:string;
}

export class ColumnValue{
    column:string;
    value:string|number;
}

export class ObjectDatabase {
    public db:DBDriver;

    indexTable:IndexTable;
    joinTable:IndexTable;
    constructor(folder:string,private mainTable:string,private indexTables?:IndexTable[]){
        this.db = new DBDriver(folder);
        if(indexTables) this.indexTable = indexTables[0];
    }

    setIndexTable(table:string,column:string):void{
        this.indexTable = {table:table,column:column};
    }


    setJoinTable(table:string,column:string):void{
        this.joinTable =  {table:table,column:column};
    }

    get3Tables(id:number): Q.Promise<any>{
        var def: Q.Deferred<any> = Q.defer();

        var sql:string = 'SELECT * FROM '+this.indexTable.table+
            ' LEFT JOIN '+this.joinTable.table+
            ' ON '+this.joinTable.column+
            ' = '+this.joinTable.table+
            '.id WHERE '+this.indexTable.column+'='+id;
        this.getMainTable(id).done(
            (res1)=>{
               this.db.queryAll(sql).done((res2)=>{
                    def.resolve({props:res1,list:res2});
                }
                ,err=>def.reject(err) )
            }
            ,err=>def.reject(err))

        return def.promise;
    }


    selectByValues(values:any):Q.Promise<any>{
        var sqlar:string[]=[];
        var vals:any[] =[];
        for(var str in values){
            sqlar.push(str +'=?');
            vals.push(values[str]);
        }

    var sql: string = "SELECT * FROM " + this.mainTable + " WHERE "+sqlar.join(' AND ');
        console.log(sql);
        console.log(vals);
    return this.db.selectAll(sql, vals);
    }

    getStucture(){
        var sql: string = "SELECT * FROM " + this.mainTable + " limit 1";
        // var data: any[] = [];
        return this.db.selectAll(sql, []);
    }
    selectAllContent(id:number,num:number):Q.Promise<any[]> {
        var def: Q.Deferred<any> = Q.defer();
        var table2:IndexTable = this.indexTables[num];
        var sql: string = "SELECT * FROM " + this.mainTable + ' WHERE id =  '+id;
        var data: any[] = [];

        return def.promise;
    }


    get2Tables(id:number): Q.Promise<any>{
        var def: Q.Deferred<any> = Q.defer();
        this.getMainTable(id).done(
            props=>this.getIndexTable(id).done(
                list=>def.resolve({props:props,list:list})
                ,err=>def.reject(err)
            ),err=>def.reject(err)
        )

        return def.promise;
    }

    getMainTable(id:number): Q.Promise<any> {
        var sql: string = "SELECT * FROM " + this.mainTable + " WHERE id = "+id;
        return this.db.queryOne(sql);
    }
    getIndexTable(id:number ): Q.Promise<any[]>{
        var sql: string = 'SELECT * FROM ' + this.indexTable.table + ' WHERE '+this.indexTable.column+' = '+id;
        return this.db.queryAll(sql);
    }



    insertContent(row:any): Q.Promise<UpdateResult> {
        // console.log('row', row);
        delete row.id;
        var ar1:string[] = [];
        var ar2:string[] = [];
        var ar3:any[]    = [];
        for(var str in row){
            ar1.push(str);
            ar2.push('?');
            ar3.push(row[str]);
        }
        var sql: string = 'INSERT INTO '+this.mainTable+' ('+ar1.join(',')+') VALUES ('+ar2.join(',')+')';
       /// console.log('sql ', sql);
        var data: any[] = ar3;

        return this.db.insertOne(sql, data);
    }

    updateContent(row:any): Q.Promise<UpdateResult>{

        var id = row.id;
        delete row.id;

        var ar1:string[] = [];
        var ar2:string[] = [];
        var ar3:any[] = [];
        for(var str in row){
            ar1.push(str + ' = ?');
            ar3.push(row[str]);
        }

        if(ar3.length){
            var sql: string = 'UPDATE '+ this.mainTable + ' SET '+ar1.join(', ')+' WHERE id = ' + id;
            var data: any[] = ar3;
           // console.log(sql);
            return this.db.updateOne(sql, data);

        }

        var deferred: Q.Deferred<any> = Q.defer();
        deferred.resolve({changes:0});

        return  deferred.promise

    }

    deleteById(id:number): Q.Promise<UpdateResult> {

        var sql: string = "DELETE FROM " + this.mainTable + " WHERE id = " + id;
        var data: any[] = [];

        return this.db.deleteQuery(sql, data);
    }
    deleteByFieldId(feild:string,id:number): Q.Promise<UpdateResult> {

        var sql: string = "DELETE FROM " + this.mainTable + " WHERE "+feild+" = " + id;
        var data: any[] = [];

        return this.db.deleteQuery(sql, data);
    }

    deleteContent(row:any): Q.Promise<UpdateResult> {

        var sql: string = "DELETE FROM " + this.mainTable + " WHERE id = " + row.id;
        var data: any[] = [];

        return this.db.deleteQuery(sql, data);
    }

    selectMax(column_name: string): Q.Promise<{column_name:number}> {
        var sql: string = "SELECT max(" + column_name + ") AS " + column_name + " FROM " + this.mainTable;
        var data: any[] = [];
        console.log('sql select max', sql);
        return this.db.selectOne(sql, data);
    }

}