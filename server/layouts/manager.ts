/// <reference path="../../typings/express/express.d.ts" />

import * as express from 'express';
import Request = Express.Request;
import Response = Express.Response;
import Q = require('q');



import {LayoutsController} from "./LayoutsController";
import {VOLayout, VODevice} from "../../client/app/services/models";
import {UpdateResult} from "../db/dbDriver";
import {DevicesController} from "./DevicesController";




declare var WWW:string;
declare var SERVER:string;
declare  var onError: (err:any, res: express.Response) => void;


const router = express.Router();


//

router.get('/templates', function (request:express.Request, response:express.Response) {

    var controller = new LayoutsController(request.session['user_folder']);
    controller.getAllTemplates().done(function(res){
        response.json({data:res})
    },function(err){
        response.json({error:err})
    })


});

router.get('/assembled-all', function (request:express.Request, response:express.Response) {
    var controller = new LayoutsController(request.session['user_folder']);
   controller.getAllAssembled().done(function(res){
        response.json({data:res})
    },function(err){
        response.json({error:err})
    })


});

router.get('/byid/:id', function (request:express.Request, response:express.Response) {

    var folder:string = request.session['user_folder'];
    if(!folder){
        response.json({error:'need-login'});
        return;
    }

    var id:number = Number(request.params.id);
    if(isNaN(id)){
        response.json({error:' id shpuld be present'});
        return
    }

    var controller = new LayoutsController(folder);

    controller.getLayoutFull(id).done(function(res){
        response.json({data:res});
    },function (err) {
        response.json({error:err});
    })

});

router.get('/by-device-id/:id', function (request:express.Request, response:express.Response) {

    var folder:string = request.session['user_folder'];
    if(!folder){
        response.json({error:'need-login'});
        return;
    }

    var id:number = Number(request.params.id);
    if(isNaN(id)){
        response.json({error:' id shpuld be present'});
        return
    }

    var controllerDevice = new DevicesController(folder);
    controllerDevice.getDeviceById(id).done(function(res){
        if(!res) {
            response.json({error:id});
            return;
        }
        var controller = new LayoutsController(folder);
        controller.getLayoutFull(res.layout_id).done(function(res){
            response.json({data:res});
        },function (err) {
            response.json({error:err});
        });
        // response.json({data:res});
    },function (err) {
        console.error(err);
        response.json({error:err});
    });

});

router.post('/byid/:id', function (request:express.Request, response:express.Response) {

    var item:VOLayout = new VOLayout(request.body);

    var id = Number(item.props.id);
    if(isNaN(id)){
        response.json({error:' id shpuld be present'});
        return
    }
    var controller = new LayoutsController(request.session['user_folder']);
    controller.updateContentById(item.props,id).done(function(res:UpdateResult){
        if(res.insertId) id =res.insertId;
        controller.updateViewPorts(item.viewports,id)
            .done(function(final:any){

                response.json({data:res});
            },function(err){
                response.json({error:err});
            })

    },function(err){
        response.json({error:err})
    })


});

router.delete('/byid/:id', function (request:express.Request, response:express.Response) {

    var id = Number(request.params.id);
    // console.log(' manager layout id', id);
    if(isNaN(id)){
        response.json({error:' id shpuld be present'});
        return
    }

    var controllerLayouts = new LayoutsController(request.session['user_folder']);
    var controllerDevices = new DevicesController(request.session['user_folder']);

    controllerLayouts.deleteContentById(id).done(function(res1:UpdateResult){
        controllerDevices.updateByLayoutId(id).done(function (res2:UpdateResult) {
            res1.changes += res2.changes;
            response.json({data:res1});
        }, function(err){
            response.json({error:err})
        })
    }, function(err){
        response.json({error:err})
    })

});

router.get('/mydevice/:id', function (request:express.Request, response:express.Response) {

    var id:number = Number(request.params.id);
    if(isNaN(id)){
        response.json({error:' id shpuld be present'});
        return
    }
    var controllerDevice = new DevicesController(request.session['user_folder']);
    controllerDevice.getDeviceById(id).done(function(res){
        response.json({data:res});
    },function (err) {
        console.error(err);
        response.json({error:err});
    });
});

router.post('/mydevice-new/:id', function (request:express.Request, response:express.Response) {

    var item:VODevice = new VODevice(request.body);
    var id = Number(item.id);
    if (isNaN(id)) {
        response.json({error: ' id shpuld be present'});
        return;
    }

    var controllerDevice = new DevicesController(request.session['user_folder']);
    controllerDevice.updateContentById(item, id).done(function (res:UpdateResult) {
        if (res.insertId) id = res.insertId;
        response.json({data: res});

    }, function (err) {
        console.error(err);
        response.json({error: err})
    });
});


router.get('/mydevice-all', function (request:express.Request, response:express.Response) {
    var folder:string = request.session['user_folder'];
    if(!folder) {
        response.json({error:'need-login'})
        return;
    }

    var controllerDevice = new DevicesController(folder);
    controllerDevice.getAllDevices().done(
        res=> response.json({data:res})
        ,err => response.json({error:err})
    );
});


router.get('/mydevice-layout/:layout_id', function (request:express.Request, response:express.Response) {
    var layout_id:number = Number(request.params.layout_id);

    var controllerDevice = new DevicesController(request.session['user_folder']);

    controllerDevice.getDevicesByLayoutId(layout_id).done(
        res=> response.json({data:res})
        , err=> response.json({error:err})
    );

    // controllerDevice.getAllDevices().done(function(res:VODevice[]){
    //     var devicesList:VODevice[] = res.filter(function(val) {
    //         if(val.layout_id === layout_id) return true;
    //     }).map(function(val) {
    //         return val;
    //     });
    //     response.json({data:devicesList});
    // },function (err) {
    //     console.error(err);
    //     response.json({error:err});
    // });
});

router.delete('/mydevice/:id', function (request:express.Request, response:express.Response) {

    var id = Number(request.params.id);
    // console.log(' manager layout id', id);
    if(isNaN(id)){
        response.json({error:' id shpuld be present'});
        return
    }

    var controllerDevice = new DevicesController(request.session['user_folder']);
    controllerDevice.deleteDevice(id).done(
        (res:UpdateResult) => response.json({data:res}),
        err=> response.json({error:err})
    );
});

export = router