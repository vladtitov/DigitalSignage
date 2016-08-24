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
var NewUser = (function () {
    function NewUser(router) {
        this.router = router;
        console.log('hello new-user!');
    }
    NewUser.prototype.back = function () {
        this.router.navigate(["./sign-in"]);
    };
    NewUser = __decorate([
        core_1.Component({
            selector: 'new-user',
            template: "\n<div>\n            \n<!--<a [routerLink]=\"['./sign-in']\" class=\"btn\"><span class=\"fa fa-user-plus\"></span> Back</a>-->\n\n            <div class=\"loginform\">\n                <div class=\"logo\">\n                    <img src=\"../../images/hero.png\" alt=\"\">\n                </div>\n                \n                <div class=\"content\">\n                    <div class=\"panel\" id=\"login\">\n                        <h3>Create Account</h3>\n                        <hr>\n                        <form action=\"/login\" method=\"post\" role=\"form\">          \n                            <div class=\"form-group\">\n                                <md-input placeholder=\"Email address\" type=\"email\" style=\"width: 100%\"></md-input>\n                            </div>\n                            <div class=\"form-group\">\n                                <md-input placeholder=\"Password\" [type]=\"showPass ? 'text': 'password'\" style=\"width: 100%\"></md-input>\n                            </div>\n                            \n                            <md-checkbox [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"showPass\" aria-label=\"Checkbox 1\">\n                                Show password\n                            </md-checkbox>\n                            <button class=\"btn btn-primary btn-lg btn-block\" type=\"submit\" value=\"Log In\">Create Account</button>\n                        </form>\n                        <a class=\"panel-footer\" (click)=\"back()\">Back</a>\n                    </div>\n                </div>\n                \n            </div>\n\n</div>",
            styles: ["\n\n            sup.required {\n                color: #D64242;\n                font-size: 95%;\n                top: -2px;\n            }\n    \n    "]
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], NewUser);
    return NewUser;
}());
exports.NewUser = NewUser;
//# sourceMappingURL=new-user.js.map