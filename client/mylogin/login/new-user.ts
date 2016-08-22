
import {Component} from "@angular/core";

@Component({
    selector: 'new-user'
    , template: `
<div>
            
<a [routerLink]="['./sign-in']" class="btn"><span class="fa fa-user-plus"></span> Back</a>

</div>`

    , styles:[`
    
    `]
})

export class NewUser{

    constructor(){console.log('hello new-user');}
    
}