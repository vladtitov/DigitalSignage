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
// import {MATERIAL_DIRECTIVES} from 'ng2-material';
// import {FORM_DIRECTIVES} from '@angular/forms';
// import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
// import { MD_TABS_DIRECTIVES } from '@angular2-material/tabs';
// import {MATERIAL_DIRECTIVES} from "ng2-material/index";
// import {MdToolbar} from '@angular2-material/toolbar';
var router_1 = require('@angular/router');
var login_service_1 = require("./login-service");
var SignIn = (function () {
    function SignIn(router, loginService) {
        this.router = router;
        this.loginService = loginService;
        this.cursorStyle = 'pointer';
        this.urlLogin = 'account/login';
        this.inputPass = 'inputPass';
        this.showPass = false;
        this.wrongMessage = false;
        this.hrefDisadled = false;
        this.toolsDisadled = false;
    }
    SignIn.prototype.ngOnInit = function () {
        var _this = this;
        this.hrefDisadled = true;
        setTimeout(function () { _this.hrefDisadled = false; }, 100);
        if (localStorage.getItem('email')) {
            this.userEmail = localStorage.getItem('email');
            localStorage.removeItem('email');
        }
    };
    SignIn.prototype.newUser = function () {
        this.router.navigate(["./new-user"]);
    };
    SignIn.prototype.resetPass = function () {
        this.router.navigate(["./reset-password"]);
    };
    SignIn.prototype.onSubmit = function (value) {
        var _this = this;
        // console.log('onSubmit ', value);
        this.toolsDisadled = true;
        setTimeout(function () { _this.toolsDisadled = false; }, 1000);
        this.loginService.loginServer(value).subscribe(function (res) {
            // console.log('res ', res.result);
            if (res.result == 'logedin') {
                _this.wrongMessage = false;
                localStorage.setItem('myuser', JSON.stringify(res));
                window.location.href = "/";
            }
            else {
                _this.wrongMessage = true;
            }
        }, function (err) {
            // console.log('onSubmit error ', err);
            _this.handleError(err); // = <any>err;
        });
    };
    SignIn.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        // console.error(errMsg);
        return errMsg;
    };
    SignIn = __decorate([
        core_1.Component({
            selector: 'sign-in',
            template: "\n<div>\n\n            <!--<a [routerLink]=\"['./sign-in']\" class=\"btn\"><span class=\"fa fa-user\"></span> Sign In</a>-->\n            <!--<a [routerLink]=\"['./new-user']\" class=\"btn\"><span class=\"fa fa-user-plus\"></span> Create Account</a>-->\n            <!--<a [routerLink]=\"['./restore-password']\" class=\"btn\"><span class=\"fa fa-unlock-alt\"></span> Restore Password</a>-->\n\n\n            <div class=\"loginform\">\n                <div class=\"logo\">\n                    <img src=\"../../images/hero.png\" alt=\"\">\n                </div>\n                \n                <div class=\"content\">\n                    <div class=\"panel\" id=\"login\">\n                        <h3>Sign in to your account</h3>\n                        <hr>                                        \n                        <div *ngIf=\"wrongMessage\" class=\"errorMessage\">\n                            <h5> Incorrect username or password </h5>\n                            <hr>\n                        </div>\n                        <!--<form action=\"account/login\" method=\"post\" role=\"form\" #loginForm=\"ngForm\">-->\n                        <form (ngSubmit)=\"onSubmit(loginForm.value)\" #loginForm=\"ngForm\">                \n                            <div class=\"form-group\">\n                                <input \n                                    placeholder=\"Email address\" \n                                    name=\"username\" \n                                    [(ngModel)] = \"userEmail\"\n                                    required\n                                    type=\"email\"\n                                    style=\"width: 100%\"/>\n                            </div>\n                            <div class=\"form-group\">\n                                <input \n                                    placeholder=\"Password\"\n                                    name=\"password\"\n                                    ngModel\n                                    required\n                                    minLength = \"6\"\n                                    [type]=\"showPass ? 'text': 'password'\" \n                                    style=\"width: 100%\"/>\n                            </div>                            \n                            <label><input type=\"checkbox\" [ngModelOptions]=\"{standalone: true}\"  [(ngModel)]=\"showPass\" aria-label=\"Checkbox 1\"/>\n                                Show password\n                            </label>\n                            <button class=\"btn btn-primary btn-lg btn-block\"\n                                    type=\"submit\" value=\"Log In\"\n                                    [style.cursor]=\"cursorStyle\"\n                                    [disabled]=\"toolsDisadled\"><span class=\"fa fa-sign-in\"></span>Sign In</button>\n                        </form>\n                        <a class=\"panel-footer\"\n                            (click)=\"newUser()\"\n                            [style.pointer-events]=\"hrefDisadled ? 'none' : 'auto'\"><span class=\"fa fa-user-plus\"></span>Create Account</a>\n                    </div>\n                    <a (click)=\"resetPass()\"><span class=\"fa fa-unlock-alt\"></span>Reset Password</a>\n                </div>\n                \n            </div>\n\n\n</div>",
            styles: ["\n\n    "]
        }), 
        __metadata('design:paramtypes', [router_1.Router, login_service_1.LoginService])
    ], SignIn);
    return SignIn;
}());
exports.SignIn = SignIn;
//# sourceMappingURL=sign-in.js.map