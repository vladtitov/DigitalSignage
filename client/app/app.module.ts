/**
 * Created by Vlad on 8/21/2016.
 */
import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { AppComponent }       from './app.component';
import { routing, appRoutingProviders } from './app.routing';
import { HttpModule, JsonpModule } from '@angular/http';
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
       // AppComponent,
     //   LoginComponent
    ],
    providers: [
        appRoutingProviders,
     //   DialogService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
