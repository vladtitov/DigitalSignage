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
router.get('/get-new-video', function (request, response) {
    console.log('get-new-video');
    var man = new VideoServerConnect_1.VideoServerConnect();
    man.getNextVideo().done(function (res) { return response.json({ data: res }); }, function (err) { return response.json({ error: err }); });
});
router.post('/processed', function (request, response) {
    var asset = new models_1.VOAsset(request.body);
    var token = asset.token;
    delete asset.token;
    asset.path = asset.folder + '/' + asset.filename;
    var man = new VideoServerConnect_1.VideoServerConnect();
    var folder;
    console.log('got processed', asset);
    man.getAssetFolder(asset).done(function (res) {
        folder = res;
        man.updateStatus(asset.id, 'precessed', folder).done(function (res) {
            asset.status = 'precessed';
            man.downloadFiles(asset, folder).done(function (asset) {
                man.finalize(asset, folder).done(function (asset) { return response.json({ data: asset }); }, function (err) { return response.json({ error: err }); });
            }, function (err) { return response.json({ error: err }); });
        }, function (err) { return response.json({ error: err }); });
    }, function (err) { return response.json({ error: err }); });
});
module.exports = router;
//# sourceMappingURL=manager.js.map