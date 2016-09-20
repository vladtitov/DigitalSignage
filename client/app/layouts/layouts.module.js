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
var router_1 = require('@angular/router');
var shared_module_1 = require("../shared/shared.module");
var layouts_assembled_1 = require("./layouts-assembled");
var layouts_list_cards_1 = require("./layouts-list-cards");
var layout_thumb_1 = require("./layout-thumb");
var layouts_template_1 = require("./layouts-template");
var layout_editor_1 = require("../layout-editor/layout-editor");
var layouts_template_list_1 = require("./layouts-template-list");
var playlists_list_dragable_1 = require("../layout-editor/playlists-list-dragable");
var layout_editor_viewport_1 = require("../layout-editor/layout-editor-viewport");
var layout_editor_service_1 = require("../layout-editor/layout-editor-service");
var device_editor_service_1 = require("../device/device-editor-service");
var layouts_list_service_1 = require("./layouts-list-service");
var layouts_templates_service_1 = require("../services/layouts-templates-service");
var drag_playlist_service_1 = require("../layout-editor/drag-playlist-service");
var LayoutsModule = (function () {
    function LayoutsModule() {
    }
    LayoutsModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, shared_module_1.SharedModule, router_1.RouterModule],
            declarations: [
                layouts_assembled_1.LayoutsAssembled,
                layouts_list_cards_1.LayoutsListCards,
                layout_thumb_1.LayoutThumb,
                layouts_template_1.LayoutsTemplate,
                layout_editor_1.LayoutEditor,
                layouts_template_list_1.LayoutsTemplateList,
                playlists_list_dragable_1.AssemblerPlayLists,
                layout_editor_viewport_1.LayoutEditorViewport
            ],
            providers: [
                layout_editor_service_1.LayoutEditorService,
                layouts_list_service_1.LayoutsListService,
                device_editor_service_1.DeviceEditorService,
                layouts_templates_service_1.LayoutsTemlatesService,
                drag_playlist_service_1.DragPlayListService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], LayoutsModule);
    return LayoutsModule;
}());
exports.LayoutsModule = LayoutsModule;
//# sourceMappingURL=layouts.module.js.map