"use strict";
var express = require('express');
var Playlists_Assets_1 = require("./Playlists_Assets");
var PlaylistItemsTable_1 = require("./PlaylistItemsTable");
var PlaylistsTable_1 = require("./PlaylistsTable");
var controller_1 = require("./controller");
var models_1 = require("../../client/app/services/models");
var fs = require('fs');
var router = express.Router();
router.get('/all', function (request, response) {
    var folder = request.session['user_folder'];
    if (!folder) {
        response.json({ error: 'login' });
        return;
    }
    var ctr = new controller_1.PlayListsController();
    ctr.getAllPlaylistWithAssets(folder).done(function (res) { return response.json({ data: res }); }, function (err) { return response.json({ error: err }); });
});
router.get('/used/:id', function (request, response) {
    var folder = request.session['user_folder'];
    if (!folder) {
        response.json({ error: 'login' });
        return;
    }
    var id = Number(request.params.id);
    if (isNaN(id)) {
        response.json({ error: id, where: request.params.id });
        return;
    }
    var ctr = new controller_1.PlayListsController();
    ctr.getUsedLayoutsLabels(id, folder).done(function (res) { return response.json({ data: res }); }, function (err) { return response.json({ error: err }); });
});
router.get('/props/:id', function (req, response) {
    var id = Number(req.params.id);
    if (isNaN(id)) {
        response.json({ error: id, where: req.params.id });
        return;
    }
    var playlisTable = new PlaylistsTable_1.PlaylistsTable(req.session['user_folder']);
    var p = playlisTable.selectContentById(id);
    p.then(function (props) {
        response.json({ data: props });
    }, function (err) {
        response.json({ error: err });
        console.error(err);
    });
});
router.get('/assets/:id', function (req, response) {
    var id = Number(req.params.id);
    if (isNaN(id)) {
        response.json({ error: id, where: req.params.id });
        return;
    }
    var playlist_assets = new PlaylistItemsTable_1.PlaylistItemsTable(req.session['user_folder']);
    var p2 = playlist_assets.selectPlayListItemsByListId(id);
    p2.then(function (assets) {
        response.json({ data: assets });
    }, function (err) {
        console.error(err);
        response.json({ error: err });
    });
});
router.get('/byid/:id', function (req, response) {
    var id = Number(req.params.id);
    if (isNaN(id)) {
        response.json({ error: id, where: req.params.id });
        return;
    }
    var playlist_assets = new PlaylistItemsTable_1.PlaylistItemsTable(req.session['user_folder']);
    var playlisTable = new PlaylistsTable_1.PlaylistsTable(req.session['user_folder']);
    var p = playlisTable.selectContentById(id);
    p.then(function (props) {
        var p2 = playlist_assets.selectPlayListItemsByListId(id);
        p2.then(function (assets) {
            var out = new models_1.VOPlaylist({ props: props, list: assets });
            response.json({ data: out });
        }, function (err) {
            console.error(err);
            response.json({ error: err });
        });
    }, function (err) {
        response.json({ error: err });
        console.error(err);
    });
});
router.post('/byid/:id', function (req, res) {
    var data = req.body;
    var pl = new models_1.VOPlaylist(req.body);
    var id = Number(req.params.id);
    if (isNaN(id)) {
        res.json({ error: ' id shpuld be present' });
        return;
    }
    var playlist_assets = new PlaylistItemsTable_1.PlaylistItemsTable(req.session['user_folder']);
    var playlisTable = new PlaylistsTable_1.PlaylistsTable(req.session['user_folder']);
    playlisTable.updateContentById(pl.props, id)
        .done(function (result) {
        if (result.insertId)
            id = result.insertId;
        playlist_assets.updatePalylist(pl.list, id)
            .done(function (final) {
            console.log(final);
            res.json({ data: result });
        }, function (err) {
            console.error(err);
            res.json({ error: err });
        });
    });
});
router.delete('/byid/:id', function (request, response) {
    var id = Number(request.params.id);
    var folder = request.session['user_folder'];
    if (isNaN(id)) {
        response.json({ error: ' id shpuld be present' });
        return;
    }
    if (!folder) {
        response.json({ error: 'login' });
        return;
    }
    var ctr = new controller_1.PlayListsController();
    ctr.deletePlaylist(id, folder).done(function (res) { return response.json({ data: res }); }, function (err) { return response.json({ error: err }); });
});
router.post('/update-playlist', function (req, res) {
    var body = req.body;
    var pl = new models_1.VOLayoutProps(body);
    var playlisTable = new PlaylistsTable_1.PlaylistsTable(req.session['user_folder']);
    var promise = playlisTable.updateContent(pl);
    promise.then(function (result) {
        if (result.changes) {
            res.json({ data: result });
        }
        else {
            onError(result, res);
        }
    }, function (err) {
        console.log(err);
        onError(err, res);
    });
});
router.post('/insert-playlist-item', function (req, res) {
    var body = req.body;
    var pl = new Playlists_Assets_1.Playlists_Assets(body);
    var err;
    var isValid = function (arg) {
        if (arg.listId <= 0 || typeof arg.listId !== 'number') {
            err = 'playlist_id <= 0 or must by number';
            return err;
        }
        else if (arg.assetId <= 0 || typeof arg.assetId !== 'number') {
            err = 'asset_id <= 0 or must by number';
            return err;
        }
        else if (arg.afterId < 0 || typeof arg.afterId !== 'number') {
            err = 'after_id < 0 or must by number';
            return err;
        }
    };
    if (isValid(pl)) {
        res.json({ error: err, pl: pl });
        return;
    }
    var playlist_assets = new PlaylistItemsTable_1.PlaylistItemsTable(req.session['user_folder']);
    var promise = playlist_assets.insertContent(pl);
    promise.then(function (result) {
        pl.id = result.insertId;
        var p1 = playlist_assets.updatePlaylist_Item(pl);
        p1.then(function (result1) {
            var p2 = playlist_assets.selectPlayListItemById(result.insertId);
            p2.then(function (result) {
                res.json({ data: result });
            }, function (err) {
                console.log(err);
                onError(err, res);
            });
        });
    }, function (err) {
        console.log(err);
        onError(err, res);
    });
});
router.post('/update-playlist-item', function (req, res) {
    var body = req.body;
    var pl = new Playlists_Assets_1.Playlists_Assets(body);
    var playlist_assets = new PlaylistItemsTable_1.PlaylistItemsTable(req.session['user_folder']);
    var promise = playlist_assets.updateContent(pl);
    promise.then(function (result) {
        if (result.changes) {
            res.json({ data: result });
        }
        else {
            onError(result, res);
        }
    }, function (err) {
        console.log(err);
        onError(err, res);
    });
});
router.get('/delete-playlist-item-byid/:id', function (req, res) {
    var pl = new Playlists_Assets_1.Playlists_Assets({ id: req.params.id });
    if (isNaN(pl.id)) {
        res.json({ error: req.params.id });
        return;
    }
    var playlist_assets = new PlaylistItemsTable_1.PlaylistItemsTable(req.session['user_folder']);
    var promise = playlist_assets.deletePlaylists_Assets(pl.id);
    promise.then(function (result) {
        if (result.changes) {
            res.json({ data: result });
        }
        else {
            onError(result, res);
        }
    }, function (err) {
        console.log(err);
        onError(err, res);
    });
});
router.get('/delete-playlist-byid/:id', function (req, res) {
    var pl = new Playlists_Assets_1.Playlists_Assets({ listId: req.params.id });
    var id = Number(req.params.id);
    if (isNaN(id)) {
        res.json({ error: req.params.id });
        return;
    }
    var playlist_assets = new PlaylistItemsTable_1.PlaylistItemsTable(req.session['user_folder']);
    var promise = playlist_assets.deletePlatlist(id);
    promise.then(function (result) {
        if (result.changes) {
            res.json({ data: result });
        }
        else {
            onError(result, res);
        }
    }, function (err) {
        console.log(err);
        onError(err, res);
    });
});
module.exports = router;
//# sourceMappingURL=manager.js.map