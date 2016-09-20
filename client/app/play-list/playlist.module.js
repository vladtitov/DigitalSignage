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
var playlist_library_1 = require("./playlist-library");
var playlist_simple_1 = require("./playlist-simple");
var playlist_frame_1 = require("./playlist-frame");
var playlist_editor_1 = require("../playlist-editor/playlist-editor");
var playlist_editable_1 = require("../playlist-editor/playlist-editable");
var TimeCell_1 = require("../playlist-editor/TimeCell");
var playlist_editable_item_1 = require("../playlist-editor/playlist-editable-item");
var playlist_service_1 = require("../playlist-editor/playlist-service");
var playlists_service_1 = require("../services/playlists-service");
var assets_service_1 = require("../services/assets-service");
var PlaylistModule = (function () {
    function PlaylistModule() {
    }
    PlaylistModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, shared_module_1.SharedModule, router_1.RouterModule],
            declarations: [
                playlist_library_1.PlayListLibrary,
                playlist_simple_1.PlayListSimple,
                playlist_frame_1.PlayListFrame,
                playlist_editor_1.PlayListEditor,
                playlist_editable_1.PlaylistEditable,
                TimeCell_1.TimeCellCompnent,
                playlist_editable_item_1.PlayListItem
            ],
            providers: [playlist_service_1.PlayListService, playlists_service_1.PlaylistsService, assets_service_1.AssetsService]
        }), 
        __metadata('design:paramtypes', [])
    ], PlaylistModule);
    return PlaylistModule;
}());
exports.PlaylistModule = PlaylistModule;
//# sourceMappingURL=playlist.module.js.map