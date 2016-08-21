"use strict";
var express = require('express');
var models_1 = require("../../client/app/services/models");
var PlayerController_1 = require("./PlayerController");
var fs = require('fs');
var router = express.Router();
var ctr = new PlayerController_1.PlayerController();
router.get('/devices', function (request, response) {
    console.log(request.params);
    var folder = request.session['user_folder'];
    ctr.getAllDeviceswithLayoutImage(folder).done(function (devices) { return response.json({ data: devices }); }, function (err) { return response.json({ error: err }); });
});
router.get('/mydevice-stats/:id', function (request, response) {
    var id = Number(request.params.id);
    if (isNaN(id)) {
        response.json({ error: id, where: request.params.id });
        return;
    }
    var folder = request.session['user_folder'];
    ctr.getDeviceAndLayoutStamps(id, folder).done(function (res) { return response.json({ data: res }); }, function (err) { return response.json({ error: err }); });
});
router.get('/layout-stats/:id', function (request, response) {
    var id = Number(request.params.id);
    if (isNaN(id)) {
        response.json({ error: id, where: request.params.id });
        return;
    }
    var folder = request.session['user_folder'];
    ctr.getPlaylistStatsByLayout(id, folder).done(function (res) { return response.json({ data: res }); }, function (err) { return response.json({ error: err }); });
});
router.get('/layout/:id', function (request, response) {
    var id = Number(request.params.id);
    if (isNaN(id)) {
        response.json({ error: id, where: request.params.id });
        return;
    }
    var folder = request.session['user_folder'];
    ctr.getLayout(id, folder).done(function (res) { return response.json({ data: res }); }, function (err) { return response.json({ error: err }); });
});
router.get('/playlist-props/:id', function (request, response) {
    var id = Number(request.params.id);
    if (isNaN(id)) {
        response.json({ error: id, where: request.params.id });
        return;
    }
    var folder = request.session['user_folder'];
    ctr.getPlaylistProps(id, folder).done(function (res) { return response.json({ data: res }); }, function (err) { return response.json({ error: err }); });
});
router.get('/playlist-stats/:id', function (request, response) {
    var id = Number(request.params.id);
    if (isNaN(id)) {
        response.json({ error: id, where: request.params.id });
        return;
    }
    var folder = request.session['user_folder'];
    ctr.getPlaylistStats(id, folder).done(function (res) { return response.json({ data: res }); }, function (err) { return response.json({ error: err }); });
});
router.get('/playlist/:id', function (request, response) {
    var id = Number(request.params.id);
    if (isNaN(id)) {
        response.json({ error: id, where: request.params.id });
        return;
    }
    var folder = request.session['user_folder'];
    ctr.getPlaylistAssets(id, folder).done(function (res) { return response.json({ data: res }); }, function (err) { return response.json({ error: err }); });
});
router.get('/layout/:id/:token', function (request, response) {
    var id = Number(request.params.id);
    if (isNaN(id)) {
        response.json({ error: id, where: request.params.id });
        return;
    }
});
router.get('/playlist/:id/:token', function (request, response) {
    var id = Number(request.params.id);
    if (isNaN(id)) {
        response.json({ error: ' id shpuld be present' });
        return;
    }
});
router.post('/statistics/:id', function (req, response) {
    var body = req.body;
    var pl = new models_1.VOLayoutProps(body);
});
module.exports = router;
//# sourceMappingURL=manager.js.map