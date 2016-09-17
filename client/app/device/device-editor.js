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
var device_editor_service_1 = require("./device-editor-service");
// import {LayoutThumb} from "../layouts/layout-thumb";
var router_1 = require("@angular/router");
var devices_list_1 = require("./devices-list");
var layouts_list_service_1 = require("../layouts/layouts-list-service");
var DeviceEditor = (function () {
    function DeviceEditor(deviceEditorService, route, router, layoutsListService) {
        this.deviceEditorService = deviceEditorService;
        this.route = route;
        this.router = router;
        this.layoutsListService = layoutsListService;
        this.onDataChange = new core_1.EventEmitter();
        this.currentLayout = new models_1.VOLayout({});
        this.isInProgress = false;
        this.deviceBaseUrl = window.location.protocol + '//' + window.location.host + '/preview/device/';
    }
    DeviceEditor.prototype.getDataById = function (id) {
        this.deviceEditorService.getData(id);
    };
    DeviceEditor.prototype.ngOnInit = function () {
        var _this = this;
        this.layoutsListService.getLayouts2()
            .subscribe(function (layouts) {
            _this.layouts = layouts;
            _this.showLayout();
            // this.labels = layouts.map(function (item:VOLayout) {
            //     return item.props.label;
            // });
            // this.labels.unshift('no layout');
        });
        this.sub = this.route.params.subscribe(function (params) {
            var id = +params['id']; // (+) converts string 'id' to a number
            console.log('id:', id);
            if (isNaN(id))
                return;
            if (id === 0) {
                _this.currentItem = new models_1.VODevice({ id: 0 });
                _this.currentLayout = new models_1.VOLayout({});
                _this.deviceUrl = null;
                _this.showLayout();
            }
            else if (id === -1) {
                _this.currentItem = new models_1.VODevice({ id: -1, label: "New Device", description: "Some Description" });
                _this.currentLayout = new models_1.VOLayout({});
                _this.deviceUrl = null;
                _this.showLayout();
            }
            else {
                _this.deviceEditorService.getData(+id)
                    .subscribe(function (data) {
                    _this.currentItem = data;
                    _this.deviceUrl = _this.deviceBaseUrl + _this.currentItem.id;
                    // console.log('this.currentItem ', this.currentItem);
                    _this.showLayout();
                });
            }
        });
    };
    DeviceEditor.prototype.onSaveClick = function (label, description) {
        var _this = this;
        this.tooltipOptions = null;
        this.isInProgress = true;
        if (this.currentLayout)
            this.currentItem.layout_id = this.currentLayout.props.id;
        if (this.currentItem.layout_id == -1)
            this.currentItem.layout_id = 0;
        this.currentItem.label = label;
        this.currentItem.description = description;
        this.deviceEditorService.saveData(this.currentItem)
            .subscribe(function (data) {
            console.log(data);
            console.log(_this.currentItem);
            if (data.insertId) {
                if (_this.currentItem.id === -1)
                    _this.currentItem.id = data.insertId;
            }
            _this.tooltipOptions = { message: 'Device saved on server', tooltip_class: 'btn-success' };
            _this.isInProgress = false;
            var id = data.insertId ? data.insertId : _this.currentItem.id;
            _this.getDataById(id);
            _this.onDataChange.emit(id);
            _this.router.navigate(['./devices-manager', id]);
            // if(this.devicelist1) this.devicelist1.refreshData();
        }, function (error) {
            _this.tooltipOptions = { message: 'Server error', tooltip_class: 'btn-danger' };
            _this.isInProgress = false;
        });
    };
    DeviceEditor.prototype.showLayout = function () {
        if (!this.currentItem)
            return;
        var id = this.currentItem.layout_id;
        console.log('id showLayout ', id);
        if (isNaN(id) || !this.layouts)
            return;
        var layout;
        this.layouts.forEach(function (item) {
            // console.log('item ', item);
            if (item.props.id == id)
                layout = item;
        });
        console.log('layout ', layout);
        if (layout) {
            this.currentLayout = layout;
        }
        else {
            this.currentLayout = new models_1.VOLayout({});
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', devices_list_1.DevicesList)
    ], DeviceEditor.prototype, "devicelist1", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DeviceEditor.prototype, "onDataChange", void 0);
    DeviceEditor = __decorate([
        core_1.Component({
            selector: 'device-editor',
            template: "\n<div class=\"device-editor\">\n        \n            <h4>Device Details</h4>\n            <a class=\"previewUrl\" *ngIf=\"deviceUrl && currentItem.layout_id\" target=\"_blank\" href=\"{{deviceUrl}}\"><span class=\"fa fa-eye\"></span> Preview</a>\n            <form role=\"form\" *ngIf=\"currentItem\">\n            <!--<span>{{currentItem.id}}</span>-->\n            <div class=\"form-group\">\n                <label >Divice Url: </label> <small>{{deviceUrl}}</small>\n            </div>\n            <div class=\"form-group\">\n                <label>Name</label>\n                <small *ngIf=\"currentItem.id>0\" style=\"margin-left: 15px\">ID: {{currentItem.id}}</small>\n                <input class=\"form-control\" #inpLabel value=\"{{currentItem.label}}\"/>\n            </div>\n            <div class=\"form-group\">\n                <label>Description</label>\n                <textarea class=\"form-control\" #inpDescr value=\"{{currentItem.description}}\"></textarea>\n            </div>\n            <div class=\"form-group\">\n                <label for=\"selectLayout\">Layout</label>\n                <small *ngIf=\"currentLayout.props.id>0\" style=\"margin-left: 15px\">ID: {{currentLayout.props.id}}</small>\n             <select class=\"form-control\"    id=\"selectLayout\"  [(ngModel)]=\"currentLayout\" name=\"mylayout\"> <option *ngFor=\"let label1 of layouts\" [ngValue]=\"label1\">{{label1.props.label}}</option> </select>\n            </div>\n            <div class=\"card-256x320\">\n                <div class=\"mythumb\">\n                    <div class=\"myimage-container\">\n                        <div class=\"myid\" *ngIf=\"currentLayout.props.id>0\"><span>{{currentLayout.props.id}}</span></div>\n                        <img class=\"myimage \" src=\"{{currentLayout.props.image}}\" />\n                    </div>\n                    <div class=\"props\"></div>\n                </div>\n            </div>\n            <div>\n                <a class=\"btn btn-primary saveBatton\" [class.disabled]=\"currentItem.id==0 || isInProgress\" (click)=\"onSaveClick(inpLabel.value, inpDescr.value)\"\n                [ng2-md-tooltip]=\"tooltipOptions\" placement=\"bottom\">\n            <span class=\"fa fa-save\"></span> Save</a>\n            </div>\n            </form>\n</div>\n",
            styles: ["\n        h4{\n            display: inline-block;\n        }\n        .previewUrl{\n            float: right;\n            margin-top: 8px;\n        }\n        .form{\n            padding-top: 7px;\n        }\n        .form-group{\n            margin-bottom: 10px;\n        }\n        .params{\n            padding: 3px 5px 0 9px;\n            height: 60px;\n        }\n        .saveBatton{\n            float:right;\n            margin-top: 15px;\n        }\n        .device-editor{\n            width: 450px;\n            \n        }\n\n"]
        }), 
        __metadata('design:paramtypes', [device_editor_service_1.DeviceEditorService, router_1.ActivatedRoute, router_1.Router, layouts_list_service_1.LayoutsListService])
    ], DeviceEditor);
    return DeviceEditor;
}());
exports.DeviceEditor = DeviceEditor;
//# sourceMappingURL=device-editor.js.map