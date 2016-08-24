
import {Component} from "@angular/core";
import { Router } from '@angular/router';

@Component({
    selector: 'new-user'
    , template: `
<div>
            
<!--<a [routerLink]="['./sign-in']" class="btn"><span class="fa fa-user-plus"></span> Back</a>-->

            <div class="loginform">
                <div class="logo">
                    <img src="../../images/hero.png" alt="">
                </div>
                
                <div class="content">
                    <div class="panel" id="login">
                        <h3>Create Account</h3>
                        <hr>
                        <form action="/login" method="post" role="form">          
                            <div class="form-group">
                                <md-input placeholder="Email address" type="email" style="width: 100%"></md-input>
                            </div>
                            <div class="form-group">
                                <md-input placeholder="Password" [type]="showPass ? 'text': 'password'" style="width: 100%"></md-input>
                            </div>
                            
                            <md-checkbox [ngModelOptions]="{standalone: true}" [(ngModel)]="showPass" aria-label="Checkbox 1">
                                Show password
                            </md-checkbox>
                            <button class="btn btn-primary btn-lg btn-block" type="submit" value="Log In">Create Account</button>
                        </form>
                        <a class="panel-footer" (click)="back()">Back</a>
                    </div>
                </div>
                
            </div>

</div>`

    , styles:[`

            sup.required {
                color: #D64242;
                font-size: 95%;
                top: -2px;
            }
    
    `]
})

export class NewUser{

    constructor(private router:Router){console.log('hello new-user!');}

    back(){
        this.router.navigate(["./sign-in"]);
    }
    
}