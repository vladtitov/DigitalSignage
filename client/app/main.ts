/**
 * Created by Vlad on 6/28/2016.
 */
/// <reference path="../typings/globals/es6-shim/index.d.ts" />
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { appRouterProviders } from './app.routes';
import { AppComponent } from './app.component';





bootstrap(AppComponent, [
    appRouterProviders,
    HTTP_PROVIDERS
]).catch(err => console.error(err));
