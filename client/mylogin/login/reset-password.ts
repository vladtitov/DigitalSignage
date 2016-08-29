
import {Component} from "@angular/core";
import { Router } from '@angular/router';
import {LoginService} from "./login-service";

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
                        <div *ngIf="errorMessage || message">
                            <h5 *ngIf="errorMessage" [class.errorMessage]="errorMessage"> Wrong email </h5>
                            <h5 *ngIf="message" [class.message]="message"> Please check your email </h5>
                            <hr>
                        </div>
                        <form (ngSubmit)="onSubmit(loginForm.value)" #loginForm="ngForm">                
                            <div class="form-group">
                                <md-input 
                                    placeholder="Email address" 
                                    name="username" 
                                    ngModel 
                                    required
                                    type="email" 
                                    style="width: 100%">
                                </md-input>
                            </div>
                            <button class="btn btn-primary btn-lg btn-block" type="submit" value="Reset Password"><span class="fa fa-unlock-alt"></span>Reset Password</button>
                        </form>
                        <a class="panel-footer" (click)="back()"><span class="fa fa-arrow-left"></span>Back</a>
                    </div>
                </div>
                
            </div>


</div>`

    , styles:[`
    
    `]
})

export class ResetPassword{

    message:boolean = false;
    errorMessage:boolean = false;
    constructor(private router:Router, private loginService:LoginService){console.log('hello restore-password');}

    back(){
        this.router.navigate(["./sign-in"]);
    }

    onSubmit(value:any){
        // console.log('onSubmit ', value);
        this.loginService.resetPassword(value).subscribe((res)=>{

            console.log('res ', res);
            this.errorMessage = false;
            this.message = true;
        }, (err)=>{
            console.log('error ', err);
            this.message = false;
            this.errorMessage = true;
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