"use strict";
var express = require('express');
var LayoutsController_1 = require("./LayoutsController");
var models_1 = require("../../client/app/services/models");
var DevicesController_1 = require("./DevicesController");
var router = express.Router();
router.get('/templates', function (request, response) {
    var controller = new LayoutsController_1.LayoutsController(request.session['user_folder']);
    controller.getAllTemplates().done(function (res) {
        response.json({ data: res });
    }, function (err) {
        response.json({ error: err });
    });
});
router.get('/assembled-all', function (request, response) {
    var controller = new LayoutsController_1.LayoutsController(request.session['user_folder']);
    controller.getAllAssembled().done(function (res) {
        response.json({ data: res });
    }, function (err) {
        response.json({ error: err });
    });
});
router.get('/byid/:id', function (request, response) {
    var folder = request.session['user_folder'];
    if (!folder) {
        response.json({ error: 'need-login' });
        return;
    }
    var id = Number(request.params.id);
    if (isNaN(id)) {
        response.json({ error: ' id shpuld be present' });
        return;
    }
    var controller = new LayoutsController_1.LayoutsController(folder);
    controller.getLayoutFull(id).done(function (res) {
        response.json({ data: res });
    }, function (err) {
        response.json({ error: err });
    });
});
router.get('/by-device-id/:id', function (request, response) {
    var folder = request.session['user_folder'];
    if (!folder) {
        response.json({ error: 'need-login' });
        return;
    }
    var id = Number(request.params.id);
    if (isNaN(id)) {
        response.json({ error: ' id shpuld be present' });
        return;
    }
    var controllerDevice = new DevicesController_1.DevicesController(folder);
    controllerDevice.getDeviceById(id).done(function (res) {
        if (!res) {
            response.json({ error: id });
            return;
        }
        var controller = new LayoutsController_1.LayoutsController(folder);
        controller.getLayoutFull(res.layout_id).done(function (res) {
            response.json({ data: res });
        }, function (err) {
            response.json({ error: err });
        });
    }, function (err) {
        console.error(err);
        response.json({ error: err });
    });
});
router.post('/byid/:id', function (request, response) {
    var item = new models_1.VOLayout(request.body);
    var id = Number(item.props.id);
    if (isNaN(id)) {
        response.json({ error: ' id shpuld be present' });
        return;
    }
    var controller = new LayoutsController_1.LayoutsController(request.session['user_folder']);
    controller.updateContentById(item.props, id).done(function (res) {
        if (res.insertId)
            id = res.insertId;
        controller.updateViewPorts(item.viewports, id)
            .done(function (final) {
            response.json({ data: res });
        }, function (err) {
            response.json({ error: err });
        });
    }, function (err) {
        response.json({ error: err });
    });
});
router.delete('/byid/:id', function (request, response) {
    var id = Number(request.params.id);
    if (isNaN(id)) {
        response.json({ error: ' id shpuld be present' });
        return;
    }
    var controllerLayouts = new LayoutsController_1.LayoutsController(request.session['user_folder']);
    var controllerDevices = new DevicesController_1.DevicesController(request.session['user_folder']);
    controllerLayouts.deleteContentById(id).done(function (res1) {
        controllerDevices.updateByLayoutId(id).done(function (res2) {
            res1.changes += res2.changes;
            response.json({ data: res1 });
        }, function (err) {
            response.json({ error: err });
        });
    }, function (err) {
        response.json({ error: err });
    });
});
router.get('/mydevice/:id', function (request, response) {
    var id = Number(request.params.id);
    if (isNaN(id)) {
        response.json({ error: ' id shpuld be present' });
        return;
    }
    var controllerDevice = new DevicesController_1.DevicesController(request.session['user_folder']);
    controllerDevice.getDeviceById(id).done(function (res) {
        response.json({ data: res });
    }, function (err) {
        console.error(err);
        response.json({ error: err });
    });
});
router.post('/mydevice-new/:id', function (request, response) {
    var item = new models_1.VODevice(request.body);
    var id = Number(item.id);
    if (isNaN(id)) {
        response.json({ error: ' id shpuld be present' });
        return;
    }
    var controllerDevice = new DevicesController_1.DevicesController(request.session['user_folder']);
    controllerDevice.updateContentById(item, id).done(function (res) {
        if (res.insertId)
            id = res.insertId;
        response.json({ data: res });
    }, function (err) {
        console.error(err);
        response.json({ error: err });
    });
});
router.get('/mydevice-all', function (request, response) {
    var folder = request.session['user_folder'];
    if (!folder) {
        response.json({ error: 'need-login' });
        return;
    }
    var controllerDevice = new DevicesController_1.DevicesController(folder);
    controllerDevice.getAllDevices().done(function (res) { return response.json({ data: res }); }, function (err) { return response.json({ error: err }); });
});
router.get('/mydevice-layout/:layout_id', function (request, response) {
    var layout_id = Number(request.params.layout_id);
    var controllerDevice = new DevicesController_1.DevicesController(request.session['user_folder']);
    controllerDevice.getDevicesByLayoutId(layout_id).done(function (res) { return response.json({ data: res }); }, function (err) { return response.json({ error: err }); });
});
router.delete('/mydevice/:id', function (request, response) {
    var id = Number(request.params.id);
    if (isNaN(id)) {
        response.json({ error: ' id shpuld be present' });
        return;
    }
    var controllerDevice = new DevicesController_1.DevicesController(request.session['user_folder']);
    controllerDevice.deleteDevice(id).done(function (res) { return response.json({ data: res }); }, function (err) { return response.json({ error: err }); });
});
module.exports = router;
//# sourceMappingURL=manager.js.map