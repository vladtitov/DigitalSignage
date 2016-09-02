///<reference path="../../typings/q/Q.d.ts"/>

import Q = require('q');
import {DBDriver, UpdateResult} from "../db/dbDriver";
// import {IDBDriver} from "../db/dbDriver";


export class DBHelper {

    public db:DBDriver;
    
    constructor(folder:string,public table: string, table_index:string, public index:string){
        this.db = new DBDriver(folder);
    }


    selectAllContent(table?:string):Q.Promise<any[]> {
        var sql: string = "SELECT * FROM " + (table || this.table);
        var data: any[] = [];

        return this.db.selectAll(sql, data);
    }


    selectContentById(id:number): Q.Promise<any> {
        var sql: string = "SELECT * FROM " + this.table + " WHERE id = ?";
        var data: any[] = [id];

        return this.db.selectOne(sql, data);
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
        var sql: string = 'INSERT INTO '+this.table+' ('+ar1.join(',')+') VALUES ('+ar2.join(',')+')';
        console.log('sql ', sql);
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
            var sql: string = 'UPDATE '+ this.table + ' SET '+ar1.join(', ')+' WHERE id = ' + id;
            var data: any[] = ar3;
            return this.db.updateOne(sql, data);

        }

        var deferred: Q.Deferred<any> = Q.defer();
        deferred.resolve({changes:0});

        return  deferred.promise

    }

   
    deleteContent(row:any): Q.Promise<UpdateResult> {

        var sql: string = "DELETE FROM " + this.table + " WHERE id = " + row.id;
        var data: any[] = [];

        return this.db.deleteQuery(sql, data);
    }

    selectMax(column_name: string): Q.Promise<{column_name:number}> {
        var sql: string = "SELECT max(" + column_name + ") AS " + column_name + " FROM " + this.table;
        var data: any[] = [];
        console.log('sql select max', sql);
        return this.db.selectOne(sql, data);
    }

}