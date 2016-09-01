///<reference path="../../typings/q/Q.d.ts"/>

import Q = require('q');
import {DBDriver, UpdateResult} from "../db/dbDriver";
// import {DBDriver} from "../db/dbDriver";
// import {IDBDriver} from "../db/dbDriver";


export class DBMessages {
    private db:DBDriver;
    
    constructor(){
        this.db = new DBDriver();
    }
    
    deleteTable(): Q.Promise<any> {
        var sql = "DROP TABLE messages";
        
        return this.db.deleteTable(sql);
    }

    createNewTable(): Q.Promise<any>  {
        var sql = "CREATE TABLE messages (id INTEGER PRIMARY KEY AUTOINCREMENT, activ BOOLEAN, message TEXT)";

        return this.db.createTable(sql);
    }

    selectAllContent() {
        var sql: string = "SELECT * FROM messages";
        var data: any[] = [];

        return this.db.selectAll(sql, data);
    }

    selectContentById(id:number) {
        var sql: string = "SELECT * FROM messages WHERE id = ?";
        var data: any[] = [id];

        return this.db.selectOne(sql, data);
    }

    insertContent(message: Message): Q.Promise<UpdateResult> {
        var sql: string = 'INSERT INTO messages (activ, message) VALUES (?, ?)';
        var data: any[] = [message.activ, message.message];

        return this.db.insertOne(sql, data);
    }

    updateContent(message: Message) {
        var sql: string = 'UPDATE messages SET activ = ?, message = ? WHERE id = ?';
        var data: any[] = [message.activ, message.message, message.id];

        return this.db.updateOne(sql, data);
    }

    deleteContent(message: Message) {
        var sql: string = "DELETE FROM messages WHERE id = ?";
        var data: any[] = [message.id];

        return this.db.deleteQuery(sql, data);
    }
}

export class Message implements ISMessage {

    // public id: number;
    // public activ: boolean;
    // public message: string;

    constructor(
        public activ: boolean,
        public message: string,
        public id?: number
    ) {
        // console.log('constructor AssetVO');
    }
}

interface ISMessage {
    activ: boolean,
    message: string,
    id?: number
}