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
var router_1 = require("@angular/router");
var devices_list_1 = require("./devices-list");
var device_editor_service_1 = require("./device-editor-service");
var DevicesManager = (function () {
    function DevicesManager(router, route, deviceEditorService) {
        this.router = router;
        this.route = route;
        this.deviceEditorService = deviceEditorService;
    }
    DevicesManager.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            var id = +params['id']; // (+) converts string 'id' to a number
            // console.log('id ', id);
            if (isNaN(id)) {
                _this.router.navigate(['./devices-manager', 0]);
                return;
            }
            _this.toolsDisadled = (id === -1 || id === 0) ? true : false;
            if (_this.toolsDisadled)
                _this.devicesList.reset();
        });
    };
    DevicesManager.prototype.onCurrentItem = function (evt) {
        console.log('evt selecteditem', evt);
        this.currentItem = evt;
        if (this.currentItem)
            this.router.navigate(['./devices-manager', this.currentItem.id]);
    };
    DevicesManager.prototype.onRemoveClick = function () {
        var _this = this;
        this.deleteTooltip = null;
        if (!this.currentItem)
            return;
        var item = this.currentItem;
        //  console.log('onRemoveClick ', this.currentItem);
        if (confirm('You want to delete device ' + item.label + '?')) {
            this.toolsDisadled = true;
            this.deviceEditorService.deleteDevice(item)
                .subscribe(function (data) {
                if (data.changes) {
                    _this.deleteTooltip = { placement: 'right', message: 'Device ' + item.id + ' ' + item.label + ' deleted from database!', tooltip_class: 'btn-success' };
                    _this.router.navigate(['./devices-manager', 0]);
                }
                else
                    _this.deleteTooltip = { tooltip_class: 'btn-danger', message: 'Error to delete device' };
                console.log('onRemoveResponse', data);
                _this.devicesList.refreshData();
            }, function (error) {
                _this.deleteTooltip = { placement: 'right', message: 'Server error', tooltip_class: 'btn-danger' };
                _this.toolsDisadled = false;
            });
        }
    };
    DevicesManager.prototype.onDataChange2 = function (deviceId) {
        this.devicesList.refreshData();
    };
    __decorate([
        core_1.ViewChild(devices_list_1.DevicesList), 
        __metadata('design:type', devices_list_1.DevicesList)
    ], DevicesManager.prototype, "devicesList", void 0);
    DevicesManager = __decorate([
        core_1.Component({
            selector: 'devices-manager',
            template: "\n<div class=\"content-850\">\n            <div class =\"panel-heading\">\n                <h3>Devices Manager</h3>\n                <nav>\n                     <a [routerLink]=\"['/devices-manager', -1]\" class=\"btn btn-default\" ><span class=\"fa fa-plus\"></span> Create New Device</a>\n                     <!--<a class=\"btn btn-default\" (click)=\"onEditClick()\"> <span class=\"fa fa-edit\"></span> Edit</a>-->\n                     <a class=\"btn btn-default\" [ng2-md-tooltip]=\"deleteTooltip\" [class.disabled]=\"toolsDisadled\" (click)=\"onRemoveClick()\"><span class=\"fa fa-minus\"></span> Delete Device</a>\n                </nav>\n            </div>           \n            <div class=\"panel-body\">\n            \n                <div class=\"item\">\n                    <devices-list (selecteditem)= \"onCurrentItem($event)\" #devicelist2></devices-list>\n                </div>\n                <div class=\"item\">\n                    <device-editor (onDataChange)=\"onDataChange2($event)\" [devicelist1]=\"devicelist2\"></device-editor>\n                </div>\n            </div>\n\n</div>\n",
            styles: ["\n        .item{\n            float: left;\n            margin-left: 20px;\n            }\n    "]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, device_editor_service_1.DeviceEditorService])
    ], DevicesManager);
    return DevicesManager;
}());
exports.DevicesManager = DevicesManager;
//# sourceMappingURL=devices-manager.js.map