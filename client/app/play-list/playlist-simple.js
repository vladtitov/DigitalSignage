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
var playlists_service_1 = require("../services/playlists-service");
var PlayListSimple = (function () {
    function PlayListSimple(playlistsService) {
        this.playlistsService = playlistsService;
        this._selected = false;
    }
    Object.defineProperty(PlayListSimple.prototype, "playlist", {
        set: function (item) {
            this.playlistprops = item.props;
            var out = [];
            for (var i = 0; i < 6; i++) {
                var tmp = item.list.length > i ? item.list[i] : {};
                out.push(new models_1.VOPlayLists_Assets(tmp));
            }
            this.playlistlist = out;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(PlayListSimple.prototype, "selected", {
        set: function (jj) {
            this._selected = jj;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', models_1.VOPlaylist), 
        __metadata('design:paramtypes', [models_1.VOPlaylist])
    ], PlayListSimple.prototype, "playlist", null);
    PlayListSimple = __decorate([
        core_1.Component({
            selector: 'playlist-simple',
            template: "\n              <div class=\"title\" [ngClass]=\"{selected: _selected}\">\n              <small style=\"margin-right: 10px\">ID: {{playlistprops.id}};</small>\n                Name: {{playlistprops.label}};\n                Duration: {{playlistprops.duration}};\n                <span *ngIf=\"playlistprops.dimension\">Dimension: {{playlistprops.dimension}};</span>\n                <span *ngIf=\"playlistprops.description\">Description: {{playlistprops.description}};</span>\n              </div>\n              <div class=\"container-scroll\">\n                     <div class=\"scroll-content\">      \n                        <div flex layout=\"row\">\n                          <div class=\"item\"  *ngFor=\"let item of playlistlist; let i = index\" layout=\"row\">\n                               <playlist-frame [item]=\"item\" #myitem ></playlist-frame>  \n                          </div>\n                       \n                     </div>\n                  </div>\n              </div>\n            ",
            styles: ["\n            .container-scroll{\n                width: 100%;\n                display: block;\n                background-color: #e7f1ff;\n            }\n            \n            .scroll-content{\n                background-color: #e7f1ff;\n                width: 100%;\n                display: block;\n                height: 150px;\n                padding-left: 10px;\n            }\n            \n            .title{\n                width: 100%;\n                height: 20px;\n                background-color: #4b7caa;\n                color: white;\n                margin-bottom: 2px;    \n                padding-left: 10px;\n            }              \n    \n            .selected {\n                background-color: #aa861e;\n               }\n            \n            .item {\n                height: 130px;\n                width: 130px;\n                float: left;\n                margin-right: 10px;\n            }\n\n            "],
        }), 
        __metadata('design:paramtypes', [playlists_service_1.PlaylistsService])
    ], PlayListSimple);
    return PlayListSimple;
}());
exports.PlayListSimple = PlayListSimple;
//# sourceMappingURL=playlist-simple.js.map