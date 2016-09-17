
import {Component} from "@angular/core";
import { Router } from '@angular/router';
import {LoginService} from "./login-service";
import {VOUserResult, VOUserData} from "../../app/services/models";

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
                        <div *ngIf="progressCircle">
                            <div layout="row" layout-sm="column" layout-align="space-around">
                                
                            </div>
                            <hr>
                        </div>
                        <div *ngIf="existsMessage || errMessage" class="errorMessage">
                            <h5 *ngIf="existsMessage"> This username already exists </h5>
                            <h5 *ngIf="errMessage"> Error processing. Please reload. </h5>
                            <hr>
                        </div>
                        <form (ngSubmit)="onSubmit(loginForm.value)" #loginForm="ngForm">                
                            <div class="form-group">
                                <input 
                                    placeholder="Email address" 
                                    name="username" 
                                    [(ngModel)] = "userName"
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
                            <label> <input type="checkbox" [ngModelOptions]="{standalone: true}" [(ngModel)]="showPass" aria-label="Checkbox 1">
                                Show password
                            </label>
                            <button
                                class="btn btn-primary btn-lg btn-block"
                                type="submit" value="New User"
                                [style.cursor]="cursorStyle"
                                [disabled]="toolsDisadled"><span class="fa fa-user-plus"></span>Create Account</button>
                        </form>
                        <a class="panel-footer"
                            (click)="back()"
                            [style.pointer-events]="hrefDisadled ? 'none' : 'auto'"><span class="fa fa-arrow-left"></span>Back</a>
                    </div>
                </div>
                
            </div>

</div>`

    , styles:[`
        h3{
            color: #ff0000;
        }
    `]
})

export class NewUser{
    cursorStyle:string = 'pointer';
    userName:string;
    errMessage:boolean = false;
    existsMessage: boolean = false;
    hrefDisadled: boolean = false;
    toolsDisadled: boolean = false;
    progressCircle: boolean = false;

    constructor(private router:Router, private loginService:LoginService){}

    ngOnInit(){
        this.hrefDisadled = true;
        setTimeout(()=>{this.hrefDisadled = false},100);
    }

    back(){
        this.router.navigate(["./sign-in"]);
    }

    onSubmit(value:VOUserData){
        // console.log('onSubmit ', value);
        this.toolsDisadled = true;
        this.existsMessage = false;
        this.errMessage = false;
        this.progressCircle = true;
        // setTimeout(()=>{this.toolsDisadled = false},1000);

        this.loginService.createAccount(value).subscribe((res:VOUserResult)=>{
            if(res.token){
                localStorage.setItem('email', this.userName);
                this.toolsDisadled = false;
                this.progressCircle = false;
                // console.log('onSubmit res', res);
                this.back();
            } else {
                this.progressCircle = false;
                this.existsMessage = true;
                this.toolsDisadled = false;
                // console.log('wrong');
            }
        }, (err)=>{
            // console.log('onSubmit error ', err);
            this.handleError(err); // = <any>err;
            this.progressCircle = false;
            this.errMessage = true;
            this.toolsDisadled = false;
        });
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        // console.error(errMsg);
        return errMsg;
    }
    
}