/**
 * Created by Vlad on 7/5/2016.
 */
import {Component, Input, ElementRef} from '@angular/core';
import {HTTP_PROVIDERS, Http} from "@angular/http";



@Component({
    selector: 'table-object',
    template: `<h3>{{title}}</h3>
    <table class="table table-default">
    <thead>
        <tr>
            <td >id</td>
            <td >Name</td>
            <td >State</td>
            <td >time</td>
        </tr>
    </thead>
    <tbody>
        <tr (click)="onClick(row)" *ngFor="let row of data" >
            <td>{{row.id}}</td>
            <td (click)="onNameClick(row.name)" >{{row.name}}</td>
            <td>
            <md-card>
                   <md-card-title-group>
                      <img md-card-sm-image src="css/{{row.state}}.png">
                      <md-card-title>Card with title</md-card-title>
                      <md-card-subtitle>Subtitle</md-card-subtitle>
                   </md-card-title-group>
                </md-card>           
            </td>
            <td>{{row.time}}</td>
        </tr>
    </tbody>
    </table>`,
    providers: [HTTP_PROVIDERS]
})



export class TableObject {

    @Input('thedata') data:string[][];

    title = 'Data ';
   // private data:string[][];
    private heads:string[]=[]
    constructor(private http:Http) {

    }

    onClick(row):void{
        console.log(row);
    }
    onNameClick(row):void{
        console.log(row);
    }
}