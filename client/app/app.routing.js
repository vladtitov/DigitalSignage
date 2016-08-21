"use strict";
/**
 * Created by Vlad on 8/21/2016.
 */
var router_1 = require('@angular/router');
//import { loginRoutes, authProviders }  from './login.routing';
//import { CanDeactivateGuard } from './can-deactivate-guard.service';
var devices_manager_1 = require("./device/devices-manager");
var crisisCenterRoutes = [
    { path: '', redirectTo: '/heroes', pathMatch: 'full' },
    { path: 'crisis-center', loadChildren: 'app/crisis-center/crisis-center.module#CrisisCenterModule' }
];
var appRoutes = [
    { path: '', component: devices_manager_1.DevicesManager }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map