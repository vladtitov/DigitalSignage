/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */
"use strict";
var router_1 = require('@angular/router');
var messages_main_1 = require('./messages/messages-main');
var content_manager_1 = require('./assets/content-manager');
var playlist_editor_1 = require("./playlist-editor/playlist-editor");
var publish_main_1 = require("./device/publish-main");
//import {playlistLibrary} from "./play-list/playlist-library";
var layouts_assembled_1 = require("./layouts/layouts-assembled");
var layouts_template_1 = require("./layouts/layouts-template");
var layout_editor_1 = require("./layout-editor/layout-editor");
var devices_manager_1 = require("./device/devices-manager");
var playlist_library_1 = require("./play-list/playlist-library");
exports.routes = [
    { path: '', component: messages_main_1.MessagesMain },
    { path: 'publisher', component: publish_main_1.PublishMain },
    { path: 'devices-manager/:id', component: devices_manager_1.DevicesManager },
    { path: 'playlist-library', component: playlist_library_1.PlayListLibrary },
    { path: 'playlist-editor/:id', component: playlist_editor_1.PlayListEditor },
    { path: 'layouts-assembled', component: layouts_assembled_1.LayoutsAssembled },
    { path: 'layout-editor/:type/:id', component: layout_editor_1.LayoutEditor },
    { path: 'layout-template/:id', component: layouts_template_1.LayoutsTemplate },
    { path: 'device-layout', component: publish_main_1.PublishMain },
    { path: 'content-manager/:type/:id', component: content_manager_1.ContentManager },
    { path: '**', component: devices_manager_1.DevicesManager }
];
exports.appRouterProviders = [
    router_1.provideRouter(exports.routes)
];
//# sourceMappingURL=app.routes.js.map