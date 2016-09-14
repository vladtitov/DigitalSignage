"use strict";
var express = require('express');
var DevicesController_1 = require("../layouts/DevicesController");
var controller_1 = require("../playlists/controller");
var router = express.Router();
var myfolder = '/clientAssets/folder_hbrowser';
router.get('/device/:id', function (request, response) {
    var id = Number(request.params.id);
    if (isNaN(id)) {
        response.json({ error: ' id shpuld be present' });
        return;
    }
    var ctr = new DevicesController_1.DevicesController(myfolder);
    ctr.getDeviceWithLayout(id).done(function (res) { return response.json({ data: res }); }, function (err) { return response.json({ error: err }); });
});
router.get('/playlist/:id', function (request, response) {
    var id = Number(request.params.id);
    if (isNaN(id)) {
        response.json({ error: ' id shpuld be present' });
        return;
    }
    var ctr = new controller_1.PlayListsController();
    ctr.getPlaylistWithAssets(id, myfolder).done(function (res) { return response.json({ data: res }); }, function (err) { return response.json({ error: err }); });
});
router.get('/playlist-timestamp/:id', function (request, response) {
    var id = Number(request.params.id);
    if (isNaN(id)) {
        response.json({ error: ' id shpuld be present' });
        return;
    }
    var ctr = new controller_1.PlayListsController(myfolder);
    ctr.getPlaylistTimestamp(id).done(function (res) { return response.json({ data: res }); }, function (err) { return response.json({ error: err }); });
});
module.exports = router;
//# sourceMappingURL=manager.js.map