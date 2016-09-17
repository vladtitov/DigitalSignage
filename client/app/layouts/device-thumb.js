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
var DeviceThumb = (function () {
    function DeviceThumb() {
    }
    DeviceThumb.prototype.ngOnInit = function () {
        // console.log(this.layout);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', models_1.VOLayout)
    ], DeviceThumb.prototype, "layout", void 0);
    DeviceThumb = __decorate([
        core_1.Component({
            selector: 'device-thumb',
            template: "\n            <div class=\"relative\">\n                        <div *ngFor=\"let myport of layout.viewports\">                         \n                        <viewport-thumb [item]=\"myport\"></viewport-thumb>\n                       </div>\n            \n            </div>\n",
            styles: ["\n\n.relative{\nposition: relative;\n}\n\n"]
        }), 
        __metadata('design:paramtypes', [])
    ], DeviceThumb);
    return DeviceThumb;
}());
exports.DeviceThumb = DeviceThumb;
//# sourceMappingURL=device-thumb.js.map