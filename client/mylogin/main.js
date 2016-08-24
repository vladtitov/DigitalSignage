/**
 * Created by Vlad on 6/28/2016.
 */
/// <reference path="../typings/globals/es6-shim/index.d.ts" />
// import { bootstrap }    from '@angular/platform-browser-dynamic';
// import { HTTP_PROVIDERS } from '@angular/http';
// import { appRouterProviders } from './login.routes';
// import {LoginComponent} from "./login.component";
//
//
//
//
//
// bootstrap(LoginComponent, [
//     appRouterProviders,
//     HTTP_PROVIDERS
// ]).catch(err => console.error(err));
"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var login_module_1 = require('./login.module');
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(login_module_1.LoginModule);
//# sourceMappingURL=main.js.map