"use strict";
var dbDriver_1 = require("../db/dbDriver");
var DBContent = (function () {
    function DBContent(folder) {
        this.db = new dbDriver_1.DBDriver(folder);
    }
    DBContent.prototype.deleteTable = function () {
        var sql = "DROP TABLE test1";
        return this.db.deleteTable(sql);
    };
    DBContent.prototype.createNewTable = function () {
        var sql = "CREATE TABLE test1 (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, type TEXT, path TEXT, user TEXT, timestamp INTEGER)";
        return this.db.createTable(sql);
    };
    DBContent.prototype.addNewColumn = function () {
        var sql = "ALTER TABLE test1 ADD COLUMN";
        var data = ['new', 'TEXT'];
        sql += ' ' + data[0] + ' ' + data[1];
        console.log(sql);
        return this.db.addColumn(sql);
    };
    DBContent.prototype.selectAllContent = function () {
        var sql = "SELECT * FROM content";
        var data = [];
        return this.db.selectAll(sql, data);
    };
    DBContent.prototype.selectContentById = function (id) {
        var sql = "SELECT * FROM content WHERE id = ?";
        var data = [id];
        return this.db.selectOne(sql, data);
    };
    DBContent.prototype.insertContent = function (cont) {
        var sql = 'INSERT INTO content (name, type, path, user, timestamp) VALUES (?, ?, ?, ?, ?)';
        var data = [cont.name, cont.type, cont.path, cont.user, cont.timestamp];
        return this.db.insertOne(sql, data);
    };
    DBContent.prototype.updateContent = function (cont) {
        var sql = 'UPDATE content SET name = ?, type = ?, path = ?, user = ?, timestamp = ? WHERE id = ?';
        var data = [cont.name, cont.type, cont.path, cont.user, cont.timestamp, cont.id];
        return this.db.updateOne(sql, data);
    };
    DBContent.prototype.deleteContent = function (cont) {
        var sql = "DELETE FROM content WHERE id = ?";
        var data = [cont.id];
        return this.db.deleteQuery(sql, data);
    };
    return DBContent;
}());
exports.DBContent = DBContent;
var Content = (function () {
    function Content(name, type, path, user, timestamp, id) {
        this.name = name;
        this.type = type;
        this.path = path;
        this.user = user;
        this.timestamp = timestamp;
        this.id = id;
    }
    Content.prototype.toArray = function () {
        return [this.name, this.type, this.path, this.user, this.timestamp];
    };
    return Content;
}());
exports.Content = Content;
//# sourceMappingURL=dbContent.js.map