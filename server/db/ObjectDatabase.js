"use strict";
var Q = require('q');
var dbDriver_1 = require("../db/dbDriver");
var IndexTable = (function () {
    function IndexTable() {
    }
    return IndexTable;
}());
exports.IndexTable = IndexTable;
var ColumnValue = (function () {
    function ColumnValue() {
    }
    return ColumnValue;
}());
exports.ColumnValue = ColumnValue;
var ObjectDatabase = (function () {
    function ObjectDatabase(folder, mainTable, indexTables) {
        this.mainTable = mainTable;
        this.indexTables = indexTables;
        this.db = new dbDriver_1.DBDriver(folder);
        if (indexTables)
            this.indexTable = indexTables[0];
    }
    ObjectDatabase.prototype.setIndexTable = function (table, column) {
        this.indexTable = { table: table, column: column };
    };
    ObjectDatabase.prototype.setJoinTable = function (table, column) {
        this.joinTable = { table: table, column: column };
    };
    ObjectDatabase.prototype.get3Tables = function (id) {
        var _this = this;
        var def = Q.defer();
        var sql = 'SELECT * FROM ' + this.indexTable.table +
            ' LEFT JOIN ' + this.joinTable.table +
            ' ON ' + this.joinTable.column +
            ' = ' + this.joinTable.table +
            '.id WHERE ' + this.indexTable.column + '=' + id;
        this.getMainTable(id).done(function (res1) {
            _this.db.queryAll(sql).done(function (res2) {
                def.resolve({ props: res1, list: res2 });
            }, function (err) { return def.reject(err); });
        }, function (err) { return def.reject(err); });
        return def.promise;
    };
    ObjectDatabase.prototype.selectByValues = function (values) {
        var sqlar = [];
        var vals = [];
        for (var str in values) {
            sqlar.push(str + '=?');
            vals.push(values[str]);
        }
        var sql = "SELECT * FROM " + this.mainTable + " WHERE " + sqlar.join(' AND ');
        console.log(sql);
        console.log(vals);
        return this.db.selectAll(sql, vals);
    };
    ObjectDatabase.prototype.getStucture = function () {
        var sql = "SELECT * FROM " + this.mainTable + " limit 1";
        return this.db.selectAll(sql, []);
    };
    ObjectDatabase.prototype.selectAllContent = function (id, num) {
        var def = Q.defer();
        var table2 = this.indexTables[num];
        var sql = "SELECT * FROM " + this.mainTable + ' WHERE id =  ' + id;
        var data = [];
        return def.promise;
    };
    ObjectDatabase.prototype.get2Tables = function (id) {
        var _this = this;
        var def = Q.defer();
        this.getMainTable(id).done(function (props) { return _this.getIndexTable(id).done(function (list) { return def.resolve({ props: props, list: list }); }, function (err) { return def.reject(err); }); }, function (err) { return def.reject(err); });
        return def.promise;
    };
    ObjectDatabase.prototype.getMainTable = function (id) {
        var sql = "SELECT * FROM " + this.mainTable + " WHERE id = " + id;
        return this.db.queryOne(sql);
    };
    ObjectDatabase.prototype.getIndexTable = function (id) {
        var sql = 'SELECT * FROM ' + this.indexTable.table + ' WHERE ' + this.indexTable.column + ' = ' + id;
        return this.db.queryAll(sql);
    };
    ObjectDatabase.prototype.insertContent = function (row) {
        delete row.id;
        var ar1 = [];
        var ar2 = [];
        var ar3 = [];
        for (var str in row) {
            ar1.push(str);
            ar2.push('?');
            ar3.push(row[str]);
        }
        var sql = 'INSERT INTO ' + this.mainTable + ' (' + ar1.join(',') + ') VALUES (' + ar2.join(',') + ')';
        var data = ar3;
        return this.db.insertOne(sql, data);
    };
    ObjectDatabase.prototype.updateContent = function (row) {
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
            var sql = 'UPDATE ' + this.mainTable + ' SET ' + ar1.join(', ') + ' WHERE id = ' + id;
            var data = ar3;
            return this.db.updateOne(sql, data);
        }
        var deferred = Q.defer();
        deferred.resolve({ changes: 0 });
        return deferred.promise;
    };
    ObjectDatabase.prototype.deleteById = function (id) {
        var sql = "DELETE FROM " + this.mainTable + " WHERE id = " + id;
        var data = [];
        return this.db.deleteQuery(sql, data);
    };
    ObjectDatabase.prototype.deleteByFieldId = function (feild, id) {
        var sql = "DELETE FROM " + this.mainTable + " WHERE " + feild + " = " + id;
        var data = [];
        return this.db.deleteQuery(sql, data);
    };
    ObjectDatabase.prototype.deleteContent = function (row) {
        var sql = "DELETE FROM " + this.mainTable + " WHERE id = " + row.id;
        var data = [];
        return this.db.deleteQuery(sql, data);
    };
    ObjectDatabase.prototype.selectMax = function (column_name) {
        var sql = "SELECT max(" + column_name + ") AS " + column_name + " FROM " + this.mainTable;
        var data = [];
        console.log('sql select max', sql);
        return this.db.selectOne(sql, data);
    };
    return ObjectDatabase;
}());
exports.ObjectDatabase = ObjectDatabase;
//# sourceMappingURL=ObjectDatabase.js.map