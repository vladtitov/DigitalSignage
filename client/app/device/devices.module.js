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
 * Created by админ on 16.09.2016.
 */
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var devices_routing_1 = require("./devices.routing");
var devices_manager_1 = require("./devices-manager");
var device_editor_service_1 = require("./device-editor-service");
var devices_list_1 = require("./devices-list");
var device_list_service_1 = require("./device-list-service");
var device_editor_1 = require("./device-editor");
var layouts_list_service_1 = require("../layouts/layouts-list-service");
var device_list_item_1 = require("./device-list-item");
var layout_editor_service_1 = require("../layout-editor/layout-editor-service");
var shared_module_1 = require("../shared/shared.module");
var DevicesModule = (function () {
    function DevicesModule() {
    }
    DevicesModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, devices_routing_1.routing, shared_module_1.SharedModule],
            declarations: [
                devices_manager_1.DevicesManager,
                devices_list_1.DevicesList,
                device_editor_1.DeviceEditor,
                device_list_item_1.DeviceListItem
            ],
            providers: [
                device_editor_service_1.DeviceEditorService,
                device_list_service_1.DeviceListService,
                device_editor_service_1.DeviceEditorService,
                layouts_list_service_1.LayoutsListService,
                layout_editor_service_1.LayoutEditorService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], DevicesModule);
    return DevicesModule;
}());
exports.DevicesModule = DevicesModule;
//# sourceMappingURL=devices.module.js.map