"use strict";
var dbmodels_1 = require("../db/dbmodels");
var ObjectDatabase_1 = require("../db/ObjectDatabase");
var Q = require('q');
var dbDriver_1 = require("../db/dbDriver");
var crypto = require('crypto');
var fs = require('fs-extra');
var User = (function () {
    function User() {
        this.secret = 'abcdefg';
    }
    User.prototype.copyFolder = function (destination) {
        var def = Q.defer();
        var orig = WWW + '/clientAssets/folder_template';
        var dest = WWW + '/' + destination;
        fs.copy(orig, dest, function (err) {
            if (err)
                def.reject(err);
            def.resolve(destination);
        });
        return def.promise;
    };
    User.prototype.createAccount = function (user) {
        var _this = this;
        var def = Q.defer();
        user.folder = 'clientAssets/folder_' + user.id;
        console.log(user.folder);
        console.log(user);
        this.copyFolder(user.folder).done(function (res) { return _this.updateUsers(user).done(function (update) {
            def.resolve({
                token: user.token,
                folder: user.folder
            });
        }, function (err) { return def.reject(err); }); }, function (err) { return def.reject(err); });
        return def.promise;
    };
    User.prototype.createUser = function (email, password, ip, role) {
        var _this = this;
        var def = Q.defer();
        var users = new dbmodels_1.RUsers();
        users.username = email;
        users.email = email;
        users.password = password;
        users.ip = ip;
        users.role = role;
        this.isUsernameExists(users.username).done(function (res) {
            if (res) {
                def.reject({ exists: email });
            }
            else
                _this.insertNewUaser(users).done(function (insert) {
                    if (insert.insertId) {
                        users.id = insert.insertId;
                        def.resolve(users);
                    }
                    else
                        def.reject(insert);
                }, function (err) { return def.reject(err); });
        });
        return def.promise;
    };
    User.prototype.updateUsers = function (user) {
        var db = new dbDriver_1.DBDriver(null);
        return db.updateRow(user, 'users');
    };
    User.prototype.insertNewUaser = function (user) {
        var db = new dbDriver_1.DBDriver(null);
        user.token = this.generateToken(user.username);
        user.created = Math.round(Date.now() / 1000);
        return db.insertRow(user, 'users');
    };
    User.prototype.isUsernameExists = function (email) {
        var db = new dbDriver_1.DBDriver(null);
        var sql = 'SELECT *  FROM users WHERE username =?';
        console.log(sql + email);
        return db.selectOne(sql, [email]);
    };
    User.prototype.getAllDevices = function (folder) {
        var db = new dbDriver_1.DBDriver(folder);
        var sql = 'SELECT devices.*, layouts.image FROM devices LEFT JOIN  layouts ON devices.layout_id=layouts.id';
        return db.queryAll(sql);
    };
    User.prototype.getMetadata = function (userid) {
        var db = new dbDriver_1.DBDriver(null);
        var sql = 'SELECT company, city, email  FROM users WHERE id =?';
        return db.selectOne(sql, [userid]);
    };
    User.prototype.generateToken = function (str) {
        return crypto.createHmac('sha256', this.secret).update(str).digest('hex');
    };
    User.prototype.getUserByToken = function (token) {
        var db = new ObjectDatabase_1.ObjectDatabase(null, 'users');
        return db.selectByValues({
            token: token
        });
    };
    User.prototype.login = function (username, password, sid, ip) {
        var _this = this;
        console.log('user ', username, password);
        var pass = crypto.createHash('md5').update(password).digest('hex');
        var def = Q.defer();
        var db = new ObjectDatabase_1.ObjectDatabase(null, 'users');
        var values = {
            username: username,
            password: pass
        };
        db.selectByValues(values).done(function (res) {
            if (res && res.length) {
                var user = res[0];
                if (!user.token)
                    user.token = _this.generateToken(username + pass);
                user.sid = sid;
                user.ip = ip;
                user.timestamp = Math.round(Date.now() / 1000);
                db.updateContent(user).done(function (res) { return def.resolve(user); }, function (err) { return def.reject(err); });
            }
            else
                def.resolve({ error: 'wrong' });
        }, function (err) { return def.reject(err); });
        return def.promise;
    };
    User.prototype.loginPlayer = function (username, password, devicedata, ip) {
        console.log('loginPlayer  ' + username + '  ' + password);
        var pass = crypto.createHash('md5').update(password).digest('hex');
        var def = Q.defer();
        var db = new dbDriver_1.DBDriver(null);
        var sql = 'SELECT id,token,role,folder FROM users WHERE username=? AND password=?';
        db.selectOne(sql, [username, pass]).done(function (users) {
            if (users)
                def.resolve(users);
            else
                def.reject('wrong');
        }, function (err) { return def.reject(err); });
        return def.promise;
    };
    User.prototype.insertPlayerLogin = function (user, ip) {
        var id = user.id;
        var token = user.token;
        var folder = user.folder;
        var account_id = user.account_id;
        var stamp = Math.round(Date.now() / 1000);
        var devicedata = user.devicedata;
        var db2 = new dbDriver_1.DBDriver(null);
        var sql = 'INSERT INTO players (ip,user_id,token,folder,account_id,timestamp,devicedata) VALUES (?,?,?,?,?,?,?)';
        return db2.insertOne(sql, [ip, id, token, folder, account_id, stamp, devicedata]);
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map