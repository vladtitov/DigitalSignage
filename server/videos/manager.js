"use strict";
var express = require('express');
var models_1 = require("../../client/app/services/models");
var VideoServerConnect_1 = require("./VideoServerConnect");
var router = express.Router();
router.get('/get-status/:id', function (request, response) {
    var id = Number(request.params.id);
    if (isNaN(id)) {
        response.json({ error: request.params.id });
        return;
    }
    var man = new VideoServerConnect_1.VideoServerConnect();
    man.getStatus(id).done(function (res) { return response.json({ data: res }); }, function (err) { return response.json({ error: err }); });
});
router.get('/get-new-file/:status', function (request, response) {
    var status = request.params.status;
    var man = new VideoServerConnect_1.VideoServerConnect();
    man.getNextVideo(status).done(function (res) { return response.json({ data: res }); }, function (err) { return response.json({ error: err }); });
});
router.post('/ready', function (request, response) {
    var asset = new models_1.VOAsset(request.body);
    delete asset.workingFolder;
    var token = asset.token;
    delete asset.token;
    asset.path = asset.folder + '/' + asset.filename;
    asset.status = 'processed';
    console.log(asset);
    var man = new VideoServerConnect_1.VideoServerConnect();
    man.updateProcessed(asset).done(function (folder) {
        asset.folder = folder;
        man.downloadFiles(asset, folder).done(function (res) {
            asset.status = 'ready';
            man.finalize(asset, folder).done(function (res) { return response.json({ data: asset }); }, function (err) { return response.json({ error: err }); });
        }, function (err) { return response.json({ error: err }); });
    }, function (err) { return response.json({ error: err }); });
});
module.exports = router;
//# sourceMappingURL=manager.js.map