/**
 * Created by Vlad on 8/21/2016.
 */
import { Routes, RouterModule }   from '@angular/router';
//import { loginRoutes, authProviders }  from './login.routing';
//import { CanDeactivateGuard } from './can-deactivate-guard.service';
import {DevicesManager} from "./device/devices-manager";
const crisisCenterRoutes: Routes = [
    {  path: '', redirectTo: '/heroes', pathMatch: 'full' },
    { path: 'crisis-center', loadChildren: 'app/crisis-center/crisis-center.module#CrisisCenterModule' }
];

const appRoutes: Routes = [
    { path: '', component:DevicesManager}
  // ...crisisCenterRoutes
];

export const appRoutingProviders: any[] = [
   // authProviders,
   // CanDeactivateGuard
];

export const routing = RouterModule.forRoot(appRoutes);