
import {Component} from "@angular/core";
import { Router } from '@angular/router';

@Component({
    selector: 'reset-password'
    , template: `
<div>
            
<!--<a [routerLink]="['./sign-in']" class="btn"><span class="fa fa-user-plus"></span> Back</a>-->

           <div class="loginform">
                <div class="logo">
                    <img src="../../images/hero.png" alt="">
                </div>
                
                <div class="content">
                    <div class="panel" id="login">
                        <h3>Reset Password</h3>
                        <hr>
                        <form action="/login" method="post" role="form">                
                            <div class="form-group">
                                <md-input placeholder="Email address" style="width: 100%"></md-input>
                            </div>
                            <button class="btn btn-primary btn-lg btn-block" type="submit" value="Log In">Reset Password</button>
                        </form>
                        <a class="panel-footer" (click)="back()">Back</a>
                    </div>
                </div>
                
            </div>


</div>`

    , styles:[`
    
    `]
})

export class ResetPassword{

    constructor(private router:Router){console.log('hello restore-password');}

    back(){
        this.router.navigate(["./sign-in"]);
    }
}