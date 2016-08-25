///<reference path="../../typings/sqlite3/sqlite3.d.ts"/>
///<reference path="../../typings/q/Q.d.ts"/>


import {Database} from "sqlite3";
import Q = require('q');
import db = require('sqlite3');

var sqlite: any = require('sqlite3').verbose();
var path = require('path');

export class UpdateResult{
    insertId:number;
    changes:number;
    constructor (obj:any) {
        for (var str in obj)this[str] = obj[str];
    }
}

declare var WWW:string;
declare var SERVER:string;


export class DBDriver {
   // private db:Database
    static dbs:any ={};
    static getDb(folder:string){
        if(!DBDriver.dbs[folder]){
            var filename =  path.resolve(folder+'/ads.db');
            console.log(filename);
            DBDriver.dbs[folder] =  new sqlite.Database(filename);
        }
        return DBDriver.dbs[folder];
    }

    getdb():Database{
        return DBDriver.getDb(this.folder);
    }
    folder:string;
    constructor(folder?:string){
        this.folder = folder?WWW+'/'+folder:SERVER+'/db/';
    }

    close():void{
      // this.getdb()=null;
    }
    serializeDB(callBack:()=>void){
        // console.log('dbDriver runQuery');
        this.getdb().serialize(callBack);
    }

    serialize_DB(callBack:()=>void){
        // console.log('dbDriver runQuery');
        this.getdb().serialize(callBack);
    }


    arrayQuery(sql:string,data:any[]): Q.Promise<any>{
        var deferred: Q.Deferred<any> = Q.defer();
        this.getdb().serialize(()=> {
            var stmt = this.getdb().prepare(sql);
            data.forEach(function (row) {
                stmt.run(row)
            })
            var final =  stmt.finalize();
            if(final)deferred.resolve(final)
            else deferred.reject({error:'error'});
        });
        return deferred.promise;
    }


    queryOne(sql: string): Q.Promise<any> {
        var deferred: Q.Deferred<any> = Q.defer();
        this.getdb().get(sql, function(error,res) {
            if (error){
                console.error(sql,error);
                deferred.reject(error);
            }
            else deferred.resolve(res);
        });
        return deferred.promise;
    }

    queryAll(sql: string): Q.Promise<any> {
        var deferred: Q.Deferred<any> = Q.defer();
        this.getdb().all(sql, function(error,res) {
            if (error){
                console.error(sql,error);
                deferred.reject(error);
            }
            else deferred.resolve(res);
        });
        return deferred.promise;
    }

    runQuery(sql:string ):Q.Promise<any>{
        var deferred: Q.Deferred<any> = Q.defer();
        this.getdb().run(sql, function(error) {
            if (error) {
                console.error(sql,error);
                deferred.reject(error);
            }
            else   deferred.resolve(this);
        });
        return deferred.promise;
    }

    deleteTable(sql:string) {
        var deferred: Q.Deferred<any> = Q.defer();

        var p: Q.Promise<any>  = this.runQuery(sql);

        p.then(function (val) {
            console.log('table was deleted');
            console.log(val);
            deferred.resolve(val);
        }, function (err) {
            console.log('table was not deleted');
            console.log(err);
            deferred.reject(err);
        });

        return deferred.promise;
    }

    createTable(sql:string): Q.Promise<any> {
        var deferred: Q.Deferred<any> = Q.defer();

        var p: Q.Promise<any>  = this.runQuery(sql);

        p.then(function (val) {
            console.log('table was created');
            console.log(val);
            deferred.resolve(val);
        }, function (err) {
            console.log('table was not created');
            console.log(err);
            deferred.reject(err);
        });

        return deferred.promise;
    }


    addColumn(sql:string, data?:any[]): Q.Promise<{changes:number}> {
        var deferred: Q.Deferred<any> = Q.defer();

        this.getdb().run(sql, function(error) {
            if (error) {
                console.log(error);
                deferred.reject(error);
            } else {
                // console.log({ id: this.lastID });
                deferred.resolve({ changes: this.changes });
            }
        });

        return deferred.promise;
    }

    deleteColumn(sql:string, data?:any[]): Q.Promise<UpdateResult> {
        var deferred: Q.Deferred<any> = Q.defer();

        this.getdb().run(sql, data, function(error) {
            if (error) {
                deferred.reject({
                    errno: error.errno,
                    code: error.code
                });
            } else {
                // console.log({ id: this.lastID });
                deferred.resolve({ changes: this.changes });
            }
        });

        return deferred.promise;
    }

    selectAll(sql:string, data?:any[]): Q.Promise<any[]> {
        var deferred: Q.Deferred<any> = Q.defer();

        this.getdb().all(sql, data, (error, rows) => {
            if (error) {
                console.log(error);
                deferred.reject(error);
            } else {
                deferred.resolve(rows);
            }
        });
        return deferred.promise;
    }

    selectOne(sql:string, data?:any[]):Q.Promise<any>{
        var deferred: Q.Deferred<any> = Q.defer();

        this.getdb().get(sql, data, function(error, row) {
            if (error) {
                console.log('selectOne ', error);
                deferred.reject(error);
            } else {
                // console.log(rows);
                deferred.resolve(row);
            }
        });
        return deferred.promise;
    }

    updateRow(row:any,table:string): Q.Promise<UpdateResult>{
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
            var sql: string = 'UPDATE '+ table + ' SET '+ar1.join(', ')+' WHERE id = ' + id;
            var data: any[] = ar3;
            return this.updateOne(sql, data);
        }
        var d:Q.Deferred<any> = Q.defer();
        d.resolve({changes:0});
        return  d.promise

    }

    deleteById(id:number,table:string): Q.Promise<UpdateResult> {
        var def: Q.Deferred<any> = Q.defer();
        var sql:string =  'DELETE FROM '+table+' WHERE id='+Number(id);
        this.getdb().run(sql, function(error) {
            if (error) {
                def.reject(error);
            } else {
                def.resolve({ changes: this.changes });
            }
        });

        return def.promise;

    }

    insertRow(row:any,table:string): Q.Promise<UpdateResult> {
        delete row.id;
        var ar1:string[] = [];
        var ar2:string[] = [];
        var ar3:any[]    = [];
        for(var str in row){
            ar1.push(str);
            ar2.push('?');
            ar3.push(row[str]);
        }
        var sql: string = 'INSERT INTO '+table+' ('+ar1.join(',')+') VALUES ('+ar2.join(',')+')';

        return this.insertOne(sql, ar3);
    }

    insertOne(sql:string, data?:any[]): Q.Promise<UpdateResult> {
        var deferred: Q.Deferred<any> = Q.defer();

        this.getdb().run(sql, data, function(err) {
            if (err) {
                console.error(sql,err)
                deferred.reject( err);
            } else {
                // console.log({ id: this.lastID });
                deferred.resolve({ insertId: this.lastID});
            }
        });

        return deferred.promise;
    }

    updateAll(sql:string, data?:any[]): Q.Promise<any> {
        var deferred: Q.Deferred<any> = Q.defer();
        return deferred.promise;
    }

    updateOne(sql:string, data?:any[]): Q.Promise<UpdateResult> {
        var deferred: Q.Deferred<any> = Q.defer();

        this.getdb().run(sql, data, function(error) {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve({ changes: this.changes });
            }
        });

        return deferred.promise;
    }


    deleteAll(sql:string, data?:any[]): Q.Promise<any> {
        var deferred: Q.Deferred<any> = Q.defer();
        this.getdb().run(sql, data, function(error) {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve({ changes: this.changes });
            }
        });

        return deferred.promise;
    }
}