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
var ChangePassword = (function () {
    function ChangePassword(router, route, loginService) {
        this.router = router;
        this.route = route;
        this.loginService = loginService;
        this.cursorStyle = 'pointer';
        this.message = false;
        this.errorMessage = false;
        this.toolsDisadled = false;
    }
    ChangePassword.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.token = params['token'];
        });
    };
    ChangePassword.prototype.back = function () {
        this.router.navigate(["./sign-in"]);
    };
    ChangePassword.prototype.onSubmit = function (value) {
        var _this = this;
        value.token = this.token;
        // console.log('onSubmit ', value);
        this.toolsDisadled = true;
        this.loginService.changePassword(value).subscribe(function (res) {
            // console.log('res ', res);
            if (res.changes) {
                _this.errorMessage = false;
                setTimeout(function () { _this.message = true; }, 1000);
            }
            else {
                _this.message = false;
                _this.errorMessage = true;
                setTimeout(function () { _this.toolsDisadled = false; }, 1000);
            }
        }, function (err) {
            _this.message = false;
            _this.errorMessage = true;
            setTimeout(function () { _this.toolsDisadled = false; }, 1000);
            // console.log('onSubmit error ', err);
            _this.handleError(err); // = <any>err;
        });
    };
    ChangePassword.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        // console.error(errMsg);
        return errMsg;
    };
    ChangePassword = __decorate([
        core_1.Component({
            selector: 'change-password',
            template: "\n<div>\n            \n<!--<a [routerLink]=\"['./sign-in']\" class=\"btn\"><span class=\"fa fa-user-plus\"></span> Back</a>-->\n\n            <div class=\"loginform\">\n                <div class=\"logo\">\n                    <img src=\"../../images/hero.png\" alt=\"\">\n                </div>\n                \n                <div class=\"content\">\n                    <div class=\"panel\" id=\"login\">\n                        <h3>Change Password</h3>\n                        <hr>\n                        <div  *ngIf=\"errorMessage\">\n                            <h5 *ngIf=\"errorMessage\" [class.errorMessage]=\"errorMessage\"> Error </h5>\n                            <!--<a *ngIf=\"message\" class=\"btn btn-success\" (click)=\"back()\">Please Sign In</a>-->\n                            <!--<button *ngIf=\"message\" class=\"btn btn-success btn-lg btn-block\" type=\"submit\" value=\"Change Password\"><span class=\"fa fa-unlock\"></span>Change Password</button>-->\n                            <!--<h5 *ngIf=\"message\" [class.message]=\"message\"> Please Sign In </h5>-->\n                            <hr>\n                        </div>\n                        <form (ngSubmit)=\"onSubmit(loginForm.value)\" #loginForm=\"ngForm\">                \n                            <!--<div class=\"form-group\">-->\n                                <!--<md-input -->\n                                    <!--placeholder=\"Email address\" -->\n                                    <!--name=\"username\" -->\n                                    <!--[(ngModel)] = \"userEmail\"-->\n                                    <!--required-->\n                                    <!--type=\"email\"-->\n                                    <!--style=\"width: 100%\">-->\n                                <!--</md-input>-->\n                            <!--</div>-->\n                            <div class=\"form-group\">\n                                <input \n                                    placeholder=\"New Password\"\n                                    name=\"password\"\n                                    ngModel\n                                    required\n                                    minLength = \"6\"\n                                    [type]=\"showPass ? 'text': 'password'\" \n                                    style=\"width: 100%\"/>\n                            </div>                            \n                            <label><input type=\"checkbox\" [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"showPass\" aria-label=\"Checkbox 1\">\n                                Show password\n                            </label>\n                            <a *ngIf=\"message\" class=\"btn btn-success btn-lg\" (click)=\"back()\"><span class=\"fa fa-sign-in\"></span>Please Sign In</a>\n                            <button *ngIf=\"!message\" class=\"btn btn-primary btn-lg btn-block\"\n                                    type=\"submit\" value=\"Change Password\"\n                                    [style.cursor]=\"cursorStyle\"\n                                    [disabled]=\"toolsDisadled\"><span class=\"fa fa-unlock\"></span>Change Password</button>\n                        </form>\n                        <a class=\"panel-footer\" (click)=\"back()\"><span class=\"fa fa-arrow-left\"></span>Sign In</a>\n                    </div>\n                </div>\n                \n            </div>\n\n</div>",
            styles: ["\n        form > a {\n            width: 100%;\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, login_service_1.LoginService])
    ], ChangePassword);
    return ChangePassword;
}());
exports.ChangePassword = ChangePassword;
//# sourceMappingURL=change-password.js.map