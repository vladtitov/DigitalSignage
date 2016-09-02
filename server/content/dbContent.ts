///<reference path="../../typings/q/Q.d.ts"/>

import Q = require('q');
import {DBDriver} from "../db/dbDriver";
// import {DBDriver} from "../db/dbDriver";
// import {IDBDriver} from "../db/dbDriver";


export class DBContent {
    private db: DBDriver;
  
    constructor(folder:string){
        this.db = new DBDriver(folder);
    }

    deleteTable(): Q.Promise<any> {
        var sql = "DROP TABLE test1";

        return this.db.deleteTable(sql);
    }

    createNewTable(): Q.Promise<any> {
        var sql = "CREATE TABLE test1 (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, type TEXT, path TEXT, user TEXT, timestamp INTEGER)";

        return this.db.createTable(sql);
    }

    addNewColumn(): Q.Promise<any> {
        var sql: string = "ALTER TABLE test1 ADD COLUMN";//column_name = ? datatype = ?
        var data: any[] = ['new', 'TEXT'];
        sql += ' ' + data[0] + ' ' + data[1];
        console.log(sql);

        return this.db.addColumn(sql);
    }

    selectAllContent() {
        var sql: string = "SELECT * FROM content";
        var data: any[] = [];

        return this.db.selectAll(sql, data);
    }

    selectContentById(id:number) {
        var sql: string = "SELECT * FROM content WHERE id = ?";
        var data: any[] = [id];

        return this.db.selectOne(sql, data);
    }

    insertContent(cont:Content) {
        var sql: string = 'INSERT INTO content (name, type, path, user, timestamp) VALUES (?, ?, ?, ?, ?)';
        var data: any[] = [cont.name, cont.type, cont.path, cont.user, cont.timestamp];

        return this.db.insertOne(sql, data);
    }

    updateContent(cont:Content) {
        var sql: string = 'UPDATE content SET name = ?, type = ?, path = ?, user = ?, timestamp = ? WHERE id = ?';
        var data: any[] = [cont.name, cont.type, cont.path, cont.user, cont.timestamp, cont.id];

        return this.db.updateOne(sql, data);
    }

    deleteContent(cont:Content) {
        var sql: string = "DELETE FROM content WHERE id = ?";
        var data: any[] = [cont.id];
        
        return this.db.deleteQuery(sql, data);
    }
}

export class Content {

    constructor(
        public name: string,
        public type: string,
        public path: string,
        public user: string,
        public timestamp: number,
        public id?: number
    ) {
        // console.log('constructor Product');
    }

    toArray(){
        return [this.name, this.type, this.path, this.user, this.timestamp];
    }
}