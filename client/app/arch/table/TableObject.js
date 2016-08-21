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
var TableObject = (function () {
    function TableObject(http) {
        this.http = http;
        this.title = 'Data ';
        // private data:string[][];
        this.heads = [];
    }
    TableObject.prototype.onClick = function (row) {
        console.log(row);
    };
    TableObject.prototype.onNameClick = function (row) {
        console.log(row);
    };
    __decorate([
        core_1.Input('thedata'), 
        __metadata('design:type', Array)
    ], TableObject.prototype, "data", void 0);
    TableObject = __decorate([
        core_1.Component({
            selector: 'table-object',
            template: "<h3>{{title}}</h3>\n    <table class=\"table table-default\">\n    <thead>\n        <tr>\n            <td >id</td>\n            <td >Name</td>\n            <td >State</td>\n            <td >time</td>\n        </tr>\n    </thead>\n    <tbody>\n        <tr (click)=\"onClick(row)\" *ngFor=\"let row of data\" >\n            <td>{{row.id}}</td>\n            <td (click)=\"onNameClick(row.name)\" >{{row.name}}</td>\n            <td>\n            <md-card>\n                   <md-card-title-group>\n                      <img md-card-sm-image src=\"css/{{row.state}}.png\">\n                      <md-card-title>Card with title</md-card-title>\n                      <md-card-subtitle>Subtitle</md-card-subtitle>\n                   </md-card-title-group>\n                </md-card>           \n            </td>\n            <td>{{row.time}}</td>\n        </tr>\n    </tbody>\n    </table>",
            providers: [http_1.HTTP_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], TableObject);
    return TableObject;
}());
exports.TableObject = TableObject;
//# sourceMappingURL=TableObject.js.map