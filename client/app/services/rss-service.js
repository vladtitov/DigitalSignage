/**
 * Created by Dmitriy Prilutsky on 05.07.2016.
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
var models_1 = require("./models");
var RSSItem = (function () {
    function RSSItem(obj) {
        for (var str in obj)
            this[str] = obj[str];
        if (this.id && this.id > RSSItem.count)
            RSSItem.count = this.id;
        if (!this.id)
            this.id = RSSItem.count++;
    }
    RSSItem.count = 0;
    return RSSItem;
}());
exports.RSSItem = RSSItem;
var RSSService = (function () {
    function RSSService(http) {
        this.http = http;
        this.dataUrl = 'api/rss/';
        this.dataUrlA = 'api/assets/';
    }
    RSSService.prototype.getData = function (url) {
        var _this = this;
        return this.http.get(this.dataUrl + encodeURIComponent(url))
            .map(function (data) { return _this.parse(data); })
            .catch(this.handleError);
    };
    RSSService.prototype.saveOnServer = function (str) {
        var item = new models_1.VOAsset({ id: -1, path: str, mime: "rss", thumb: "/clientAssets/uploads/thumbnails/RSS_128x128.png" });
        var body = JSON.stringify(item);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.dataUrlA + "save-asset", body, options)
            .map(this.parseOne)
            .catch(this.handleError);
    };
    RSSService.prototype.parse = function (res) {
        var body = res.json().data;
        var out = [];
        body.forEach(function (item) { out.push(new RSSItem(item)); });
        return out;
    };
    RSSService.prototype.parseOne = function (res) {
        var body = res.json();
        if (!body.data) {
            console.error('data is missing');
        }
        return body.data || {};
    };
    RSSService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    RSSService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], RSSService);
    return RSSService;
}());
exports.RSSService = RSSService;
//# sourceMappingURL=rss-service.js.map