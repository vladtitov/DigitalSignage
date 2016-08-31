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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var Subject_1 = require('rxjs/Subject');
var models_1 = require("./models");
var PlaylistsService = (function () {
    function PlaylistsService(http) {
        this.http = http;
        this.selectedItem = new Subject_1.Subject();
        this.playlists = new Subject_1.Subject();
        this.selectedItem$ = this.selectedItem.asObservable();
        this.playlists$ = this.playlists.asObservable();
        this.serviceUrl = '/api/playlists';
    }
    PlaylistsService.prototype.getPlaylists = function () {
        var _this = this;
        this.http.get(this.serviceUrl + "/all")
            .map(this.parseAll)
            .catch(this.handleError)
            .subscribe(function (playlists) {
            _this._playlists = playlists;
            _this.playlists.next(playlists);
            _this.loadDefault();
            localStorage.setItem("myplaylists", JSON.stringify(playlists));
        });
    };
    PlaylistsService.prototype.getUsedLayouts = function (id) {
        return this.http.get(this.serviceUrl + "/used/" + id)
            .map(function (body) {
            var data = body.json().data;
            return new models_1.VOPlaylist({ usedLayout: data });
        })
            .catch(this.handleError);
    };
    PlaylistsService.prototype.loadDefault = function () {
        var id = +localStorage.getItem("myplaylist");
        this.setSelectedById(id);
    };
    PlaylistsService.prototype.setId = function (id) {
        this.id = id;
    };
    PlaylistsService.prototype.setSelectedById = function (id) {
        var playlist;
        playlist = this._playlists.find(function (playlist) { return playlist.props.id === +id; });
        this.selectedItem.next(playlist);
    };
    PlaylistsService.prototype.setSelected = function (playlist) {
        localStorage.setItem("myplaylist", "" + playlist.props.id);
        this.selectedItem.next(playlist);
    };
    PlaylistsService.prototype.getSelected = function () {
        return localStorage.getItem("myplaylist");
    };
    PlaylistsService.prototype.savePlaylist = function (id) {
        localStorage.setItem("myplaylist", "" + id);
    };
    PlaylistsService.prototype.parseAll = function (res) {
        var body = res.json().data || [];
        // console.log('body ', body);
        var playlistOBJ = {};
        var addItem = function (item) {
            if (!playlistOBJ[item.playlist_id])
                playlistOBJ[item.playlist_id] = new models_1.VOPlaylist({ props: item });
        };
        var out = [];
        body.forEach(function (item) {
            out.push(new models_1.VOPlaylist(item));
        });
        return out;
    };
    PlaylistsService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    PlaylistsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PlaylistsService);
    return PlaylistsService;
}());
exports.PlaylistsService = PlaylistsService;
//# sourceMappingURL=playlists-service.js.map