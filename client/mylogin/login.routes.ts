/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */

import { provideRouter, RouterConfig } from '@angular/router';

import {LoginManager} from "./login-manager";


export const routes: RouterConfig = [
    { path: 'login-manager', component: LoginManager }
    ,{ path: '**', component: LoginManager }

]

export const appRouterProviders = [
    provideRouter(routes)
];
