/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */

import { provideRouter, RouterConfig } from '@angular/router';
import { MessagesMain } from './messages/messages-main';


import {ContentManager} from './assets/content-manager';
import { addRoutes } from "./content-add/add.routes"

import {PlayListEditor} from "./playlist-editor/playlist-editor"
import {PublishMain} from "./device/publish-main";
//import {playlistLibrary} from "./play-list/playlist-library";

import {LayoutsAssembled} from "./layouts/layouts-assembled";
import {LayoutsTemplate} from "./layouts/layouts-template";
import {LayoutEditor} from "./layout-editor/layout-editor";

import {DevicesManager} from "./device/devices-manager";
import {PlayListLibrary} from "./play-list/playlist-library";


export const routes: RouterConfig = [
    { path: '', component: MessagesMain }
    //, { path: 'content-manager', component:ContentManager }
    ,{ path: 'publisher', component:PublishMain}
    // ,{ path: 'devices-manager', component:DevicesManager}
    ,{ path: 'devices-manager/:id', component:DevicesManager}
    ,{ path: 'playlist-library', component:PlayListLibrary }
    ,{ path: 'playlist-editor/:id', component: PlayListEditor}
    ,{path:'layouts-assembled',component:LayoutsAssembled}
    ,{path:'layout-editor/:type/:id',component:LayoutEditor}
    // ,{path:'layout-template',component:LayoutsTemplate}
    ,{path:'layout-template/:id',component:LayoutsTemplate}
    ,{path:'device-layout',component:PublishMain}
    ,{path: 'content-manager/:type/:id', component: ContentManager}
    ,{ path: '**', component: DevicesManager }

]

export const appRouterProviders = [
    provideRouter(routes)
];
