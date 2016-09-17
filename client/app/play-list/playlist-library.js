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
var router_1 = require('@angular/router');
var playlists_service_1 = require("../services/playlists-service");
var playlist_service_1 = require("../playlist-editor/playlist-service");
//import {PlayListEditor} from "../playlist-editor/play-list-editor";
var PlayListLibrary = (function () {
    function PlayListLibrary(playlistsService, playlistService, router) {
        this.playlistsService = playlistsService;
        this.playlistService = playlistService;
        this.router = router;
    }
    PlayListLibrary.prototype.ngOnInit = function () {
        var _this = this;
        this.playlistsService.playlists$.subscribe(function (data) { return _this.playlists = data; }, function (error) { return _this.errorMessage = error; });
        this.playlistsService.getPlaylists();
        this.toolsDisadled = true;
    };
    PlayListLibrary.prototype.onPlaylistClick = function (item, myItem) {
        var _this = this;
        if (this.selectedview)
            this.selectedview.selected = false;
        this.selecteditem = item;
        this.playlistid = this.selecteditem.props.id;
        this.selectedview = myItem;
        this.selectedview.selected = true;
        this.toolsDisadled = false;
        this.playlistsService.getUsedLayouts(item.props.id)
            .subscribe(function (res) {
            if (res.usedLayout && res.usedLayout.length) {
                _this.selecteditem.usedLayout = res.usedLayout;
                var labelArr = res.usedLayout.map(function (item) {
                    return item.label;
                });
                _this.layoutsLabels = labelArr.join(', ');
                _this.usedInLayout = true;
            }
            else {
                _this.layoutsLabels = 'no layouts';
                _this.usedInLayout = false;
            }
        });
    };
    PlayListLibrary.prototype.goAddPlaylist = function () {
        var link = ['/playlist-editor/-1'];
        this.router.navigate(link);
    };
    PlayListLibrary.prototype.goEditPlaylist = function () {
        if (this.playlistid) {
            var link = ['/playlist-editor', this.playlistid];
            this.router.navigate(link);
        }
    };
    PlayListLibrary.prototype.deletePlaylist = function () {
        var _this = this;
        this.deleteTooltip = null;
        // console.log('selecteditem', this.selecteditem);
        if (this.playlistid && confirm('Are you want to delete playlist "' + this.selecteditem.props.label + '" ?\n' +
            'Used layouts: ' + this.layoutsLabels)) {
            this.playlistService.daletePlaylist(this.selecteditem.props.id)
                .subscribe(function (res) {
                if (res.changes) {
                    _this.deleteTooltip = { message: 'PlayList deleted from database!', tooltip_class: 'btn-success' };
                    _this.playlistsService.getPlaylists();
                    _this.toolsDisadled = true;
                    if (_this.usedInLayout)
                        alert("resave layout: " + _this.layoutsLabels);
                }
                else
                    _this.deleteTooltip = { tooltip_class: 'btn-danger', message: 'Error to delete playList' };
            }, function (error) {
                _this.deleteTooltip = { message: 'Server error', tooltip_class: 'btn-danger' };
                _this.toolsDisadled = false;
            });
        }
    };
    PlayListLibrary = __decorate([
        core_1.Component({
            selector: 'playlist-library',
            template: "\n<div class=\"content-850\">\n            <div class =\"panel-heading\">\n                <h3>Playlists Manager</h3>\n                <nav>                     \n                     <a class=\"btn btn-default\" (click)=\"goAddPlaylist()\"><span class=\"fa fa-plus\"></span> Create New Playlist</a>\n                     <a class=\"btn btn-default\" (click)=\"goEditPlaylist()\" [class.disabled]=\"toolsDisadled\"><span class=\"fa fa-edit\"></span> Edit Playlist</a>\n                     <a class=\"btn btn-default\" (click)=\"deletePlaylist()\" [class.disabled]=\"toolsDisadled\" [ng2-md-tooltip]=\"deleteTooltip\"><span class=\"fa fa-remove\"></span> Delete Playlist</a>\n                </nav>\n                 <router-outlet></router-outlet>\n            </div>\n            <div class=\"panel-body\">\n                <h4>Playlists</h4>\n                <div class=\"container-scroll\">\n                    <div class=\"scroll-content\"> \n                        <div class=\"item\" *ngFor=\"let item of playlists; let i = index\" layout=\"row\" >\n                           <playlist-simple [playlist]=\"item\" #myItem (click)=\"onPlaylistClick(item, myItem)\"></playlist-simple>\n                        </div>\n                    </div>\n                </div>\n            </div>\n</div>            \n             ",
            styles: ["\n              .container-scroll {\n                width: 870px;\n                height: 425px;\n                overflow-y: scroll;\n                overflow-x: hidden;\n              }\n              \n              .scroll-content {\n                width: 770px;\n              }\n               \n               .item {\n                margin-bottom: 20px;\n               }\n              \n            "],
        }), 
        __metadata('design:paramtypes', [playlists_service_1.PlaylistsService, playlist_service_1.PlayListService, router_1.Router])
    ], PlayListLibrary);
    return PlayListLibrary;
}());
exports.PlayListLibrary = PlayListLibrary;
//# sourceMappingURL=playlist-library.js.map