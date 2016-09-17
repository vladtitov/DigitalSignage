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
 * Created by Vlad on 7/24/2016.
 */
var core_1 = require("@angular/core");
var models_1 = require("../services/models");
var device_list_service_1 = require("./device-list-service");
// import {DeviceThumb} from "../layouts/device-thumb";
// import {DeviceListItem} from "./device-list-item";
var router_1 = require("@angular/router");
var DevicesList = (function () {
    function DevicesList(deviceListService, router) {
        this.deviceListService = deviceListService;
        this.router = router;
        this.selecteditem = new core_1.EventEmitter();
        this.selectedItem = new models_1.VODevice({});
    }
    DevicesList.prototype.ngOnInit = function () {
        var _this = this;
        this.deviceListService.devices$.subscribe(function (data) {
            _this.devicesList = data;
            // console.log('devices ', this.devicesList);
        }, function (err) {
        });
        this.refreshData();
        // this.deviceListService.getDevices();
    };
    DevicesList.prototype.onDeviceClick = function (mydevice2) {
        this.diselectCurentItem();
        if (this.selectedItem)
            this.selectedItem.selected = false;
        this.selectedItem = mydevice2;
        this.selectedItem.selected = true;
        this.selecteditem.emit(this.selectedItem);
    };
    DevicesList.prototype.reset = function () {
        this.diselectCurentItem();
    };
    DevicesList.prototype.diselectCurentItem = function () {
        if (this.selectedItem)
            this.selectedItem.selected = false;
    };
    DevicesList.prototype.refreshData = function () {
        this.deviceListService.getDevices();
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DevicesList.prototype, "selecteditem", void 0);
    DevicesList = __decorate([
        core_1.Component({
            selector: 'devices-list',
            template: "\n<div>\n             <h4>Devices</h4>\n             <div class=\"slider-vertical\">\n                 <div class=\"mycontent\" >\n                    <div class=\"device\" *ngFor=\"let mydevice2 of devicesList\" (click)=\"onDeviceClick(mydevice2)\">                                                      \n                        <device-list-item [mydevice]=\"mydevice2\"></device-list-item>\n                    </div>\n                </div>\n              </div>\n\n\n</div>\n",
            styles: ["\n\n    .slider-vertical{\n        overflow-y: scroll;\n        height: 600px;\n        width: 286px;\n    }\n    .device{\n        height: 128px;\n        background-color: whitesmoke;\n        margin: 10px;\n        margin-left: 0px;\n        box-shadow: grey 3px 5px 4px;\n    }\n\n"]
        }), 
        __metadata('design:paramtypes', [device_list_service_1.DeviceListService, router_1.Router])
    ], DevicesList);
    return DevicesList;
}());
exports.DevicesList = DevicesList;
//# sourceMappingURL=devices-list.js.map