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
var core_1 = require("@angular/core");
var position_serv_1 = require("./position-serv");
var TooltipText = (function () {
    function TooltipText(element, changeDetector) {
        this.element = element;
        this.changeDetector = changeDetector;
    }
    TooltipText.prototype.setPosition = function (hostEl, placement) {
        this.top = "-1000px";
        // this.right = "-1000px";
        // this.bottom = "-1000px";
        this.left = "-1000px";
        this.hostEl = hostEl;
        this.placement = placement;
    };
    TooltipText.prototype.ngAfterViewInit = function () {
        var _a = position_serv_1.positionService.positionElements(this.hostEl.nativeElement, this.element.nativeElement.children[0], this.placement), top = _a.top, left = _a.left;
        this.top = top + "px";
        this.left = left + "px";
        this.changeDetector.detectChanges();
    };
    TooltipText = __decorate([
        core_1.Component({
            selector: "tooltip-text",
            template: "\n<div class=\"tooltip-text bg-{{color}}\" [ngStyle]=\"{top: top, left: left}\">{{content}}</div>\n",
            styles: ["\n .tooltip-text {\n        text-transform: none;\n        font-size: 12px;\n        font-weight: 500;\n\n        background-color: rgba(97,97,97,0.9);\n        color: #fff;\n        text-align: center;\n        border-radius: 4px;\n\n        /* Position the tooltip text */\n        position: absolute;\n        z-index: 100;\n        \n        transition: opacity 1s;\n        height: 22px;\n        line-height: 22px;\n        padding-left: 8px;\n        padding-right: 8px;\n    }\n    .tooltip-text.bg-green {\n        background-color: #5cb85c;\n    }\n    .tooltip-text.bg-red {\n        background-color: #d9534f;\n    }\n"]
        }),
        __param(1, core_1.Inject(core_1.ChangeDetectorRef)), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.ChangeDetectorRef])
    ], TooltipText);
    return TooltipText;
}());
exports.TooltipText = TooltipText;
//# sourceMappingURL=tooltip-text.js.map