/**
 * Created by Vlad on 7/6/2016.
 */
import {Component, Input} from '@angular/core';
import {TableComponent} from "../table/MyTable";
import {HTTP_PROVIDERS, Http} from "@angular/http";

@Component({
    selector: 'agents',
    template: `
    <h1 class="title">Agents</h1>
    <div class="panel panel-default">
      <div></div>
      <div class="panel-body">
      <table-simple [thedata]="mydata" [theheader]="myheads"></table-simple>
      </div>      
    </div>      
    `,
    directives: [TableComponent]
})


export class AgentsManager{
    table:TableComponent
    myurl:string = '';
    title:string ='Agents Header';
    mydata:string[][];
    private myheads:string[];
    constructor(private http:Http) {
        http.get("http://front-desk.ca/tableblue/agents/getagents.php")
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


                console.log(ar);

                this.myheads = head;
                this.mydata = ar;

            });

    }

}

