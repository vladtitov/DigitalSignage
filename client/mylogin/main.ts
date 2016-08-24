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

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { LoginModule } from './login.module';

platformBrowserDynamic().bootstrapModule(LoginModule);