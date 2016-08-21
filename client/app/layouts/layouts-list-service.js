/**
 * Created by Dmitriy Prilutsky on 15.07.2016.
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
var models_1 = require("../services/models");
var LayoutsListService = (function () {
    function LayoutsListService(http) {
        this.http = http;
        this.selectedSabject = new Subject_1.Subject();
        this.layoutsSubject = new Subject_1.Subject();
        this.selectedItem$ = this.selectedSabject.asObservable();
        this.layouts$ = this.layoutsSubject.asObservable();
        this.serviceUrl = '/api/layouts/assembled-all';
    }
    LayoutsListService.prototype.getLayouts = function () {
        var _this = this;
        this.http.get(this.serviceUrl)
            .map(function (res) {
            var out = [];
            var ar = res.json().data;
            ar.forEach(function (item) {
                out.push(new models_1.VOLayout(item));
            });
            return out;
        })
            .catch(this.handleError)
            .subscribe(function (layouts) {
            _this.layouts = layouts;
            _this.layoutsSubject.next(_this.layouts);
            // localStorage.setItem("mylayouts", JSON.stringify(layouts))
        });
    };
    LayoutsListService.prototype.getLayouts2 = function () {
        return this.http.get(this.serviceUrl)
            .map(function (res) {
            var out = [];
            var ar = res.json().data;
            ar.forEach(function (item) {
                out.push(new models_1.VOLayout(item));
            });
            return out;
        })
            .catch(this.handleError);
    };
    LayoutsListService.prototype.loadDefault = function () {
        var id = +localStorage.getItem("mylayout");
        this.setSelectedById(id);
    };
    LayoutsListService.prototype.setSelectedById = function (id) {
        this.selectedItem = this.layouts.find(function (layout) { return layout.id === +id; });
        this.selectedSabject.next(this.selectedItem);
    };
    LayoutsListService.prototype.setSelected = function (layout) {
        // localStorage.setItem("mylayout", "" + layout.id);
        this.selectedItem = layout;
        this.selectedSabject.next(layout);
    };
    LayoutsListService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        //console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    LayoutsListService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], LayoutsListService);
    return LayoutsListService;
}());
exports.LayoutsListService = LayoutsListService;
//# sourceMappingURL=layouts-list-service.js.map