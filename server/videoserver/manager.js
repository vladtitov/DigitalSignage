"use strict";
var express = require('express');
var models_1 = require("../../client/app/services/models");
var VideoManager_1 = require("./VideoManager");
var router = express.Router();
router.get('/get-new-file', function (request, response) {
    var man = new VideoManager_1.VideoManager();
    man.getNextVideo().done(function (res) { return response.json({ data: res }); }, function (err) { return response.json({ error: err }); });
});
router.post('/ready', function (request, response) {
    var asset = new models_1.VOAsset(request.body);
    delete asset.workingFolder;
    var token = asset.token;
    delete asset.token;
    asset.path = asset.folder + '/' + asset.filename;
    asset.status = 'processed';
    console.log(asset);
    var man = new VideoManager_1.VideoManager();
    man.registerProcessed(asset).done(function (folder) {
        asset.folder = folder;
        man.downloadFiles(asset, folder).done(function (res) {
            asset.status = 'ready';
            man.finalize(asset, folder).done(function (res) { return response.json({ data: asset }); }, function (err) { return response.json({ error: err }); });
        }, function (err) { return response.json({ error: err }); });
    }, function (err) { return response.json({ error: err }); });
});
module.exports = router;
//# sourceMappingURL=manager.js.map