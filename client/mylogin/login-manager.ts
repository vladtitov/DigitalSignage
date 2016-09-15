import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import './rxjs-operators';



@Component({
    selector: 'login-app',
    template:`
    
    <router-outlet></router-outlet>
  `,
    directives: [ROUTER_DIRECTIVES]
})

export class LoginManager {

    ngOnInit(){
        $('#PRELOADER').remove();
    }

}




