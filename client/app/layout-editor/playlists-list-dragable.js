/**
 * Created by Dmitriy Prilutsky on 20.07.2016.
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
var router_1 = require('@angular/router');
var playlists_service_1 = require("../services/playlists-service");
var drag_playlist_service_1 = require("./drag-playlist-service");
var AssemblerPlayLists = (function () {
    function AssemblerPlayLists(ar, myrouter, playlistService, dragService) {
        this.ar = ar;
        this.myrouter = myrouter;
        this.playlistService = playlistService;
        this.dragService = dragService;
        this.playlists = [];
    }
    AssemblerPlayLists.prototype.ngOnInit = function () {
        var _this = this;
        this.playlistService.playlists$.subscribe(function (data) { return _this.playlists = data; }, function (error) { return _this.errorMessage = error; });
        this.playlistService.getPlaylists();
    };
    AssemblerPlayLists.prototype.onDragEnd = function (item) {
        // console.log(this.dragService.onDragEnd);
        if (this.dragService.onDragEnd)
            this.dragService.onDragEnd(item);
        //this.dragService.emitDragEnd.emit(item);
    };
    AssemblerPlayLists.prototype.onDragStart = function (item) {
        this.isMove = false;
        this.dragItem = item;
        this.dragService.item = item;
    };
    AssemblerPlayLists.prototype.onPlaylistClick = function (playlist) {
        this.playlistService.setSelected(playlist);
        /*     this.layoutService.setSelectedById(1, this.layouts);
             console.log(this.layout)*/
        /*let link = ['/layout-assembler/', layout.id];
        this.myrouter.navigate(link);*/
    };
    AssemblerPlayLists = __decorate([
        core_1.Component({
            selector: 'playlists-list-dragable',
            template: "\n<div>\n                <h4>Playlists</h4>\n                 <div class=\"slider-horizont\">\n                     <!--<div class=\"mycontent\" >-->\n                        <div layout=\"row\" class=\"playlists\">\n                            <div  class=\"thumb-128-2\" *ngFor=\"let playlist of playlists\" \n                            (dragstart)=\"onDragStart(playlist)\"\n                            (dragend)=\"onDragEnd(playlist)\">\n                                <div class=\"image-container-128-2\">\n                                    <div class=\"myid\"><span>{{playlist.props.id}}</span></div>\n                                    <img src=\"{{ playlist.props.image}}\">\n                                    <div class=\"thumb-label\">\n                                        {{ playlist.props.label}}\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                      <!--</div>-->\n                 </div>\n</div>\n              ",
            styles: ["\n\n            .slider-horizont{\n                width: 100%;\n                overflow-x: scroll;\n                display: block;\n                background-color: whitesmoke;\n                padding: 7px;\n            }\n            /*.mycontent{*/\n            /*background-color: #e7f1ff;*/\n            /*width: 100%;*/\n            /*display: block;*/\n            /*}*/\n               /*.playlists {*/\n                 /*height: 150px;*/\n                 /*!*border: 1px solid #ddd;*!*/\n                 /*padding: 7px;*/\n               /*} */\n            "]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, playlists_service_1.PlaylistsService, drag_playlist_service_1.DragPlayListService])
    ], AssemblerPlayLists);
    return AssemblerPlayLists;
}());
exports.AssemblerPlayLists = AssemblerPlayLists;
//# sourceMappingURL=playlists-list-dragable.js.map