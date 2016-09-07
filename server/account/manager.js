"use strict";
var express = require('express');
var User_1 = require("./User");
var util_1 = require("util");
var router = express.Router();
router.get('/login/:token', function (request, response) {
    var folder = request.session['user_folder'];
    console.log('folder ', folder);
    if (folder) {
        response.json({ error: 'logoutfirst' });
        return;
    }
    var token = request.params.token;
    if (!token) {
        response.json({ error: 'token' });
        return;
    }
    var ctr = new User_1.User();
    ctr.getUserByToken(token).done(function (user) {
        console.log('user ', user);
        if (user) {
            var out = {};
            out.result = 'logedin';
            out.token = user.token;
            out.sid = user.sid;
            out.namesp = user.folder;
            out.role = user.role;
            request.session['user_folder'] = user.folder;
            request.session['user_role'] = user.role;
            request.session['user_ID'] = user.id;
            request.session.save(function (err) {
                if (err)
                    response.json({ error: err });
                else {
                    console.log('User loggedin ', out);
                    response.json({ data: out });
                }
            });
        }
        else
            response.json({ error: 'wrong user' });
    }, function (error) { return response.json({ error: error }); });
});
router.get('/logout', function (request, response) {
    console.log('user_folder', request.session['user_folder']);
    request.session.destroy(function (err) {
        if (err)
            response.json({ err: err });
        else
            response.json({ data: 'logoutsuccess' });
    });
});
router.post('/login', function (request, response) {
    var body = request.body;
    var sid = request.session['id'];
    var ip = request.connection.remoteAddress;
    var password = body.password;
    var username = body.username;
    console.log('sid: ', sid);
    console.log('login body', body);
    if (!username || !password || password.length < 6) {
        response.json({ error: 'reqired' });
        return;
    }
    var ctr = new User_1.User();
    ctr.login(body.username, body.password, sid, ip).done(function (user) {
        var out = {};
        out.result = 'logedin';
        out.folder = user.folder;
        out.token = user.token;
        out.sid = user.sid;
        out.role = user.role;
        console.log('out ', out);
        request.session['user_folder'] = user.folder;
        request.session['user_role'] = user.role;
        request.session['user_ID'] = user.id;
        console.log('session: ', request.session);
        request.session.save(function (err) {
            if (err)
                response.json({ error: err });
            else {
                console.log('User  loggedin ', out);
                response.json({ data: out });
            }
        });
    }, function (error) { console.log('error user', error); response.json({ error: error }); });
});
router.post('/reset-password', function (request, response) {
    var body = request.body;
    var username = body.username;
    if (!username) {
        response.json({ error: 'reqired' });
        return;
    }
    var user = new User_1.User();
    user.resetPass(username).done(function (sended) {
        response.json({ data: sended });
    }, function (error) { return response.json({ error: error }); });
});
router.post('/change-password', function (request, response) {
    var body = request.body;
    var password = body.password;
    var token = body.token;
    if (!token || !password) {
        response.json({ error: 'reqired' });
        return;
    }
    var user = new User_1.User();
    user.getUserByToken(token).done(function (res) {
        if (res) {
            user.updateUserPass(res.id, password).done(function (final) { return response.json({ data: final }); }, function (error) { return response.json({ error: error }); });
        }
        else
            response.json({ error: util_1.error });
    }, function (error) { return response.json({ error: error }); });
});
router.post('/loginplayer', function (request, response) {
    var body = request.body;
    var ip = request.connection.remoteAddress;
    var password = body.password;
    if (password && password.length > 5) {
        var ctr = new User_1.User();
        ctr.loginPlayer(body.username.trim(), body.password.trim(), body.devicedata, ip).done(function (user) {
            var out = {};
            out.result = 'logedin';
            out.token = user.token;
            out.namesp = user.folder;
            out.role = 'player';
            request.session['user_folder'] = user.folder;
            request.session['user_role'] = 'player';
            request.session['user_ID'] = user.id;
            request.session.save(function (err) {
                if (err)
                    response.json({ error: err });
                else {
                    console.log('User loggedin ', out);
                    response.json({ data: out });
                }
            });
        }, function (error) { return response.json({ error: error }); });
    }
    else
        response.json({ error: 'reqired' });
});
router.post('/new-user-admin', function (request, response) {
    var body = request.body;
    var ip = request.connection.remoteAddress;
    var password = body.password;
    if (password && password.length > 5) {
        var user = new User_1.User();
        user.createUser(body.username, body.password, ip, 'admin').done(function (newuser) {
            console.log('new user', newuser);
            user.createAccount(newuser).done(function (final) { return response.json({ data: final }); }, function (error) { return response.json({ error: error }); });
        }, function (error) { return response.json({ error: error }); });
    }
    else
        response.json({ error: 'reqired' });
});
router.post('/new-user-player', function (request, response) {
    var body = request.body;
    var ip = request.connection.remoteAddress;
    var password = body.password;
    if (password && password.length > 5) {
        var user = new User_1.User();
        user.createUser(body.username, body.password, ip, 'player').done(function (newuser) {
            console.log('new user', newuser);
            user.createAccount(newuser).done(function (final) { return response.json({ data: final }); }, function (error) { return response.json({ error: error }); });
        }, function (error) { return response.json({ error: error }); });
    }
    else
        response.json({ error: 'reqired' });
});
router.get('/userdevices', function (request, response) {
    var folder = request.session['user_folder'];
    var user = new User_1.User();
    if (!folder) {
        response.json({ error: 'login' });
        return;
    }
    user.getAllDevices(folder).done(function (res1) {
        if (isNaN(request.session['user_ID']))
            response.json({ data: res1 });
        else
            user.getMetadata(request.session['user_ID']).done(function (res2) { return response.json({ data: res1, metadata: res2 }); }, function (err) { return response.json({ error: err }); });
    }, function (err) { return response.json({ error: err }); });
});
module.exports = router;
//# sourceMappingURL=manager.js.map