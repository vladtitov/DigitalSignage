/**
 * Created by Vlad on 8/21/2016.
 */
import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { MaterialModule } from './material.module'

import { LoginManager }       from './login-manager';
import { routing, loginRoutingProviders } from './login.routing';
import { HttpModule, JsonpModule } from '@angular/http';


// import {DeviceEditor} from "./device/device-editor";
// import {DevicesList} from "./device/devices-list";
// import {PlaylistEditable} from "./playlist-editor/playlist-editable";

//import { HeroesModule } from './heroes/heroes.module';
//import { LoginComponent } from './login.component';
//import { DialogService }  from './dialog.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        routing,
        MaterialModule
      //  HeroesModule
    ],
    declarations: [
        // PlaylistEditable
     //   DevicesList,
     //   DeviceEditor

       // AppComponent,
     //   LoginComponent
    ],
    providers: [
        loginRoutingProviders,
     //   DialogService
    ],
    bootstrap: [ LoginManager ]
})
export class LoginModule {
}
