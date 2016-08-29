"use strict";
var dbmodels_1 = require("../db/dbmodels");
var Q = require('q');
var dbDriver_1 = require("../db/dbDriver");
var crypto = require('crypto');
var fs = require('fs-extra');
var nodemailer = require("nodemailer");
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
        password = crypto.createHash('md5').update(password).digest('hex');
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
                _this.insertNewUser(users).done(function (insert) {
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
    User.prototype.resetPass = function (email) {
        var _this = this;
        var def = Q.defer();
        var users = new dbmodels_1.RUsers();
        users.username = email;
        this.isUsernameExists(users.username).done(function (res) {
            if (res) {
                console.log('res: ', res);
                _this.sendMail(res.username, res.token).done(function (info) {
                    def.resolve(info);
                }, function (err) { return def.reject(err); });
            }
            else
                def.reject({ notExists: email });
        }, function (err) { return def.reject(err); });
        return def.promise;
    };
    User.prototype.sendMail = function (email, token) {
        var def = Q.defer();
        console.log('token ', token);
        var smtpConfig = {
            host: 'secure140.servconfig.com',
            port: 465,
            secure: true,
            auth: {
                user: 'support@iottech.ca',
                pass: 'Zaq12wsx'
            }
        };
        var transporter = nodemailer.createTransport(smtpConfig);
        var emailText = fs.readFileSync("server/emailTemplate.html", "utf8");
        console.log('emailText ', emailText);
        var text = emailText.replace('__token__', token);
        var mailOptions = {
            from: 'support@iottech.ca',
            to: email,
            subject: 'Choose a new password',
            html: text
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                def.reject(error);
            }
            else {
                console.log('Message sent: ' + info);
                def.resolve(info);
            }
            ;
        });
        return def.promise;
    };
    User.prototype.updateUsers = function (user) {
        var db = new dbDriver_1.DBDriver(null);
        return db.updateRow(user, 'users');
    };
    User.prototype.insertNewUser = function (user) {
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
        var db = new dbDriver_1.DBDriver(null);
        var sql = 'SELECT *  FROM users WHERE token =?';
        console.log(sql + token);
        return db.selectOne(sql, [token]);
    };
    User.prototype.updateUserPass = function (id, password) {
        var db = new dbDriver_1.DBDriver(null);
        var timestamp = Math.round(Date.now() / 1000);
        password = crypto.createHash('md5').update(password).digest('hex');
        var sql = 'UPDATE users SET password = "' + password + '", timestamp = ' + timestamp + ' WHERE id = ' + id;
        console.log(sql);
        return db.runQuery(sql);
    };
    User.prototype.login = function (username, password, sid, ip) {
        password = crypto.createHash('md5').update(password).digest('hex');
        console.log('password: ', password);
        var def = Q.defer();
        var db = new dbDriver_1.DBDriver(null);
        var sql = 'SELECT id, role, folder, token, sid  FROM users WHERE username =? AND password=?';
        db.selectOne(sql, [username, password]).done(function (user) {
            console.log('user ', user);
            if (user) {
                var timestamp = Math.round(Date.now() / 1000);
                db.updateRow({ id: user.id, timestamp: timestamp, ip: ip }, 'users');
                def.resolve(user);
            }
            else {
                console.log('err ');
                def.reject('wrong');
            }
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