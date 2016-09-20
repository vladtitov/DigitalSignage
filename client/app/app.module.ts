/**
 * Created by Vlad on 8/21/2016.
 */
import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { FormsModule }      from '@angular/forms';
import { RouterModule }     from "@angular/router";
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent }       from './app.component';
import { routerConfig } from './app.routing';


import {AssetsModule} from "./assets/assets.module";
import {PlaylistModule} from "./play-list/playlist.module";
import {LayoutsModule} from "./layouts/layouts.module";
import {DevicesModule} from "./device/devices.module";
import {SharedModule} from "./shared/shared.module";




@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        RouterModule.forRoot(routerConfig),
        AssetsModule,
        PlaylistModule,
        LayoutsModule,
        DevicesModule,
        SharedModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [

    ],
    // entryComponents: [ TooltipText ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
