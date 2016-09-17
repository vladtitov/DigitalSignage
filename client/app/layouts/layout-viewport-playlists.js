/**
 * Created by Dmitriy Prilutsky on 22.07.2016.
 */
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
var core_1 = require('@angular/core');
var playlists_service_1 = require("../services/playlists-service");
var LayoutViewportPlaylists = (function () {
    function LayoutViewportPlaylists(playlistService) {
        this.playlistService = playlistService;
    }
    LayoutViewportPlaylists.prototype.ngOnInit = function () {
        /* this.viewportService.selectedItem$.subscribe(
             data => this.viewport = data,
             error =>  this.errorMessage = <any>error
             );
         let params = this.utils.getUrlParams();
         if(params && params.viewport) {
             this.viewportService.getData(params.viewport);
             this.playlistService.playlists$.subscribe(
                 (data) => {
                     this.playlists = data;
                  },
                 error =>  this.errorMessage = <any>error
 
             );*/
        /*this.playlistService.selectedItem$.subscribe(
            (data) => {
                this.playlist = data
            },
            error =>  this.errorMessage = <any>error
        );*/
        //this.playlistService.savePlaylist(this.viewport.playlistid);
        // this.playlistService.getPlaylists();
        // }
    };
    LayoutViewportPlaylists.prototype.ngOnDestroy = function () {
        //this.paramsSub.unsubscribe();
    };
    LayoutViewportPlaylists = __decorate([
        core_1.Component({
            selector: 'layout-viewport-playlists',
            template: "\n                <div class=\"layout-viewport-playlists\">\n                    <h5>TEST </h5>\n                     <div class=\"playlist\" *ngFor=\"let playlist of playlists\">\n                          <div class=\"playlistitem\" *ngFor=\"let item of playlist.list\">\n                                <img src=\"{{ item.asset.path }}\" width=\"100px\">\n                          </div>\n                    </div>\n               </div>\n      \n              ",
            styles: ["\n              .playlistitem {\n                float:left;\n              }  \n              "]
        }), 
        __metadata('design:paramtypes', [playlists_service_1.PlaylistsService])
    ], LayoutViewportPlaylists);
    return LayoutViewportPlaylists;
}());
exports.LayoutViewportPlaylists = LayoutViewportPlaylists;
//# sourceMappingURL=layout-viewport-playlists.js.map