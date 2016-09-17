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
require('./rxjs-operators');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var AppComponent = (function () {
    function AppComponent(http) {
        this.http = http;
        this.dataUrl = 'account/';
        this.logoutUrl = 'logout';
    }
    AppComponent.prototype.ngOnInit = function () {
        $('#PRELOADER').remove();
    };
    AppComponent.prototype.logoutServer = function () {
        var _this = this;
        // let body = JSON.stringify(data);
        // console.log('body ', body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); //'application/x-www-form-urlencoded'
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(this.dataUrl + this.logoutUrl)
            .map(this.parseOne)
            .catch(this.handleError)
            .subscribe(function (res) {
            console.log('onSubmit res: ', res);
            // this.router.navigate(["./dashboard/content-manager",'view',0]);
            localStorage.removeItem("myuser");
            window.location.href = "/login";
        }, function (err) {
            console.log('onSubmit error ', err);
            _this.handleError(err); // = <any>err;
        });
    };
    AppComponent.prototype.parseOne = function (res) {
        var body = res.json();
        if (!body.data) {
            console.error('data is missing');
        }
        return body.data || {};
    };
    AppComponent.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "    \n    <nav>     \n     <a [routerLink]=\"['./content-manager','view',0]\" class=\"btn\"><span class=\"fa fa-picture-o\"></span> Content</a>\n     <a [routerLink]=\"['./playlist-library']\" class=\"btn\"><span class=\"fa fa-film\"></span> Playlists library</a>\n     <a [routerLink]=\"['./layouts-assembled']\" class=\"btn\"><span class=\"fa fa-th-large\"></span> Layouts</a>\n     <a [routerLink]=\"['./layout-template',-1]\" class=\"btn\"><span class=\"fa fa-magic\"></span> New Layout</a>  \n     <a [routerLink]=\"['./devices-manager', 0]\" class=\"btn\"><span class=\"fa fa-desktop\"></span> Publish</a>\n     <a  (click)=\"logoutServer()\" class=\"btn\" style=\"float: right\"><span class=\"fa fa-sign-out\"></span> Sign Out</a>\n   \n     \n    </nav>\n    <router-outlet></router-outlet>\n  ",
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map