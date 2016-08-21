/**
 * Created by Vlad on 6/28/2016.
 */
"use strict";
//import { bootstrap }    from '@angular/platform-browser-dynamic';
//import { HTTP_PROVIDERS } from '@angular/http';
//import { appRouterProviders } from './app.routes';
//import { AppComponent } from './app.component';
//bootstrap(AppComponent, [
//    appRouterProviders,
// HTTP_PROVIDERS
//]).catch(err => console.error(err));
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_module_1 = require('./app.module');
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
//# sourceMappingURL=main.js.map