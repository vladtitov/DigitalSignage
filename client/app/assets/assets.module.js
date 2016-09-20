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
var content_manager_1 = require("./content-manager");
var asset_library_1 = require("./asset-library");
var asset_editor_1 = require("./asset-editor");
var content_add_1 = require("../content-add/content-add");
var content_files_1 = require("../content-add/content-files");
var ng_file_select_1 = require("../content-add/uploader/src/directives/ng-file-select");
var ng_file_drop_1 = require("../content-add/uploader/src/directives/ng-file-drop");
var asset_service_1 = require("./asset-service");
var AssetsModule = (function () {
    function AssetsModule() {
    }
    AssetsModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, shared_module_1.SharedModule, router_1.RouterModule],
            declarations: [
                content_manager_1.ContentManager,
                asset_library_1.AssetLibrary,
                asset_editor_1.AssetEditor,
                content_add_1.AddContent,
                content_files_1.FileContent,
                ng_file_select_1.NgFileSelect,
                ng_file_drop_1.NgFileDrop
            ],
            providers: [asset_service_1.AssetService],
        }), 
        __metadata('design:paramtypes', [])
    ], AssetsModule);
    return AssetsModule;
}());
exports.AssetsModule = AssetsModule;
//# sourceMappingURL=assets.module.js.map