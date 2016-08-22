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
var SignIn = (function () {
    function SignIn() {
        console.log('hello login-manager');
    }
    SignIn = __decorate([
        core_1.Component({
            selector: 'sign-in',
            template: "\n<div>\n\n            <!--<a [routerLink]=\"['./sign-in']\" class=\"btn\"><span class=\"fa fa-user\"></span> Sign In</a>-->\n            <a [routerLink]=\"['./new-user']\" class=\"btn\"><span class=\"fa fa-user-plus\"></span> Create Account</a>\n            <a [routerLink]=\"['./forget-password']\" class=\"btn\"><span class=\"fa fa-unlock-alt\"></span> Restore Password</a>\n\n            <div layout=\"column\" class=\"md-inline-form\">\n              <form>\n                <md-input class=\"demo-full-width\" placeholder=\"Company (disabled)\" disabled value=\"Google\">\n                </md-input>\n                <table style=\"width: 100%\" cellspacing=\"0\"><tr>\n                  <td><md-input placeholder=\"First name\" style=\"width: 100%\"></md-input></td>\n                  <td><md-input placeholder=\"Really Super Long Last Name Placeholder That Will Be Truncated\" style=\"width: 100%\"></md-input></td>\n                </tr></table>\n                <p>\n                  <md-input class=\"demo-full-width\" placeholder=\"Address\" value=\"1600 Amphitheatre Pkway\"></md-input>\n                  <md-input class=\"demo-full-width\" placeholder=\"Address 2\"></md-input>\n                </p>\n                <table style=\"width: 100%\" cellspacing=\"0\"><tr>\n                  <td><md-input class=\"demo-full-width\" placeholder=\"City\"></md-input></td>\n                  <td><md-input class=\"demo-full-width\" placeholder=\"State\"></md-input></td>\n                  <td><md-input #postalCode class=\"demo-full-width\" maxLength=\"5\"\n                                placeholder=\"Postal Code\"\n                                value=\"94043\">\n                    <md-hint align=\"end\">{{postalCode.characterCount}} / 5</md-hint>\n                  </md-input></td>\n                </tr></table>\n              </form>\n            </div>\n\n\n</div>",
            styles: ["\n            .modal {\n                display: block;\n                background-color: rgba(0, 0, 0, 0.31);\n            }\n            \n            .modal-header {\n                text-align: center;\n            }\n            \n            .modal-content {\n                width: 500px;\n            }\n            \n            .shadow {\n                position: absolute;\n                background-color: rgba(0, 0, 0, 0.11);\n                width: 500px;\n                height: 120px;\n                top:0;\n            }\n            \n            .md-inline-form {\n              margin: 24px;\n            }\n            .demo-full-width {\n              width: 100%;\n            }\n    "]
        }), 
        __metadata('design:paramtypes', [])
    ], SignIn);
    return SignIn;
}());
exports.SignIn = SignIn;
//# sourceMappingURL=sign-in.js.map