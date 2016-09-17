

import {Component} from '@angular/core';
// import {MATERIAL_DIRECTIVES} from 'ng2-material';
// import {FORM_DIRECTIVES} from '@angular/forms';
// import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
// import { MD_TABS_DIRECTIVES } from '@angular2-material/tabs';
// import {MATERIAL_DIRECTIVES} from "ng2-material/index";
// import {MdToolbar} from '@angular2-material/toolbar';

import { Router } from '@angular/router';
import {LoginService} from "./login-service";
import {VOUserData, VOUserResult} from "../../app/services/models";

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
                        <div *ngIf="wrongMessage" class="errorMessage">
                            <h5> Incorrect username or password </h5>
                            <hr>
                        </div>
                        <!--<form action="account/login" method="post" role="form" #loginForm="ngForm">-->
                        <form (ngSubmit)="onSubmit(loginForm.value)" #loginForm="ngForm">                
                            <div class="form-group">
                                <input 
                                    placeholder="Email address" 
                                    name="username" 
                                    [(ngModel)] = "userEmail"
                                    required
                                    type="email"
                                    style="width: 100%"/>
                            </div>
                            <div class="form-group">
                                <input 
                                    placeholder="Password"
                                    name="password"
                                    ngModel
                                    required
                                    minLength = "6"
                                    [type]="showPass ? 'text': 'password'" 
                                    style="width: 100%"/>
                            </div>                            
                            <label><input type="checkbox" [ngModelOptions]="{standalone: true}"  [(ngModel)]="showPass" aria-label="Checkbox 1"/>
                                Show password
                            </label>
                            <button class="btn btn-primary btn-lg btn-block"
                                    type="submit" value="Log In"
                                    [style.cursor]="cursorStyle"
                                    [disabled]="toolsDisadled"><span class="fa fa-sign-in"></span>Sign In</button>
                        </form>
                        <a class="panel-footer"
                            (click)="newUser()"
                            [style.pointer-events]="hrefDisadled ? 'none' : 'auto'"><span class="fa fa-user-plus"></span>Create Account</a>
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
    cursorStyle:string = 'pointer';
    urlLogin:string = 'account/login';
    inputPass:string = 'inputPass';
    showPass: boolean = false;

    wrongMessage: boolean = false;

    userEmail:string;
    hrefDisadled: boolean = false;
    toolsDisadled: boolean = false;

    constructor(private router:Router, private loginService:LoginService){}

    ngOnInit(){
        this.hrefDisadled = true;
        setTimeout(()=>{this.hrefDisadled = false},100);
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

    onSubmit(value:VOUserData){
        // console.log('onSubmit ', value);
        this.toolsDisadled = true;
        setTimeout(()=>{this.toolsDisadled = false},1000);

        this.loginService.loginServer(value).subscribe((res:VOUserResult)=>{
            // console.log('res ', res.result);
            if(res.result == 'logedin') {
                this.wrongMessage = false;
                localStorage.setItem('myuser', JSON.stringify(res));
                window.location.href = "/";
            } else {
                this.wrongMessage = true;
                // console.log('wrong');
            }
        }, (err)=>{
            // console.log('onSubmit error ', err);
            this.handleError(err); // = <any>err;
        });
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        // console.error(errMsg);
        return errMsg;
    }

}