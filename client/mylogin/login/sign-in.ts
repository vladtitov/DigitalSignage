

import {Component} from '@angular/core';
// import {MATERIAL_DIRECTIVES} from 'ng2-material';
// import {FORM_DIRECTIVES} from '@angular/forms';
// import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
// import { MD_TABS_DIRECTIVES } from '@angular2-material/tabs';
// import {MATERIAL_DIRECTIVES} from "ng2-material/index";
// import {MdToolbar} from '@angular2-material/toolbar';

import { Router } from '@angular/router';
import {LoginService} from "./login-service";

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
                        <div *ngIf="errorMessage" class="errorMessage">
                            <h5> Incorrect username or password </h5>
                            <hr>
                        </div>
                        <!--<form action="account/login" method="post" role="form" #loginForm="ngForm">-->
                        <form (ngSubmit)="onSubmit(loginForm.value)" #loginForm="ngForm">                
                            <div class="form-group">
                                <md-input 
                                    placeholder="Email address" 
                                    name="username" 
                                    [(ngModel)] = "userEmail"
                                    required
                                    type="email"
                                    style="width: 100%">
                                </md-input>
                            </div>
                            <div class="form-group">
                                <md-input 
                                    placeholder="Password"
                                    name="password"
                                    ngModel
                                    required
                                    minLength = "6"
                                    [type]="showPass ? 'text': 'password'" 
                                    style="width: 100%">
                                </md-input>
                            </div>                            
                            <md-checkbox [ngModelOptions]="{standalone: true}" [(ngModel)]="showPass" aria-label="Checkbox 1">
                                Show password
                            </md-checkbox>
                            <button class="btn btn-primary btn-lg btn-block" type="submit" value="Log In"><span class="fa fa-sign-in"></span>Sign In</button>
                        </form>
                        <a class="panel-footer" (click)="newUser()"><span class="fa fa-user-plus"></span>Create Account</a>
                    </div>
                    <a (click)="resetPass()"><span class="fa fa-unlock-alt"></span>Reset Password</a>
                </div>
                
            </div>


</div>`

    , styles:[`

    `]
    // , directives: [ MD_INPUT_DIRECTIVES, FORM_DIRECTIVES, MD_TABS_DIRECTIVES]
})

export class SignIn{

    urlLogin:string = 'account/login';
    inputPass:string = 'inputPass';
    showPass: boolean = false;

    errorMessage: boolean = false;

    userEmail:string;

    constructor(private router:Router, private loginService:LoginService){console.log('hello login-manager');}

    ngOnInit(){
        if(localStorage.getItem('email')){
            this.userEmail = localStorage.getItem('email');
            localStorage.removeItem('email');
        }
    }


    newUser(){
        this.router.navigate(["./new-user"]);
    }

    resetPass(){
        this.router.navigate(["./reset-password"]);
    }

    onSubmit(value:any){
        console.log('onSubmit ', value);

        this.loginService.loginServer(value).subscribe((res)=>{
            console.log('res ', res.result);
            if(res.result == 'logedin') {
                this.errorMessage = false;
                console.log('onSubmit res: ', res);
                // this.router.navigate(["./dashboard/content-manager",'view',0]);
                res = JSON.stringify(res);
                localStorage.setItem('myuser', res);
                window.location.href = "/";
            } else {
                this.errorMessage = true;
                console.log('wrong');
            }
        }, (err)=>{
            console.log('onSubmit error ', err);
            this.handleError(err); // = <any>err;
        });
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return errMsg;
    }

}