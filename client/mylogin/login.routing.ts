/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */

import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';

import {SignIn} from "./login/sign-in";
import {NewUser} from "./login/new-user";
import {ResetPassword} from "./login/reset-password";
import {ChangePassword} from "./login/change-password";


export const loginRoutes: Routes = [
    { path: 'sign-in', component: SignIn }
    , { path: 'new-user', component: NewUser }
    , { path: 'reset-password', component: ResetPassword }
    , { path: 'change-password/:token', component: ChangePassword }
    , { path: '**', component: SignIn }

];

export const routing:ModuleWithProviders = RouterModule.forRoot(loginRoutes);