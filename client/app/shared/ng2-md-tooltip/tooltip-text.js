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
    function TooltipText(elementRef, positionService, changeDetector) {
        this.elementRef = elementRef;
        this.positionService = positionService;
        this.changeDetector = changeDetector;
    }
    TooltipText.prototype.setPosition = function (refEl, options) {
        this.refEl = refEl;
        this.options = options;
        this.myStyle = {};
        this.myStyle.top = 0;
        this.myStyle.left = 0;
        // console.log(options);
        this.message = options.message;
        this.myClass = options.tooltip_class || 'btn-primary';
        this.count = 0;
        if (this.isInit)
            this.placeElement();
    };
    TooltipText.prototype.ngAfterViewInit = function () {
        this.isInit = true;
        if (this.options)
            this.placeElement();
    };
    TooltipText.prototype.placeElement = function () {
        this.count++;
        var _a = this.positionService.positionElement(this.refEl.nativeElement, this.elementRef.nativeElement.children[0], this.options), top = _a.top, left = _a.left;
        this.myStyle.top = top + "px";
        this.myStyle.left = left + "px";
        this.myStyle.opacity = 1.0;
        this.changeDetector.detectChanges();
    };
    TooltipText.prototype.removeMe = function (callBack) {
        this.myStyle.opacity = 0;
        setTimeout(callBack, 500);
    };
    TooltipText = __decorate([
        core_1.Component({
            selector: "tooltip-text",
            template: "\n        <div class=\"tooltip-text {{myClass}}\" [ngStyle]=\"myStyle\">{{message}}</div>\n",
            providers: [position_serv_1.PositionService]
        }),
        __param(2, core_1.Inject(core_1.ChangeDetectorRef)), 
        __metadata('design:paramtypes', [core_1.ElementRef, position_serv_1.PositionService, core_1.ChangeDetectorRef])
    ], TooltipText);
    return TooltipText;
}());
exports.TooltipText = TooltipText;
//# sourceMappingURL=tooltip-text.js.map