import { Component, OnInit } from '@angular/core';
import './rxjs-operators';



@Component({
    selector: 'login-app',
    template:`
    
    <router-outlet></router-outlet>
  `
})

export class LoginManager {

    ngOnInit(){
        $('#PRELOADER').remove();
    }

}




