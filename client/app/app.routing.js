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
var layouts_assembled_1 = require("./layouts/layouts-assembled");
var layout_editor_1 = require("./layout-editor/layout-editor");
var layouts_template_1 = require("./layouts/layouts-template");
var content_manager_1 = require("./assets/content-manager");
var crisisCenterRoutes = [
    { path: '', redirectTo: '/heroes', pathMatch: 'full' },
    { path: 'crisis-center', loadChildren: 'app/crisis-center/crisis-center.module#CrisisCenterModule' }
];
var appRoutes = [
    { path: '', component: devices_manager_1.DevicesManager },
    { path: 'devices-manager/:id', component: devices_manager_1.DevicesManager },
    { path: 'playlist-library', component: playlist_library_1.PlayListLibrary },
    { path: 'playlist-editor/:id', component: playlist_editor_1.PlayListEditor },
    { path: 'layouts-assembled', component: layouts_assembled_1.LayoutsAssembled },
    { path: 'layout-editor/:type/:id', component: layout_editor_1.LayoutEditor },
    { path: 'layout-template/:id', component: layouts_template_1.LayoutsTemplate },
    { path: 'content-manager/:type/:id', component: content_manager_1.ContentManager },
    { path: '**', component: devices_manager_1.DevicesManager }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map