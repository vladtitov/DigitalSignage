/**
 * Created by Vlad on 7/5/2016.
 */
import {Component, Input} from '@angular/core';
import {HTTP_PROVIDERS, Http} from "@angular/http";

@Component({
    selector: '[myRow]',
    template: `<td (click)="onClick(i)"  *ngFor="let val of row ; let i = index" >{{val}}</td>`
})
export class MyTrComponent {
    @Input('myRow') row;

    selected:boolean;

    onClick(col):void{
        console.log(this.row);
        this.selected = true;
    }

    ngOnInit(){
       // console.log(this);
    }
}



@Component({
    selector: 'table-simple',
    template: `<h3>{{title}}</h3>
    <table class="table table-default">
    <thead>
    <tr>
    <td *ngFor="let val of headers"  >{{val}}</td>
    </tr>
    </thead>
    <tbody>
    <tr *ngFor="let myrow of data" [myRow]="myrow"></tr>
    </tbody>
    </table>`,
    providers: [HTTP_PROVIDERS],
    directives: [MyTrComponent]
})



export class TableComponent {

    @Input('thedata') data:string[][];
    @Input('theheader') headers:string[];
    
    title = "Angular 2 - tr attribute selector";
   // private data:string[][];

    constructor(private http:Http) {
       /* http.get("http://front-desk.ca/tableblue/agents/getagents.php")
            .subscribe((data:any)=> {
                var head:string[]=[];
                var ar:any[]=[];
                var i=0;
                data.json().list.forEach(function(item){
                    var row:string[] =[];
                    if(i++===0)  for(var str in item)head.push(str);
                    for(var str in item) row.push(item[str]);
                    ar.push(row);
                })


                console.log(data);

                this.heads = head;
            this.data = ar;

            });*/

    }

    onClick(col):void{
        console.log(col);
    }
}