"use strict";
var Q = require('q');
var dbDriver_1 = require("../db/dbDriver");
var DBHelper = (function () {
    function DBHelper(folder, table, table_index, index) {
        this.table = table;
        this.index = index;
        this.db = new dbDriver_1.DBDriver(folder);
    }
    DBHelper.prototype.selectAllContent = function (table) {
        var sql = "SELECT * FROM " + (table || this.table);
        var data = [];
        return this.db.selectAll(sql, data);
    };
    DBHelper.prototype.selectContentById = function (id) {
        var sql = "SELECT * FROM " + this.table + " WHERE id = ?";
        var data = [id];
        return this.db.selectOne(sql, data);
    };
    DBHelper.prototype.insertContent = function (row) {
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
        console.log('sql ', sql);
        var data = ar3;
        return this.db.insertOne(sql, data);
    };
    DBHelper.prototype.updateContent = function (row) {
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
    DBHelper.prototype.deleteContent = function (row) {
        var sql = "DELETE FROM " + this.table + " WHERE id = " + row.id;
        var data = [];
        return this.db.deleteQuery(sql, data);
    };
    DBHelper.prototype.selectMax = function (column_name) {
        var sql = "SELECT max(" + column_name + ") AS " + column_name + " FROM " + this.table;
        var data = [];
        console.log('sql select max', sql);
        return this.db.selectOne(sql, data);
    };
    return DBHelper;
}());
exports.DBHelper = DBHelper;
//# sourceMappingURL=DBHelper.js.map