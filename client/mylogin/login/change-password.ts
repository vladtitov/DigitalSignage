
import {Component} from "@angular/core";
import {Router, ActivatedRoute} from '@angular/router';
import {LoginService} from "./login-service";

@Component({
    selector: 'change-password'
    , template: `
<div>
            
<!--<a [routerLink]="['./sign-in']" class="btn"><span class="fa fa-user-plus"></span> Back</a>-->

            <div class="loginform">
                <div class="logo">
                    <img src="../../images/hero.png" alt="">
                </div>
                
                <div class="content">
                    <div class="panel" id="login">
                        <h3>Change Password</h3>
                        <hr>
                        <div *ngIf="errorMessage || message">
                            <h5 *ngIf="errorMessage" [class.errorMessage]="errorMessage"> Error </h5>
                            <h5 *ngIf="message" [class.message]="message"> Please Sign In </h5>
                            <hr>
                        </div>
                        <form (ngSubmit)="onSubmit(loginForm.value)" #loginForm="ngForm">                
                            <!--<div class="form-group">-->
                                <!--<md-input -->
                                    <!--placeholder="Email address" -->
                                    <!--name="username" -->
                                    <!--[(ngModel)] = "userEmail"-->
                                    <!--required-->
                                    <!--type="email"-->
                                    <!--style="width: 100%">-->
                                <!--</md-input>-->
                            <!--</div>-->
                            <div class="form-group">
                                <md-input 
                                    placeholder="New Password"
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
                            <button class="btn btn-primary btn-lg btn-block" type="submit" value="Change Password"><span class="fa fa-unlock"></span>Change Password</button>
                        </form>
                        <a class="panel-footer" (click)="back()"><span class="fa fa-arrow-left"></span>Sign In</a>
                    </div>
                </div>
                
            </div>

</div>`

    , styles:[`
    
    `]
})

export class ChangePassword{

    userEmail:string;
    token:string;
    message:boolean = false;
    errorMessage: boolean = false;

    private sub: any;

    constructor(
        private router:Router
        , private route:ActivatedRoute
        , private loginService:LoginService
    ){}

    ngOnInit () {
        this.sub = this.route.params.subscribe(params => {
            this.token = params['token'];
        });
    }

    back(){
        this.router.navigate(["./sign-in"]);
    }

    onSubmit(value:any){
        value.token = this.token;
        // console.log('onSubmit ', value);

        this.loginService.changePassword(value).subscribe((res)=>{
            console.log('res ', res);

            if(res == 1){
                this.message = true;
                // localStorage.setItem('email', this.userEmail);
                // console.log('onSubmit res', res);
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