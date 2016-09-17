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
var NewUser = (function () {
    function NewUser(router, loginService) {
        this.router = router;
        this.loginService = loginService;
        this.cursorStyle = 'pointer';
        this.errMessage = false;
        this.existsMessage = false;
        this.hrefDisadled = false;
        this.toolsDisadled = false;
        this.progressCircle = false;
    }
    NewUser.prototype.ngOnInit = function () {
        var _this = this;
        this.hrefDisadled = true;
        setTimeout(function () { _this.hrefDisadled = false; }, 100);
    };
    NewUser.prototype.back = function () {
        this.router.navigate(["./sign-in"]);
    };
    NewUser.prototype.onSubmit = function (value) {
        var _this = this;
        // console.log('onSubmit ', value);
        this.toolsDisadled = true;
        this.existsMessage = false;
        this.errMessage = false;
        this.progressCircle = true;
        // setTimeout(()=>{this.toolsDisadled = false},1000);
        this.loginService.createAccount(value).subscribe(function (res) {
            if (res.token) {
                localStorage.setItem('email', _this.userName);
                _this.toolsDisadled = false;
                _this.progressCircle = false;
                // console.log('onSubmit res', res);
                _this.back();
            }
            else {
                _this.progressCircle = false;
                _this.existsMessage = true;
                _this.toolsDisadled = false;
            }
        }, function (err) {
            // console.log('onSubmit error ', err);
            _this.handleError(err); // = <any>err;
            _this.progressCircle = false;
            _this.errMessage = true;
            _this.toolsDisadled = false;
        });
    };
    NewUser.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        // console.error(errMsg);
        return errMsg;
    };
    NewUser = __decorate([
        core_1.Component({
            selector: 'new-user',
            template: "\n<div>\n            \n<!--<a [routerLink]=\"['./sign-in']\" class=\"btn\"><span class=\"fa fa-user-plus\"></span> Back</a>-->\n\n            <div class=\"loginform\">\n                <div class=\"logo\">\n                    <img src=\"../../images/hero.png\" alt=\"\">\n                </div>\n                \n                <div class=\"content\">\n                    <div class=\"panel\" id=\"login\">\n                        <h3>Create Account</h3>\n                        <hr>\n                        <div *ngIf=\"progressCircle\">\n                            <div layout=\"row\" layout-sm=\"column\" layout-align=\"space-around\">\n                                \n                            </div>\n                            <hr>\n                        </div>\n                        <div *ngIf=\"existsMessage || errMessage\" class=\"errorMessage\">\n                            <h5 *ngIf=\"existsMessage\"> This username already exists </h5>\n                            <h5 *ngIf=\"errMessage\"> Error processing. Please reload. </h5>\n                            <hr>\n                        </div>\n                        <form (ngSubmit)=\"onSubmit(loginForm.value)\" #loginForm=\"ngForm\">                \n                            <div class=\"form-group\">\n                                <input \n                                    placeholder=\"Email address\" \n                                    name=\"username\" \n                                    [(ngModel)] = \"userName\"\n                                    required\n                                    type=\"email\"\n                                    style=\"width: 100%\"/>\n                            </div>\n                            <div class=\"form-group\">\n                                <input \n                                    placeholder=\"Password\"\n                                    name=\"password\"\n                                    ngModel\n                                    required\n                                    minLength = \"6\"\n                                    [type]=\"showPass ? 'text': 'password'\" \n                                    style=\"width: 100%\"/>\n                            </div>                            \n                            <label> <input type=\"checkbox\" [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"showPass\" aria-label=\"Checkbox 1\">\n                                Show password\n                            </label>\n                            <button\n                                class=\"btn btn-primary btn-lg btn-block\"\n                                type=\"submit\" value=\"New User\"\n                                [style.cursor]=\"cursorStyle\"\n                                [disabled]=\"toolsDisadled\"><span class=\"fa fa-user-plus\"></span>Create Account</button>\n                        </form>\n                        <a class=\"panel-footer\"\n                            (click)=\"back()\"\n                            [style.pointer-events]=\"hrefDisadled ? 'none' : 'auto'\"><span class=\"fa fa-arrow-left\"></span>Back</a>\n                    </div>\n                </div>\n                \n            </div>\n\n</div>",
            styles: ["\n        h3{\n            color: #ff0000;\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [router_1.Router, login_service_1.LoginService])
    ], NewUser);
    return NewUser;
}());
exports.NewUser = NewUser;
//# sourceMappingURL=new-user.js.map