/**
 * Created by Vlad on 7/6/2016.
 */
import {Component, Input} from '@angular/core';
import {TableObject} from "../table/TableObject";
import {HTTP_PROVIDERS, Http} from "@angular/http";

@Component({
    selector: 'agents',
    template: `
    <h1 class="title">Agents 2</h1>
    <div class="panel panel-default">
      <div></div>
      <div class="panel-body">
      <table-object [thedata]="mydata" [header]="header"></table-object>
      </div>
      
    </div>
      `,
    directives: [TableObject]
})


export class AgentsManager{
    table:TableObject
    myurl:string = '';
    header:string ='Agents Header';
   mydata:string[][];
    private myheads:string[];
    constructor(private http:Http) {
        http.get("http://front-desk.ca/tableblue/agents/getagents.php")
            .subscribe((data:any)=> {

              /*  var head:string[]=[];
                var ar:any[]=[];
                var i=0;
                data.json().list.forEach(function(item){
                    var row:string[] =[];
                    if(i++===0)  for(var str in item)head.push(str);
                    for(var str in item) row.push(item[str]);
                    ar.push(row);
                })


                console.log(ar);
*/
              //  this.myheads = head;


                this.mydata = data.json().list;
                console.log(this.mydata);

            });

    }

}

