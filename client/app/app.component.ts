import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import './rxjs-operators';



@Component({
    selector: 'my-app',
    template:`    
    <nav>     
     <a [routerLink]="['./content-manager','view',0]" class="btn"><span class="fa fa-picture-o"></span> Content</a>
     <a [routerLink]="['./playlist-library']" class="btn"><span class="fa fa-film"></span> Playlists library</a>
     <a [routerLink]="['./layouts-assembled']" class="btn"><span class="fa fa-th-large"></span> Layouts</a>
     <a [routerLink]="['./layout-template',-1]" class="btn"><span class="fa fa-magic"></span> New Layout</a>  
     <a [routerLink]="['./devices-manager', 0]" class="btn"><span class="fa fa-desktop"></span> Publish</a>       
   
     
    </nav>
    <router-outlet></router-outlet>
  `,
    directives: [ROUTER_DIRECTIVES]
})

export class AppComponent {


}




