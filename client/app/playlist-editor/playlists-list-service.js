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
var PlayListsListService = (function () {
    function PlayListsListService(http) {
        this.http = http;
        this.offline = false;
        this.serviceUrl = 'api/playlists/byid/';
        this._listItems$ = new Rx_1.Subject();
        this.dataStore = { listItems: [] };
        this.currentItem = new models_1.VOPlaylist({});
        this.currentItemSubject = new Rx_1.Subject();
        this.currentItem$ = this.currentItemSubject.asObservable();
    }
    Object.defineProperty(PlayListsListService.prototype, "Id", {
        get: function () {
            return this.currentItem.props.id;
        },
        set: function (id) {
            this.currentItem.props.id = id;
        },
        enumerable: true,
        configurable: true
    });
    PlayListsListService.prototype.saveData = function (playlist) {
        if (playlist)
            this.currentItem = playlist;
        console.log(this.currentItem);
        this.saveDataInStorage();
        if (!this.offline)
            this.saveDataOnServer();
    };
    PlayListsListService.prototype.saveDataInStorage = function () {
        localStorage.setItem('playlist_' + this.Id, JSON.stringify(this.currentItem));
    };
    PlayListsListService.prototype.saveDataOnServer = function () {
        var _this = this;
        this.http.post(this.serviceUrl + this.Id, this.currentItem)
            .map(function (res) { return res.json().data; })
            .catch(this.handleError).subscribe(function (result) {
            if (result.insertId) {
                _this.Id = result.insertId;
            }
            _this.loadDataFromServer();
        });
    };
    PlayListsListService.prototype.daletePlaylist = function () {
        var _this = this;
        this.http.get(this.serviceUrl + "delete/" + this.Id)
            .map(function (body) {
            return body.json().data;
        })
            .catch(this.handleError).subscribe(function (result) {
            _this.currentItem = new models_1.VOPlaylist({});
            _this.currentItemSubject.next(_this.currentItem);
        });
        localStorage.removeItem('playlist_' + this.Id);
    };
    PlayListsListService.prototype.getData = function (playlistid) {
        if (playlistid && this.currentItem)
            this.Id = playlistid;
        if (this.Id == -1) {
            this.currentItem = new models_1.VOPlaylist({});
            this.currentItemSubject.next(this.currentItem);
            return;
        }
        if (this.offline)
            this.getDataFromCache();
        else
            this.loadDataFromServer();
    };
    PlayListsListService.prototype.getDataFromCache = function () {
        var old = JSON.parse(localStorage.getItem('playlist_' + this.Id));
        if (!old || !old.list)
            old = new models_1.VOPlaylist({});
        this.currentItem = old;
        this.dataStore.listItems = old.list;
        this._listItems$.next(this.dataStore.listItems);
    };
    PlayListsListService.prototype.loadDataFromServer = function () {
        var _this = this;
        console.log(this.serviceUrl + this.Id);
        this.http.get(this.serviceUrl + this.Id)
            .map(function (body) {
            var data = body.json().data;
            return new models_1.VOPlaylist(data);
        })
            .catch(this.handleError).subscribe(function (result) {
            console.log(result);
            _this.currentItem = result;
            _this.currentItemSubject.next(_this.currentItem);
        });
    };
    PlayListsListService.prototype.insertAt = function (item, ind) {
        this.dataStore.listItems.splice(ind, 0, item);
        this._listItems$.next(this.dataStore.listItems);
        return true;
    };
    PlayListsListService.prototype.insertItemBefore = function (subj, rel) {
        var ind = this.dataStore.listItems.indexOf(rel);
        return this.insertAt(subj, ind);
    };
    PlayListsListService.prototype.insertItemAfter = function (subj, rel) {
        var ind = this.dataStore.listItems.indexOf(rel);
        return this.insertAt(subj, ind);
    };
    PlayListsListService.prototype.insertItem = function (item, afterId) {
        this.dataStore.listItems.push(item);
        this._listItems$.next(this.dataStore.listItems);
        // let body = JSON.stringify({ name });
        /*let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        var itm:PlayListItemVO = new PlayListItemVO(item);

        let body = JSON.stringify({
            "assetId": itm.assetId,
            "duration": item.duration,
            "afterId": afterId,
            "listId": this.listId
        });*/
        /* var playListInsert = this.http.post(this.playListUrl+"/insert-content", body, options)
             .map(this.parseOne)
             .catch(this.handleError);
 
         playListInsert.subscribe(items => {
             console.log(items.data[0])
             let item = items.data[0];
             this.dataStore.listItems.push(item);
             this._listItems$.next(this.dataStore.listItems);
         });*/
    };
    PlayListsListService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    PlayListsListService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PlayListsListService);
    return PlayListsListService;
}());
exports.PlayListsListService = PlayListsListService;
//# sourceMappingURL=playlists-list-service.js.map