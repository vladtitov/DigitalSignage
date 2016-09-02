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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
//courtesy of http://valor-software.github.io/ng2-bootstrap
var core_1 = require("@angular/core");
var PositionService = (function () {
    function PositionService(resolver) {
        this.resolver = resolver;
        this.OFFSET = 12;
    }
    PositionService.prototype.positionElement = function (refEl, tooltipEl, options, appendToBody) {
        //return {top:20, left:20};
        if (appendToBody === void 0) { appendToBody = false; }
        var placement = options.placement || 'top';
        var refElRec = refEl.getBoundingClientRect();
        // console.log(refElRec);
        var tooltipRec = tooltipEl.getBoundingClientRect();
        var pos = {};
        var top = refElRec.top - tooltipRec.top;
        var left = refElRec.left - tooltipRec.left;
        var out;
        switch (placement) {
            case "right":
                out = {
                    top: top + ((refElRec.height - tooltipRec.height) / 2),
                    left: left + refElRec.width + this.OFFSET
                };
                break;
            case "left":
                out = {
                    top: top + ((refElRec.height - tooltipRec.height) / 2),
                    left: left - tooltipRec.width - this.OFFSET
                };
                break;
            case "bottom":
                out = {
                    top: top + refElRec.height + this.OFFSET,
                    left: left - (tooltipRec.width / 2 - refElRec.width / 2)
                };
                break;
            default:
                out = {
                    top: top - tooltipRec.height - this.OFFSET,
                    left: left - (tooltipRec.width / 2 - refElRec.width / 2)
                };
                break;
        }
        return out;
    };
    PositionService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(core_1.ComponentFactoryResolver)), 
        __metadata('design:paramtypes', [core_1.ComponentFactoryResolver])
    ], PositionService);
    return PositionService;
}());
exports.PositionService = PositionService;
//# sourceMappingURL=position-serv.js.map