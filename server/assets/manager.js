"use strict";
var express = require('express');
var fileProcessing_1 = require("./fileProcessing");
var ImageProcess_1 = require("./ImageProcess");
var TableModel_1 = require("../db/TableModel");
var VideoProcess_1 = require("./VideoProcess");
var models_1 = require("../../client/app/services/models");
var AssetsController_1 = require("./AssetsController");
var router = express.Router();
var fs = require('fs');
var ISResult = (function () {
    function ISResult(data) {
        this.data = data;
    }
    return ISResult;
}());
var onSuccess = function (result, res) {
    console.log('onSuccess result\n', result);
    res.json(new ISResult(result));
};
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
    if (!data.mime) {
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
    var fp = new fileProcessing_1.FileProcessing(folder);
    fp.uploadFile(req, response).then(function (asset) {
        if (asset.type === 'image') {
            var ip = new ImageProcess_1.ImageProcess(folder);
            ip.processImage(asset).then(function (res) {
                response.json({ data: res });
            }, function (err) {
                console.error(err);
                response.json({ error: err });
            });
        }
        else if (asset.type === 'video') {
            response.json({ data: 'success' });
            var vp = new VideoProcess_1.VideoProcess(folder);
            vp.processVideo(asset).then(function (res) {
            }, function (err) {
                console.error(err);
                response.json({ error: err });
            });
        }
        console.log('result uploadFile done\n');
    }, function (error) {
        console.error(error);
        response.json({ error: error });
    });
});
module.exports = router;
//# sourceMappingURL=manager.js.map