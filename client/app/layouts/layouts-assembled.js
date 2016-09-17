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
 * Created by Vlad on 7/26/2016.
 */
var core_1 = require("@angular/core");
var router_1 = require('@angular/router');
var layout_editor_service_1 = require("../layout-editor/layout-editor-service");
var device_editor_service_1 = require("../device/device-editor-service");
var LayoutsAssembled = (function () {
    function LayoutsAssembled(ar, router, layoutsEditorService, deviceEditorService) {
        this.ar = ar;
        this.router = router;
        this.layoutsEditorService = layoutsEditorService;
        this.deviceEditorService = deviceEditorService;
    }
    LayoutsAssembled.prototype.onLayoutSelected = function (item) {
        this.currentItem = item;
        if (item.usedDevice)
            return;
        // console.log('ITEM ', item);
        // console.log('this.currentItem ', this.currentItem);
        this.deviceEditorService.getUsedDevice(item.props)
            .subscribe(function (devices) {
            item.usedDevice = devices;
            // console.log('res ', item.usedDevice);
        });
    };
    LayoutsAssembled.prototype.onEditClick = function () {
        if (this.currentItem) {
            var link = ['/layout-editor', 'library', this.currentItem.props.id];
            this.router.navigate(link);
        }
    };
    LayoutsAssembled.prototype.onDeleteClick = function (evt, btn) {
        var _this = this;
        this.deleteTooltip = null;
        var strLabels;
        if (this.currentItem.usedDevice && this.currentItem.usedDevice.length) {
            var labelArr = this.currentItem.usedDevice.map(function (item) {
                return item.label;
            });
            strLabels = labelArr.join(', ');
        }
        else {
            strLabels = 'no devices';
        }
        if (this.currentItem && confirm('You want to delete asseble "' + this.currentItem.props.label + '"?\n' +
            'Used devices: ' + strLabels)) {
            this.layoutsEditorService.deleteLayoutById(this.currentItem.props.id)
                .subscribe(function (result) {
                if (result.changes) {
                    _this.deleteTooltip = { message: 'Layout deleted from database!', tooltip_class: 'btn-success' };
                    _this.changesResult = result;
                    _this.currentItem = null;
                }
                else
                    _this.deleteTooltip = { tooltip_class: 'btn-danger', message: 'Error to delete layout' };
            }, function (error) {
                _this.deleteTooltip = { message: 'Server error', tooltip_class: 'btn-danger' };
                _this.error = error;
            });
        }
    };
    LayoutsAssembled = __decorate([
        core_1.Component({
            selector: 'layouts-assembled',
            template: "\n<div>\n            <div class =\"panel-heading\">\n                <h3>Layouts Manager</h3>\n                <nav>\n                    <a [routerLink]=\"['../layout-template/',-1]\" class=\"btn btn-default\"><span class=\"fa fa-plus\"></span> Create New Layout</a>\n                    <a class=\"btn btn-default\" [class.disabled]=\"!currentItem\" (click)=\"onEditClick()\"> <span class=\"fa fa-edit\" ></span> Edit Layout</a>\n                    <a #mybtn class=\"btn btn-default\" [class.disabled]=\"!currentItem\" (click)=\"onDeleteClick($evtnt,mybtn)\" [ng2-md-tooltip]=\"deleteTooltip\"><span class=\"fa fa-minus\"></span> Delete Layout</a>\n                </nav>\n            </div>\n            <div class=\"panel-body\">\n                <layouts-list-cards [changesResult]=\"changesResult\" (onselect)=\"onLayoutSelected($event)\"  ></layouts-list-cards>\n            </div>\n</div>\n",
            providers: [layout_editor_service_1.LayoutEditorService, device_editor_service_1.DeviceEditorService]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, layout_editor_service_1.LayoutEditorService, device_editor_service_1.DeviceEditorService])
    ], LayoutsAssembled);
    return LayoutsAssembled;
}());
exports.LayoutsAssembled = LayoutsAssembled;
//# sourceMappingURL=layouts-assembled.js.map