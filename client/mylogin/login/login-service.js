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
/**
 * Created by админ on 24.08.2016.
 */
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var models_1 = require("../../app/services/models");
var LoginService = (function () {
    function LoginService(http) {
        this.http = http;
        this.dataUrl = 'account/';
        this.loginUrl = 'login';
        this.createUrl = 'new-user-admin';
        this.resetPassUrl = 'reset-password';
        this.changePassUrl = 'change-password';
    }
    LoginService.prototype.loginServer = function (data) {
        // let body = JSON.stringify(data);
        // console.log('body ', body);
        // let headers = new Headers({ 'Content-Type': 'application/json' }); //'application/x-www-form-urlencoded'
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.dataUrl + this.loginUrl, data)
            .map(function (res) { return new models_1.VOUserResult(res.json().data); })
            .catch(this.handleError);
    };
    LoginService.prototype.createAccount = function (data) {
        // let body = JSON.stringify(data);
        // // console.log('body ', body);
        // let headers = new Headers({ 'Content-Type': 'application/json' }); //'application/x-www-form-urlencoded'
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.dataUrl + this.createUrl, data)
            .map(function (res) {
            console.log('create account', res.json());
            return new models_1.VOUserResult(res.json().data);
        })
            .catch(this.handleError);
    };
    LoginService.prototype.resetPassword = function (data) {
        // let body = JSON.stringify(data);
        // // console.log('body ', body);
        // let headers = new Headers({ 'Content-Type': 'application/json' }); //'application/x-www-form-urlencoded'
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.dataUrl + this.resetPassUrl, data)
            .map(this.parseOne)
            .catch(this.handleError);
    };
    LoginService.prototype.changePassword = function (data) {
        // let body = JSON.stringify(data);
        // // console.log('body ', body);
        // let headers = new Headers({ 'Content-Type': 'application/json' }); //'application/x-www-form-urlencoded'
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.dataUrl + this.changePassUrl, data)
            .map(function (res) { return new models_1.UpdateResult(res.json().data); })
            .catch(this.handleError);
    };
    LoginService.prototype.parseOne = function (res) {
        var body = res.json();
        if (!body.data) {
        }
        return body.data || {};
    };
    LoginService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        // console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    LoginService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
//# sourceMappingURL=login-service.js.map