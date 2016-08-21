"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by Vlad on 7/16/2016.
 */
var core_1 = require("@angular/core");
var models_1 = require("../app/services/models");
var device_service_1 = require("./services/device-service");
var router_1 = require("@angular/router");
var player_view_port_1 = require("./player-view-port");
var DeviceController = (function () {
    function DeviceController(deviceService, route) {
        this.deviceService = deviceService;
        this.route = route;
    }
    DeviceController.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            console.log(params);
            _this.deviceService.getDevice(+params['deviceid']).subscribe(function (resp) {
                _this.device = resp;
                _this.layout = new models_1.VOLayout(resp.layout);
                _this.viewports = _this.layout.viewports;
            });
        });
        //
    };
    DeviceController = __decorate([
        core_1.Component({
            selector: 'device-view',
            template: "\n<div>\n        <div class=\"pos-relative\">\n            <div class=\"pos-absolute\">\n                <div *ngFor=\"let vp of viewports\" class=\"pos-absolute\">\n                    <player-view-port [myviewport]=\"vp\"  class=\"pos-absolute\"></player-view-port>\n                </div>\n             </div>\n        </div>\n\n</div>",
            directives: [player_view_port_1.PlayerViewPort],
            providers: [device_service_1.DeviceService]
        }), 
        __metadata('design:paramtypes', [device_service_1.DeviceService, router_1.ActivatedRoute])
    ], DeviceController);
    return DeviceController;
}());
exports.DeviceController = DeviceController;
//# sourceMappingURL=device-controller.js.map