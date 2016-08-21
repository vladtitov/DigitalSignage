"use strict";
/**
 * Created by Vlad on 8/21/2016.
 */
var router_1 = require('@angular/router');
//import { loginRoutes, authProviders }  from './login.routing';
//import { CanDeactivateGuard } from './can-deactivate-guard.service';
var devices_manager_1 = require("./device/devices-manager");
//import {PublishMain} from "./device/publish-main";
var playlist_library_1 = require("./play-list/playlist-library");
var playlist_editor_1 = require("./playlist-editor/playlist-editor");
//import {LayoutsAssembled} from "./layouts/layouts-assembled";
//import {LayoutEditor} from "./layout-editor/layout-editor";
//import {LayoutsTemplate} from "./layouts/layouts-template";
//import {ContentManager} from "./assets/content-manager";
var crisisCenterRoutes = [
    { path: '', redirectTo: '/heroes', pathMatch: 'full' },
    { path: 'crisis-center', loadChildren: 'app/crisis-center/crisis-center.module#CrisisCenterModule' }
];
var appRoutes = [
    { path: '', component: devices_manager_1.DevicesManager },
    { path: 'devices-manager/:id', component: devices_manager_1.DevicesManager },
    { path: 'playlist-library', component: playlist_library_1.PlayListLibrary },
    { path: 'playlist-editor/:id', component: playlist_editor_1.PlayListEditor },
    { path: '**', component: devices_manager_1.DevicesManager }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map