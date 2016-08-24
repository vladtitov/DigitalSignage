

import {Component} from '@angular/core';
// import {MATERIAL_DIRECTIVES} from 'ng2-material';
// import {FORM_DIRECTIVES} from '@angular/forms';
// import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
// import { MD_TABS_DIRECTIVES } from '@angular2-material/tabs';
// import {MATERIAL_DIRECTIVES} from "ng2-material/index";
// import {MdToolbar} from '@angular2-material/toolbar';

import { Router } from '@angular/router';

@Component({
    selector: 'sign-in'
    , template: `
<div>

            <!--<a [routerLink]="['./sign-in']" class="btn"><span class="fa fa-user"></span> Sign In</a>-->
            <!--<a [routerLink]="['./new-user']" class="btn"><span class="fa fa-user-plus"></span> Create Account</a>-->
            <!--<a [routerLink]="['./restore-password']" class="btn"><span class="fa fa-unlock-alt"></span> Restore Password</a>-->


            <div class="loginform">
                <div class="logo">
                    <img src="../../images/hero.png" alt="">
                </div>
                
                <div class="content">
                    <div class="panel" id="login">
                        <h3>Sign in to your account</h3>
                        <hr>
                        <form action="account/login" method="post" role="form">                
                            <div class="form-group">
                                <md-input placeholder="Email address" type="email" style="width: 100%"></md-input>
                            </div>
                            <div class="form-group">
                                <md-input placeholder="Password" [type]="showPass ? 'text': 'password'" style="width: 100%"></md-input>
                            </div>
                            <!--<input type="hidden" pattern=".{6,}"   required title="6 characters minimum"/>-->
                            
                            <md-checkbox [ngModelOptions]="{standalone: true}" [(ngModel)]="showPass" aria-label="Checkbox 1">
                                Show password
                            </md-checkbox>
                            <button class="btn btn-primary btn-lg btn-block" type="submit" value="Log In">Sign In</button>
                        </form>
                        <a class="panel-footer" (click)="newUser()">Create Account</a>
                    </div>
                    <a (click)="resetPass()">Reset Password</a>
                </div>
                
            </div>


</div>`

    , styles:[`

    `]
    // , directives: [ MD_INPUT_DIRECTIVES, FORM_DIRECTIVES, MD_TABS_DIRECTIVES]
})

export class SignIn{

    url:string = 'account/login';

    inputPass:string = 'inputPass';

    showPass: boolean = false;

    constructor(private router:Router){console.log('hello login-manager');}


    newUser(){
        this.router.navigate(["./new-user"]);
    }

    resetPass(){
        this.router.navigate(["./reset-password"]);
    }

}