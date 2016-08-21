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
var ViewportService = (function () {
    function ViewportService(http) {
        this.http = http;
        this.selectedItem = new Subject_1.Subject();
        this.viewports = new Subject_1.Subject();
        this.selectedItem$ = this.selectedItem.asObservable();
        this.viewports$ = this.viewports.asObservable();
        this.viewportsUrl = '/serverdata/layout2.json';
    }
    ViewportService.prototype.getViewports = function () {
        var _this = this;
        this.http.get(this.viewportsUrl + '/' + this._selectedItem.id)
            .map(this.parse)
            .catch(this.handleError)
            .subscribe(function (viewports) {
            var body = JSON.parse(localStorage.getItem("myviewports"));
            if (body)
                viewports = body;
            _this._viewports = viewports;
            _this.viewports.next(viewports);
            localStorage.setItem("myviewports", JSON.stringify(viewports));
        });
    };
    ViewportService.prototype.loadDefault = function () {
        var id = Number(localStorage.getItem("myviewport"));
        this.setSelectedById(id);
    };
    ViewportService.prototype.setId = function (id) {
        this.id = id;
    };
    ViewportService.prototype.setSelectedById = function (id) {
        var viewport;
        viewport = this._viewports.find(function (viewport) { return viewport.id === id; });
        this.selectedItem.next(viewport);
    };
    ViewportService.prototype.setSelected = function (viewport) {
        localStorage.setItem("myviewport", "" + viewport.id);
        this.selectedItem.next(viewport);
    };
    ViewportService.prototype.getData = function (id) {
        var viewport;
        var body = JSON.parse(localStorage.getItem("myviewports"));
        viewport = body.find(function (viewport) { return viewport.id === id; });
        this.selectedItem.next(viewport);
    };
    ViewportService.prototype.saveData = function (viewports) {
        localStorage.setItem("myviewports", JSON.stringify(viewports));
    };
    ViewportService.prototype.parse = function (res) {
        var body = res.json().data || [];
        var out = [];
        body.forEach(function (item) {
            out.push(new models_1.VOViewport(item));
        });
        return out;
    };
    ViewportService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    ViewportService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ViewportService);
    return ViewportService;
}());
exports.ViewportService = ViewportService;
//# sourceMappingURL=viewport-service.js.map