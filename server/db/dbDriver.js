///<reference path="../../typings/sqlite3/sqlite3.d.ts"/>
///<reference path="../../typings/q/Q.d.ts"/>
"use strict";
var Q = require('q');
var sqlite = require('sqlite3').verbose();
var path = require('path');
var UpdateResult = (function () {
    function UpdateResult(obj) {
        for (var str in obj)
            this[str] = obj[str];
    }
    return UpdateResult;
}());
exports.UpdateResult = UpdateResult;
var DBDriver = (function () {
    function DBDriver(folder) {
        this.folder = folder ? WWW + '/' + folder : SERVER + '/db/';
    }
    DBDriver.getDb = function (folder) {
        if (!DBDriver.dbs[folder]) {
            var filename = path.resolve(folder + '/ads.db');
            console.log(filename);
            DBDriver.dbs[folder] = new sqlite.Database(filename);
        }
        return DBDriver.dbs[folder];
    };
    DBDriver.prototype.getdb = function () {
        return DBDriver.getDb(this.folder);
    };
    DBDriver.prototype.close = function () {
        // this.getdb()=null;
    };
    DBDriver.prototype.serializeDB = function (callBack) {
        // console.log('dbDriver runQuery');
        this.getdb().serialize(callBack);
    };
    DBDriver.prototype.serialize_DB = function (callBack) {
        // console.log('dbDriver runQuery');
        this.getdb().serialize(callBack);
    };
    DBDriver.prototype.arrayQuery = function (sql, data) {
        var _this = this;
        var deferred = Q.defer();
        this.getdb().serialize(function () {
            var stmt = _this.getdb().prepare(sql);
            data.forEach(function (row) {
                stmt.run(row);
            });
            var final = stmt.finalize();
            if (final)
                deferred.resolve(final);
            else
                deferred.reject({ error: 'error' });
        });
        return deferred.promise;
    };
    DBDriver.prototype.queryOne = function (sql) {
        var deferred = Q.defer();
        this.getdb().get(sql, function (error, res) {
            if (error) {
                console.error(sql, error);
                deferred.reject(error);
            }
            else
                deferred.resolve(res);
        });
        return deferred.promise;
    };
    DBDriver.prototype.queryAll = function (sql) {
        var deferred = Q.defer();
        this.getdb().all(sql, function (error, res) {
            if (error) {
                console.error(sql, error);
                deferred.reject(error);
            }
            else
                deferred.resolve(res);
        });
        return deferred.promise;
    };
    DBDriver.prototype.runQuery = function (sql) {
        var deferred = Q.defer();
        this.getdb().run(sql, function (error) {
            if (error) {
                console.error(sql, error);
                deferred.reject(error);
            }
            else
                deferred.resolve(this);
        });
        return deferred.promise;
    };
    DBDriver.prototype.deleteTable = function (sql) {
        var deferred = Q.defer();
        var p = this.runQuery(sql);
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
    };
    DBDriver.prototype.createTable = function (sql) {
        var deferred = Q.defer();
        var p = this.runQuery(sql);
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
    };
    DBDriver.prototype.addColumn = function (sql, data) {
        var deferred = Q.defer();
        this.getdb().run(sql, function (error) {
            if (error) {
                console.log(error);
                deferred.reject(error);
            }
            else {
                // console.log({ id: this.lastID });
                deferred.resolve({ changes: this.changes });
            }
        });
        return deferred.promise;
    };
    DBDriver.prototype.deleteColumn = function (sql, data) {
        var deferred = Q.defer();
        this.getdb().run(sql, data, function (error) {
            if (error) {
                deferred.reject({
                    errno: error.errno,
                    code: error.code
                });
            }
            else {
                // console.log({ id: this.lastID });
                deferred.resolve({ changes: this.changes });
            }
        });
        return deferred.promise;
    };
    DBDriver.prototype.selectAll = function (sql, data) {
        var deferred = Q.defer();
        this.getdb().all(sql, data, function (error, rows) {
            if (error) {
                console.log(error);
                deferred.reject(error);
            }
            else {
                deferred.resolve(rows);
            }
        });
        return deferred.promise;
    };
    DBDriver.prototype.selectOne = function (sql, data) {
        var deferred = Q.defer();
        this.getdb().get(sql, data, function (error, row) {
            if (error) {
                console.log('selectOne ', error);
                deferred.reject(error);
            }
            else {
                console.log(row);
                deferred.resolve(row);
            }
        });
        return deferred.promise;
    };
    DBDriver.prototype.updateRow = function (row, table) {
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
            var sql = 'UPDATE ' + table + ' SET ' + ar1.join(', ') + ' WHERE id = ' + id;
            var data = ar3;
            return this.updateOne(sql, data);
        }
        var d = Q.defer();
        d.resolve({ changes: 0 });
        return d.promise;
    };
    DBDriver.prototype.insertRow = function (row, table) {
        delete row.id;
        var ar1 = [];
        var ar2 = [];
        var ar3 = [];
        for (var str in row) {
            ar1.push(str);
            ar2.push('?');
            ar3.push(row[str]);
        }
        var sql = 'INSERT INTO ' + table + ' (' + ar1.join(',') + ') VALUES (' + ar2.join(',') + ')';
        return this.insertOne(sql, ar3);
    };
    DBDriver.prototype.insertOne = function (sql, data) {
        var deferred = Q.defer();
        this.getdb().run(sql, data, function (err) {
            if (err) {
                console.error(sql, err);
                deferred.reject(err);
            }
            else {
                // console.log({ id: this.lastID });
                deferred.resolve({ insertId: this.lastID });
            }
        });
        return deferred.promise;
    };
    DBDriver.prototype.updateAll = function (sql, data) {
        var deferred = Q.defer();
        return deferred.promise;
    };
    DBDriver.prototype.updateOne = function (sql, data) {
        var deferred = Q.defer();
        this.getdb().run(sql, data, function (error) {
            if (error) {
                deferred.reject(error);
            }
            else {
                deferred.resolve({ changes: this.changes });
            }
        });
        return deferred.promise;
    };
    DBDriver.prototype.deleteAll = function (sql, data) {
        var deferred = Q.defer();
        this.getdb().run(sql, data, function (error) {
            if (error) {
                deferred.reject(error);
            }
            else {
                deferred.resolve({ changes: this.changes });
            }
        });
        return deferred.promise;
    };
    // private db:Database
    DBDriver.dbs = {};
    return DBDriver;
}());
exports.DBDriver = DBDriver;
//# sourceMappingURL=dbDriver.js.map