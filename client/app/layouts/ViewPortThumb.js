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
 * Created by Vlad on 7/23/2016.
 */
var core_1 = require("@angular/core");
var models_1 = require("../services/models");
var ViewPortThumb = (function () {
    function ViewPortThumb() {
        this.scale = 0.2;
        this.borderColor = 'red';
    }
    ViewPortThumb.prototype.ngOnInit = function () {
        this.x = this.item.x * this.scale;
        this.y = this.item.y * this.scale;
        this.width = this.item.width * this.scale;
        this.height = this.item.height * this.scale;
        this.label = this.item.label || '' + this.item.id;
        this.id = this.item.id;
        // console.log(this.item);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', models_1.VOViewport)
    ], ViewPortThumb.prototype, "item", void 0);
    ViewPortThumb = __decorate([
        core_1.Component({
            selector: 'viewport-thumb',
            template: "\n            <div class=\"relative\">           \n                <div class=\"myview\"\n                 [style.top]=item.y [style.left]=x \n                 [style.width]=width \n                 [style.height]=height                \n                 >\n                  <span>{{label}}</span>\n                 </div>\n            </div>\n",
            styles: ["\n              .relative{\n                position:relative;\n              }\n              .myview{\n                  position: absolute;\n                  border: solid thin red;\n              }\n\n"]
        }), 
        __metadata('design:paramtypes', [])
    ], ViewPortThumb);
    return ViewPortThumb;
}());
exports.ViewPortThumb = ViewPortThumb;
//# sourceMappingURL=ViewPortThumb.js.map