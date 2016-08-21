/**
 * Created by Vlad on 6/28/2016.
 */


//import { bootstrap }    from '@angular/platform-browser-dynamic';
//import { HTTP_PROVIDERS } from '@angular/http';
//import { appRouterProviders } from './app.routes';
//import { AppComponent } from './app.component';

//bootstrap(AppComponent, [
//    appRouterProviders,
   // HTTP_PROVIDERS
//]).catch(err => console.error(err));



import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);