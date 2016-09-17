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
 * Created by Vlad on 8/21/2016.
 */
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
// import { MaterialModule } from './material.module'
var login_routing_1 = require('./login.routing');
var http_1 = require('@angular/http');
var login_manager_1 = require('./login-manager');
var sign_in_1 = require("./login/sign-in");
var new_user_1 = require("./login/new-user");
var reset_password_1 = require("./login/reset-password");
var login_service_1 = require("./login/login-service");
var change_password_1 = require("./login/change-password");
// import {DeviceEditor} from "./device/device-editor";
// import {DevicesList} from "./device/devices-list";
// import {PlaylistEditable} from "./playlist-editor/playlist-editable";
//import { HeroesModule } from './heroes/heroes.module';
//import { LoginComponent } from './login.component';
//import { DialogService }  from './dialog.service';
var LoginModule = (function () {
    function LoginModule() {
    }
    LoginModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                http_1.JsonpModule,
                login_routing_1.routing
            ],
            declarations: [
                login_manager_1.LoginManager,
                sign_in_1.SignIn,
                new_user_1.NewUser,
                reset_password_1.ResetPassword,
                change_password_1.ChangePassword
            ],
            providers: [
                login_service_1.LoginService
            ],
            bootstrap: [login_manager_1.LoginManager]
        }), 
        __metadata('design:paramtypes', [])
    ], LoginModule);
    return LoginModule;
}());
exports.LoginModule = LoginModule;
//# sourceMappingURL=login.module.js.map