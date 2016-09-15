"use strict";
var express = require('express');
var fileProcessing_1 = require("./fileProcessing");
var ImageProcess_1 = require("./ImageProcess");
var TableModel_1 = require("../db/TableModel");
var models_1 = require("../../client/app/services/models");
var AssetsController_1 = require("./AssetsController");
var VideoServerConnect_1 = require("../videos/VideoServerConnect");
var router = express.Router();
var fs = require('fs');
router.get('/select-all', function (req, res) {
    var folder = req.session['user_folder'];
    var mytable = new TableModel_1.TableModel(folder, "assets");
    var promise = mytable.selectAllContent();
    promise.then(function (result) {
        res.json({ data: result });
    }, function (err) {
        console.log(err);
        res.json(err);
    });
});
router.post('/byid/:id', function (req, res) {
    var data = new models_1.VOAsset(req.body);
    var folder = req.session['user_folder'];
    var mytable = new TableModel_1.TableModel(folder, "assets");
    mytable.updateContent(data).then(function (result) {
        res.json({ data: result });
    }, function (err) {
        console.log(err);
        res.json(err);
    });
});
router.post('/save-asset', function (req, res) {
    var data = new models_1.VOAsset(req.body);
    var folder = req.session['user_folder'];
    var mytable = new TableModel_1.TableModel(folder, "assets");
    if (!data.mimetype) {
        res.json({ error: "mime not found" });
        return;
    }
    data.id = Number(data.id);
    if (data.id === -1) {
        delete data.id;
        mytable.insertContent(data).then(function (result) {
            res.json({ data: result });
        }, function (err) {
            console.log(err);
            onError(err, res);
        });
    }
    else {
        mytable.updateContent(data).then(function (result) {
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
    }
});
router.post('/delete-asset', function (req, res) {
    var data = new models_1.VOAsset(req.body);
    var folder = req.session['user_folder'];
    var mytable = new TableModel_1.TableModel(folder, "assets");
    mytable.deleteContent(data).then(function (result) {
        res.json({ data: result });
    }, function (err) {
        console.log(err);
        onError(err, res);
    });
});
router.get('/byid/:id', function (req, res) {
    var folder = req.session['user_folder'];
    var mytable = new TableModel_1.TableModel(folder, "assets");
    var promise = mytable.selectContentById(req.params.id);
    promise.then(function (result) {
        if (result !== {}) {
            console.log("res", result);
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
router.post('/select-assets/', function (request, response) {
    var folder = request.session['user_folder'];
    if (!folder) {
        response.json({ error: 'login' });
        return;
    }
    var body = request.body;
    var assetsID = body.assetsID.split(',').map(Number);
    var ctr = new AssetsController_1.AssetsController();
    ctr.getAssets(assetsID, folder).done(function (res) { return response.json({ data: res }); }, function (err) { return response.json({ error: err }); });
});
router.get('/used-playlist/:id', function (request, response) {
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
    var ctr = new AssetsController_1.AssetsController();
    ctr.getUsedPlaylist(id, folder).done(function (res) { return response.json({ data: res }); }, function (err) { return response.json({ error: err }); });
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
    var ctr = new AssetsController_1.AssetsController();
    ctr.deleteAsset(id, folder).done(function (res) { return response.json({ data: res }); }, function (err) { return response.json({ error: err }); });
});
router.post('/upload', function (req, response) {
    var folder = req.session['user_folder'];
    var token = req.session['user_token'];
    var fp = new fileProcessing_1.FileProcessing(folder);
    fp.uploadFile2(req, response, folder).then(function (asset) {
        asset.folder = folder;
        var mimetype = asset.mimetype.substr(asset.mimetype.length - 3);
        if (mimetype === 'jpg' || mimetype === 'peg' || mimetype === 'png') {
            asset.type = 'image';
        }
        else if (mimetype === 'ime' || mimetype === 'avi') {
            asset.type = 'video';
        }
        else {
            response.status(400);
            response.json({ error: 'Unknown type ' + asset.mimetype });
        }
        if (asset.type === 'image') {
            var ip = new ImageProcess_1.ImageProcess(folder);
            ip.processImage2(asset).then(function (res) { return response.json({ data: res }); }, function (err) { return response.json({ error: err }); });
        }
        else if (asset.type === 'video') {
            var video = new VideoServerConnect_1.VideoServerConnect(folder);
            video.insertProcess(asset).then(function (res) { return response.json({ data: res }); }, function (err) { return response.json({ error: err }); });
        }
        console.log('uploadFile done');
    }, function (error) {
        console.error(error);
        response.json({ error: error });
    });
});
module.exports = router;
//# sourceMappingURL=manager.js.map