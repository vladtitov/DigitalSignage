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
var SignIn = (function () {
    function SignIn(router) {
        this.router = router;
        this.url = 'account/login';
        this.inputPass = 'inputPass';
        this.showPass = false;
        console.log('hello login-manager');
    }
    SignIn.prototype.newUser = function () {
        this.router.navigate(["./new-user"]);
    };
    SignIn.prototype.resetPass = function () {
        this.router.navigate(["./reset-password"]);
    };
    SignIn = __decorate([
        core_1.Component({
            selector: 'sign-in',
            template: "\n<div>\n\n            <!--<a [routerLink]=\"['./sign-in']\" class=\"btn\"><span class=\"fa fa-user\"></span> Sign In</a>-->\n            <!--<a [routerLink]=\"['./new-user']\" class=\"btn\"><span class=\"fa fa-user-plus\"></span> Create Account</a>-->\n            <!--<a [routerLink]=\"['./restore-password']\" class=\"btn\"><span class=\"fa fa-unlock-alt\"></span> Restore Password</a>-->\n\n\n            <div class=\"loginform\">\n                <div class=\"logo\">\n                    <img src=\"../../images/hero.png\" alt=\"\">\n                </div>\n                \n                <div class=\"content\">\n                    <div class=\"panel\" id=\"login\">\n                        <h3>Sign in to your account</h3>\n                        <hr>\n                        <form action=\"account/login\" method=\"post\" role=\"form\">                \n                            <div class=\"form-group\">\n                                <md-input placeholder=\"Email address\" type=\"email\" style=\"width: 100%\"></md-input>\n                            </div>\n                            <div class=\"form-group\">\n                                <md-input placeholder=\"Password\" [type]=\"showPass ? 'text': 'password'\" style=\"width: 100%\"></md-input>\n                            </div>\n                            <!--<input type=\"hidden\" pattern=\".{6,}\"   required title=\"6 characters minimum\"/>-->\n                            \n                            <md-checkbox [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"showPass\" aria-label=\"Checkbox 1\">\n                                Show password\n                            </md-checkbox>\n                            <button class=\"btn btn-primary btn-lg btn-block\" type=\"submit\" value=\"Log In\">Sign In</button>\n                        </form>\n                        <a class=\"panel-footer\" (click)=\"newUser()\">Create Account</a>\n                    </div>\n                    <a (click)=\"resetPass()\">Reset Password</a>\n                </div>\n                \n            </div>\n\n\n</div>",
            styles: ["\n\n    "]
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], SignIn);
    return SignIn;
}());
exports.SignIn = SignIn;
//# sourceMappingURL=sign-in.js.map