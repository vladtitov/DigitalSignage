

import {Component} from '@angular/core';
// import {MATERIAL_DIRECTIVES} from 'ng2-material';
// import {FORM_DIRECTIVES} from '@angular/forms';
// import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
// import { MD_TABS_DIRECTIVES } from '@angular2-material/tabs';
// import {MATERIAL_DIRECTIVES} from "ng2-material/index";
// import {MdToolbar} from '@angular2-material/toolbar';

@Component({
    selector: 'sign-in'
    , template: `
<div>

            <!--<a [routerLink]="['./sign-in']" class="btn"><span class="fa fa-user"></span> Sign In</a>-->
            <a [routerLink]="['./new-user']" class="btn"><span class="fa fa-user-plus"></span> Create Account</a>
            <a [routerLink]="['./forget-password']" class="btn"><span class="fa fa-unlock-alt"></span> Restore Password</a>

            <div layout="column" class="md-inline-form">
              <form>
                <md-input class="demo-full-width" placeholder="Company (disabled)" disabled value="Google">
                </md-input>
                <table style="width: 100%" cellspacing="0"><tr>
                  <td><md-input placeholder="First name" style="width: 100%"></md-input></td>
                  <td><md-input placeholder="Really Super Long Last Name Placeholder That Will Be Truncated" style="width: 100%"></md-input></td>
                </tr></table>
                <p>
                  <md-input class="demo-full-width" placeholder="Address" value="1600 Amphitheatre Pkway"></md-input>
                  <md-input class="demo-full-width" placeholder="Address 2"></md-input>
                </p>
                <table style="width: 100%" cellspacing="0"><tr>
                  <td><md-input class="demo-full-width" placeholder="City"></md-input></td>
                  <td><md-input class="demo-full-width" placeholder="State"></md-input></td>
                  <td><md-input #postalCode class="demo-full-width" maxLength="5"
                                placeholder="Postal Code"
                                value="94043">
                    <md-hint align="end">{{postalCode.characterCount}} / 5</md-hint>
                  </md-input></td>
                </tr></table>
              </form>
            </div>


</div>`

    , styles:[`
            .modal {
                display: block;
                background-color: rgba(0, 0, 0, 0.31);
            }
            
            .modal-header {
                text-align: center;
            }
            
            .modal-content {
                width: 500px;
            }
            
            .shadow {
                position: absolute;
                background-color: rgba(0, 0, 0, 0.11);
                width: 500px;
                height: 120px;
                top:0;
            }
            
            .md-inline-form {
              margin: 24px;
            }
            .demo-full-width {
              width: 100%;
            }
    `]
    // , directives: [ MD_INPUT_DIRECTIVES, FORM_DIRECTIVES, MD_TABS_DIRECTIVES]
})

export class SignIn{

    constructor(){console.log('hello login-manager');}

}