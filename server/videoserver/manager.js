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
    console.log(asset);
    var man = new VideoManager_1.VideoManager();
    man.registerReady(asset).done(function (asset2) {
        man.downloadFiles(asset2, asset2.folder).done(function (res) {
            asset2.status = 'ready';
            man.finalize(asset2, asset2.folder).done(function (res) { return response.json({ data: asset2 }); }, function (err) { return response.json({ error: err }); });
        }, function (err) { return response.json({ error: err }); });
    }, function (err) { return response.json({ error: err }); });
});
module.exports = router;
//# sourceMappingURL=manager.js.map