"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by Vlad on 7/5/2016.
 */
var core_1 = require('@angular/core');
var http_1 = require("@angular/http");
var MyTrComponent = (function () {
    function MyTrComponent() {
    }
    MyTrComponent.prototype.onClick = function (col) {
        console.log(this.row);
        this.selected = true;
    };
    MyTrComponent.prototype.ngOnInit = function () {
        // console.log(this);
    };
    __decorate([
        core_1.Input('myRow'), 
        __metadata('design:type', Object)
    ], MyTrComponent.prototype, "row", void 0);
    MyTrComponent = __decorate([
        core_1.Component({
            selector: '[myRow]',
            template: "<td (click)=\"onClick(i)\"  *ngFor=\"let val of row ; let i = index\" >{{val}}</td>"
        }), 
        __metadata('design:paramtypes', [])
    ], MyTrComponent);
    return MyTrComponent;
}());
exports.MyTrComponent = MyTrComponent;
var TableComponent = (function () {
    // private data:string[][];
    function TableComponent(http) {
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
        this.http = http;
        this.title = "Angular 2 - tr attribute selector";
    }
    TableComponent.prototype.onClick = function (col) {
        console.log(col);
    };
    __decorate([
        core_1.Input('thedata'), 
        __metadata('design:type', Array)
    ], TableComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input('theheader'), 
        __metadata('design:type', Array)
    ], TableComponent.prototype, "headers", void 0);
    TableComponent = __decorate([
        core_1.Component({
            selector: 'table-simple',
            template: "<h3>{{title}}</h3>\n    <table class=\"table table-default\">\n    <thead>\n    <tr>\n    <td *ngFor=\"let val of headers\"  >{{val}}</td>\n    </tr>\n    </thead>\n    <tbody>\n    <tr *ngFor=\"let myrow of data\" [myRow]=\"myrow\"></tr>\n    </tbody>\n    </table>",
            providers: [http_1.HTTP_PROVIDERS],
            directives: [MyTrComponent]
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], TableComponent);
    return TableComponent;
}());
exports.TableComponent = TableComponent;
//# sourceMappingURL=MyTable.js.map