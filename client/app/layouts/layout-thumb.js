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
var LayoutThumb = (function () {
    function LayoutThumb() {
        this.layout = new models_1.VOLayout({});
    }
    LayoutThumb.prototype.ngOnInit = function () {
        // console.log(this.layout);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', models_1.VOLayout)
    ], LayoutThumb.prototype, "layout", void 0);
    LayoutThumb = __decorate([
        core_1.Component({
            selector: 'layout-thumb',
            template: "\n            <div class=\"mythumb\" [class.box-selected]=\"layout.selected\">\n            \n                  <div class=\"myimage-container\">\n                      <img  class=\"myimage\" src=\"{{layout.props.image}}\"/>       \n                  </div>\n                  <div class=\"myid\"><span>{{layout.props.id}}</span></div>\n                  <div class=\"params pos-bottom\">\n                  <div>{{layout.props.label}}</div>\n                  \n                </div>\n                           \n            </div>\n",
            styles: ["\n\n\n \n\n"]
        }), 
        __metadata('design:paramtypes', [])
    ], LayoutThumb);
    return LayoutThumb;
}());
exports.LayoutThumb = LayoutThumb;
//# sourceMappingURL=layout-thumb.js.map