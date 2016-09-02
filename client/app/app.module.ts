/**
 * Created by Vlad on 8/21/2016.
 */
import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { AppComponent }       from './app.component';
import { routing, appRoutingProviders } from './app.routing';
import { HttpModule, JsonpModule } from '@angular/http';

import {ContentManager} from "./assets/content-manager";
import {PlayListLibrary} from "./play-list/playlist-library";
import {PlayListEditor} from "./playlist-editor/playlist-editor";
import {PlaylistEditable} from "./playlist-editor/playlist-editable";
import {LayoutsAssembled} from "./layouts/layouts-assembled";
import {LayoutEditor} from "./layout-editor/layout-editor";
import {LayoutsTemplate} from "./layouts/layouts-template";
import {DevicesManager} from "./device/devices-manager";
import {DevicesList} from "./device/devices-list";
import {DeviceEditor} from "./device/device-editor";

import {Ng2MdTooltip} from "./shared/ng2-md-tooltip/ng2-md-tooltip";
import {TooltipText} from "./shared/ng2-md-tooltip/tooltip-text";

//import { HeroesModule } from './heroes/heroes.module';
//import { LoginComponent } from './login.component';
//import { DialogService }  from './dialog.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        routing
      //  HeroesModule
    ],
    declarations: [
        AppComponent,
        ContentManager,
        PlayListLibrary,
        PlayListEditor,
        PlaylistEditable,
        LayoutsAssembled,
        LayoutEditor,
        LayoutsTemplate,
        DevicesManager,
        DevicesList,
        DeviceEditor
        ,Ng2MdTooltip
        ,TooltipText

       // AppComponent,
     //   LoginComponent
    ],
    providers: [
        appRoutingProviders,
     //   DialogService
    ],
    entryComponents: [ TooltipText ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
