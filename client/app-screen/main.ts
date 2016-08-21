/**
 * Created by Vlad on 6/28/2016.
 */

import { Component } from '@angular/core';
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import './rxjs-operators';

import {ROUTER_DIRECTIVES, provideRouter, RouterConfig } from '@angular/router';
import {DeviceController} from "./device-controller";



const routes: RouterConfig = [
    { path: 'mydevice/:deviceid', component: DeviceController }
    ,{ path: '**', component: DeviceController }

]



const appRouterProviders = [
    provideRouter(routes)
];


@Component({
    selector: 'my-device',
    template:` 
    <router-outlet></router-outlet>
  `,
    directives: [ROUTER_DIRECTIVES]
})

export class AppComponent {


}




bootstrap(AppComponent, [
    appRouterProviders,
    HTTP_PROVIDERS
]).catch(err => console.error(err));
