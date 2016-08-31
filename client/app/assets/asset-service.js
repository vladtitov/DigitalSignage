/**
 * Created by Dmitriy Prilutsky on 28.07.2016.
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
var core_1 = require("@angular/core");
var models_1 = require("../services/models");
var http_1 = require("@angular/http");
var Observable_1 = require('rxjs/Observable');
var Rx_1 = require("rxjs/Rx");
var AssetService = (function () {
    function AssetService(http) {
        this.http = http;
        this.assetsSubject = new Rx_1.Subject();
        this.assets$ = this.assetsSubject.asObservable();
        this.selectedAssetSubject = new Rx_1.Subject(); // дает Observable-у событие
        this.selectedAsset$ = this.selectedAssetSubject.asObservable(); // Observable
        this.serverUrl = "api/"; //  /server/assets/manager
    }
    AssetService.prototype.selectAsset = function (asset) {
        if (this.selectedAsset)
            this.selectedAsset.selected = false;
        this.selectedAsset = asset;
        this.selectedAsset.selected = true;
        this.selectedAssetSubject.next(asset);
        console.log('selectAsset ', asset.label);
    };
    AssetService.prototype.getAssets = function () {
        var _this = this;
        this.http.get(this.serverUrl + 'assets/select-all')
            .map(function (res) {
            var out = [];
            var ar = res.json().data;
            ar.forEach(function (item) {
                out.push(new models_1.VOAsset(item));
            });
            return out;
        })
            .catch(this.handleError)
            .subscribe(function (assets) {
            _this.assets = assets;
            _this.assetsSubject.next(_this.assets);
        });
    };
    AssetService.prototype.saveItem = function (asset) {
        // console.log('asset ', asset);
        // console.log('selectedAsset ', this.selectedAsset);
        this.selectedAssetSubject.next(asset);
        var newasset = new models_1.VOAsset(asset);
        delete newasset.selected;
        delete newasset.usedPlayList;
        return this.http.post(this.serverUrl + "assets/byid/" + asset.id, newasset)
            .map(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    AssetService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    AssetService.prototype.getItemById = function (id) {
        // return this.selectedAsset$;
        return this.http.get(this.serverUrl + "assets/byid/" + id)
            .map(function (res) { return new models_1.VOAsset(res.json().data); })
            .catch(this.handleError);
    };
    AssetService.prototype.getUsedPlayList = function (asset) {
        var asset_id = asset.id;
        return this.http.get(this.serverUrl + 'assets/used-playlist/' + asset_id)
            .map(function (res) {
            var data = res.json().data;
            return new models_1.VOAsset({ usedPlayList: data });
        })
            .catch(this.handleError);
    };
    AssetService.prototype.deleteAssetById = function (id) {
        // console.log(this.serviceUrl+'/'+id);
        return this.http.delete(this.serverUrl + 'assets/byid/' + id)
            .map(function (res) {
            return new models_1.UpdateResult(res.json().data);
        })
            .catch(this.handleError);
    };
    AssetService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AssetService);
    return AssetService;
}());
exports.AssetService = AssetService;
//# sourceMappingURL=asset-service.js.map