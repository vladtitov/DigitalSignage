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
var models_1 = require("../services/models");
var LayoutEditorService = (function () {
    function LayoutEditorService(http) {
        this.http = http;
        this.currentSubject = new Subject_1.Subject();
        this.currentItem$ = this.currentSubject.asObservable();
        this.serviceUrl = '/api/layouts/byid';
    }
    LayoutEditorService.prototype.deleteLayoutById = function (id) {
        // console.log(this.serviceUrl+'/'+id);
        return this.http.delete(this.serviceUrl + '/' + id)
            .map(function (res) {
            return new models_1.UpdateResult(res.json().data);
        })
            .catch(this.handleError);
    };
    LayoutEditorService.prototype.setLayout = function (item) {
        this.currentItem = item;
        this.currentSubject.next(this.currentItem);
    };
    LayoutEditorService.prototype.getLayoutById = function (id) {
        var _this = this;
        if (!id)
            id = this.currentItem ? this.currentItem.props.id : -1;
        this.http.get(this.serviceUrl + '/' + id)
            .map(function (res) {
            return new models_1.VOLayout(res.json().data);
        })
            .catch(this.handleError).
            subscribe(function (data) {
            _this.currentItem = data;
            _this.currentSubject.next(_this.currentItem);
        });
    };
    LayoutEditorService.prototype.getLayoutById2 = function (id) {
        return this.http.get(this.serviceUrl + '/' + id)
            .map(function (res) {
            return new models_1.VOLayout(res.json().data);
        })
            .catch(this.handleError);
    };
    LayoutEditorService.prototype.loadDefault = function () {
        var id = localStorage.getItem("myviewport");
        // this.setSelectedById(id);
    };
    LayoutEditorService.prototype.saveOnServer = function (layout) {
        if (layout)
            this.currentItem = layout;
        var id = this.currentItem ? this.currentItem.props.id : -1;
        layout = new models_1.VOLayout(this.currentItem);
        return this.http.post(this.serviceUrl + '/' + id, layout)
            .map(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    LayoutEditorService.prototype.setId = function (id) {
        this.currentItem.props.id = id;
    };
    LayoutEditorService.prototype.saveData = function (viewports) {
        localStorage.setItem("myviewports", JSON.stringify(viewports));
    };
    LayoutEditorService.prototype.parse = function (res) {
        var body = res.json().data || {};
        return new models_1.VOPlaylist(body);
    };
    LayoutEditorService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    LayoutEditorService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], LayoutEditorService);
    return LayoutEditorService;
}());
exports.LayoutEditorService = LayoutEditorService;
//# sourceMappingURL=layout-editor-service.js.map