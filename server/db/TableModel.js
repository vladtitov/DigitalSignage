"use strict";
var Q = require('q');
var dbDriver_1 = require("../db/dbDriver");
var TableModel = (function () {
    function TableModel(folder, table, row) {
        this.table = table;
        this.row = row;
        this.db = new dbDriver_1.DBDriver(folder);
    }
    TableModel.prototype.getStucture = function () {
        var sql = "SELECT * FROM " + this.table + " limit 1";
        return this.db.selectAll(sql, []);
    };
    TableModel.prototype.createNewTable = function () {
        var row = this.row;
        delete row['id'];
        var arr = [];
        for (var str in row) {
            if (typeof row[str] === "string")
                arr.push(str + " TEXT");
            else if (typeof row[str] === "number")
                arr.push(str + " INTEGER");
        }
        var sql = "CREATE TABLE " + this.table +
            " (id INTEGER PRIMARY KEY AUTOINCREMENT, " + arr.join(", ") + ")";
        console.log('createNewTable ', sql);
        return this.db.createTable(sql);
    };
    TableModel.prototype.loadAll = function () {
        var _this = this;
        var sql = "SELECT * FROM " + this.table;
        this.db.selectAll(sql, []).done(function (res) {
            _this.data = res;
            if (_this.onLoaded)
                _this.onLoaded(res);
        });
        return this;
    };
    TableModel.prototype.selectAllContent = function (table) {
        var sql = "SELECT * FROM " + (table || this.table);
        var data = [];
        return this.db.selectAll(sql, data);
    };
    TableModel.prototype.selectContentById = function (id) {
        var sql = "SELECT * FROM " + this.table + " WHERE id = ?";
        var data = [id];
        return this.db.selectOne(sql, data);
    };
    TableModel.prototype.insertContent = function (row) {
        delete row.id;
        var ar1 = [];
        var ar2 = [];
        var ar3 = [];
        for (var str in row) {
            ar1.push(str);
            ar2.push('?');
            ar3.push(row[str]);
        }
        var sql = 'INSERT INTO ' + this.table + ' (' + ar1.join(',') + ') VALUES (' + ar2.join(',') + ')';
        var data = ar3;
        return this.db.insertOne(sql, data);
    };
    TableModel.prototype.updateContent = function (row) {
        var id = row.id;
        delete row.id;
        var ar1 = [];
        var ar2 = [];
        var ar3 = [];
        for (var str in row) {
            ar1.push(str + ' = ?');
            ar3.push(row[str]);
        }
        if (ar3.length) {
            var sql = 'UPDATE ' + this.table + ' SET ' + ar1.join(', ') + ' WHERE id = ' + id;
            var data = ar3;
            return this.db.updateOne(sql, data);
        }
        var deferred = Q.defer();
        deferred.resolve({ changes: 0 });
        return deferred.promise;
    };
    TableModel.prototype.deleteById = function (id) {
        var sql = "DELETE FROM " + this.table + " WHERE id = " + id;
        var data = [];
        return this.db.deleteQuery(sql, data);
    };
    TableModel.prototype.deleteByFieldId = function (feild, id) {
        var sql = "DELETE FROM " + this.table + " WHERE " + feild + " = " + id;
        var data = [];
        return this.db.deleteQuery(sql, data);
    };
    TableModel.prototype.deleteContent = function (row) {
        var sql = "DELETE FROM " + this.table + " WHERE id = " + row.id;
        var data = [];
        return this.db.deleteQuery(sql, data);
    };
    TableModel.prototype.runQuery = function (sql) {
        return this.db.runQuery(sql);
    };
    TableModel.prototype.selectMax = function (column_name) {
        var sql = "SELECT max(" + column_name + ") AS " + column_name + " FROM " + this.table;
        var data = [];
        console.log('sql select max', sql);
        return this.db.selectOne(sql, data);
    };
    return TableModel;
}());
exports.TableModel = TableModel;
//# sourceMappingURL=TableModel.js.map