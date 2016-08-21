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
 * Created by Vlad on 7/6/2016.
 */
var core_1 = require('@angular/core');
var MyTable_1 = require("../table/MyTable");
var http_1 = require("@angular/http");
var AgentsManager = (function () {
    function AgentsManager(http) {
        var _this = this;
        this.http = http;
        this.myurl = '';
        this.title = 'Agents Header';
        http.get("http://front-desk.ca/tableblue/agents/getagents.php")
            .subscribe(function (data) {
            var head = [];
            var ar = [];
            var i = 0;
            data.json().list.forEach(function (item) {
                var row = [];
                if (i++ === 0)
                    for (var str in item)
                        head.push(str);
                for (var str in item)
                    row.push(item[str]);
                ar.push(row);
            });
            console.log(ar);
            _this.myheads = head;
            _this.mydata = ar;
        });
    }
    AgentsManager = __decorate([
        core_1.Component({
            selector: 'agents',
            template: "\n    <h1 class=\"title\">Agents</h1>\n    <div class=\"panel panel-default\">\n      <div></div>\n      <div class=\"panel-body\">\n      <table-simple [thedata]=\"mydata\" [theheader]=\"myheads\"></table-simple>\n      </div>      \n    </div>      \n    ",
            directives: [MyTable_1.TableComponent]
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AgentsManager);
    return AgentsManager;
}());
exports.AgentsManager = AgentsManager;
//# sourceMappingURL=AgentsManager.js.map