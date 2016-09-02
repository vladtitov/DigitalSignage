/**
 * Created by Vlad on 7/18/2016.
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
var models_1 = require("../services/models");
var Rx_1 = require("rxjs/Rx");
var PlayListService = (function () {
    function PlayListService(http) {
        this.http = http;
        this.offline = false;
        this.serviceUrl = 'api/';
        // this.dataStore={ listItems:[]};
        this.currentItem = new models_1.VOPlaylist({});
        this.currentItemSubject = new Rx_1.Subject();
        this.currentItem$ = this.currentItemSubject.asObservable();
    }
    Object.defineProperty(PlayListService.prototype, "Id", {
        get: function () {
            return this.currentItem.props.id;
        },
        set: function (id) {
            this.currentItem.props.id = id;
        },
        enumerable: true,
        configurable: true
    });
    PlayListService.prototype.saveData = function (playlist) {
        if (playlist)
            this.currentItem = playlist;
        console.log(this.currentItem);
        //this.saveDataInStorage();
        if (!this.offline)
            this.saveDataOnServer();
    };
    PlayListService.prototype.saveDataInStorage = function () {
        localStorage.setItem('playlist_' + this.Id, JSON.stringify(this.currentItem));
    };
    PlayListService.prototype.saveDataOnServer = function () {
        // console.log(this.currentItem);
        return this.http.post(this.serviceUrl + 'playlists/byid/' + this.Id, this.currentItem)
            .map(function (res) { return new models_1.UpdateResult(res.json().data); })
            .catch(this.handleError);
    };
    PlayListService.prototype.daletePlaylist = function (id) {
        return this.http.delete(this.serviceUrl + 'playlists/byid/' + id)
            .map(function (res) { return new models_1.UpdateResult(res.json().data); })
            .catch(this.handleError);
    };
    PlayListService.prototype.getData = function (playlistid) {
        if (playlistid == -1) {
            this.currentItem = new models_1.VOPlaylist({});
            this.Id = -1;
            this.currentItemSubject.next(this.currentItem);
            return;
        }
        if (playlistid && this.currentItem)
            this.Id = playlistid;
        if (this.offline)
            this.getDataFromCache();
        else
            this.getDataFromServer();
    };
    PlayListService.prototype.getDataFromCache = function () {
        var old = JSON.parse(localStorage.getItem('playlist_' + this.Id));
        if (!old || !old.list)
            old = new models_1.VOPlaylist({});
        this.currentItem = old;
        // this.dataStore.listItems=old.list;
        // this._listItems$.next(this.dataStore.listItems);
    };
    PlayListService.prototype.getDataFromServer = function (id) {
        var _this = this;
        this.http.get(this.serviceUrl + 'playlists/byid/' + this.Id)
            .map(function (body) {
            var data = body.json().data;
            return new models_1.VOPlaylist(data);
        })
            .catch(this.handleError).subscribe(function (result) {
            // console.log(result);
            _this.currentItem = result;
            _this.currentItemSubject.next(_this.currentItem);
        });
    };
    PlayListService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    PlayListService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PlayListService);
    return PlayListService;
}());
exports.PlayListService = PlayListService;
//# sourceMappingURL=playlist-service.js.map