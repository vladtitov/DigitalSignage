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
var router_1 = require('@angular/router');
var login_service_1 = require("./login-service");
var ResetPassword = (function () {
    function ResetPassword(router, loginService) {
        this.router = router;
        this.loginService = loginService;
        this.message = false;
        this.errorMessage = false;
        console.log('hello restore-password');
    }
    ResetPassword.prototype.back = function () {
        this.router.navigate(["./sign-in"]);
    };
    ResetPassword.prototype.onSubmit = function (value) {
        var _this = this;
        console.log('onSubmit ', value);
        this.loginService.resetPassword(value).subscribe(function (res) {
            console.log('res ', res);
            _this.message = true;
        }, function (err) {
            console.log('error ', err);
            _this.errorMessage = true;
            _this.handleError(err); // = <any>err;
        });
    };
    ResetPassword.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return errMsg;
    };
    ResetPassword = __decorate([
        core_1.Component({
            selector: 'reset-password',
            template: "\n<div>\n            \n<!--<a [routerLink]=\"['./sign-in']\" class=\"btn\"><span class=\"fa fa-user-plus\"></span> Back</a>-->\n\n           <div class=\"loginform\">\n                <div class=\"logo\">\n                    <img src=\"../../images/hero.png\" alt=\"\">\n                </div>\n                \n                <div class=\"content\">\n                    <div class=\"panel\" id=\"login\">\n                        <h3>Reset Password</h3>\n                        <hr>\n                        <div *ngIf=\"errorMessage || message\">\n                            <h5 *ngIf=\"errorMessage\" [class.errorMessage]=\"errorMessage\"> Wrong email </h5>\n                            <h5 *ngIf=\"message\" [class.message]=\"message\"> Please check your email </h5>\n                            <hr>\n                        </div>\n                        <form (ngSubmit)=\"onSubmit(loginForm.value)\" #loginForm=\"ngForm\">                \n                            <div class=\"form-group\">\n                                <md-input \n                                    placeholder=\"Email address\" \n                                    name=\"username\" \n                                    ngModel \n                                    required\n                                    type=\"email\" \n                                    style=\"width: 100%\">\n                                </md-input>\n                            </div>\n                            <button class=\"btn btn-primary btn-lg btn-block\" type=\"submit\" value=\"Reset Password\"><span class=\"fa fa-unlock-alt\"></span>Reset Password</button>\n                        </form>\n                        <a class=\"panel-footer\" (click)=\"back()\"><span class=\"fa fa-arrow-left\"></span>Back</a>\n                    </div>\n                </div>\n                \n            </div>\n\n\n</div>",
            styles: ["\n    \n    "]
        }), 
        __metadata('design:paramtypes', [router_1.Router, login_service_1.LoginService])
    ], ResetPassword);
    return ResetPassword;
}());
exports.ResetPassword = ResetPassword;
//# sourceMappingURL=reset-password.js.map