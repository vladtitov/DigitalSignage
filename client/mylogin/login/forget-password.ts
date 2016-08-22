
import {Component} from "@angular/core";

@Component({
    selector: 'forget-password'
    , template: `
<div>
            
<a [routerLink]="['./sign-in']" class="btn"><span class="fa fa-user-plus"></span> Back</a>

</div>`

    , styles:[`
    
    `]
})

export class ForgetPassword{

    constructor(){console.log('hello forget-password');}
    
}