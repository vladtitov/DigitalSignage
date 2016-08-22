/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */

import { Routes, RouterModule }   from '@angular/router';

import {LoginManager} from "./login-manager";
import {SignIn} from "./login/sign-in";
import {NewUser} from "./login/new-user";
import {ForgetPassword} from "./login/forget-password";


export const loginRoutes: Routes = [
    { path: 'sign-in', component: SignIn }
    , { path: 'new-user', component: NewUser }
    , { path: 'forget-password', component: ForgetPassword }
    , { path: '**', component: SignIn }

];

export const loginRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(loginRoutes);