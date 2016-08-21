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
 * Created by Vlad on 7/17/2016.
 */
var core_1 = require("@angular/core");
var UtilsServices = (function () {
    function UtilsServices() {
    }
    UtilsServices.prototype.getUrlParams = function (str) {
        var _this = this;
        var ar = str.split('?');
        if (ar.length == 1)
            return null;
        ar.shift();
        var out = [];
        ar.forEach(function (item) { return _this.parserParams(out, item); });
        return out;
    };
    UtilsServices.prototype.parserParams = function (out, str) {
        var ar = str.split('&');
        ar.forEach(function (item) {
            var vars = item.split('=');
            if (vars.length === 2)
                out[vars[0]] = isNaN(Number(vars[1])) ? vars[1] : Number(vars[1]);
        });
        return out;
    };
    UtilsServices = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], UtilsServices);
    return UtilsServices;
}());
exports.UtilsServices = UtilsServices;
//# sourceMappingURL=UtilsServices.js.map