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
var core_1 = require("@angular/core");
var tooltip_text_1 = require("./tooltip-text");
var position_serv_1 = require("./position-serv");
var Ng2MdTooltip = (function () {
    function Ng2MdTooltip(elementRef, viewContainerRef, resolver, positionService) {
        this.elementRef = elementRef;
        this.viewContainerRef = viewContainerRef;
        this.resolver = resolver;
        this.positionService = positionService;
        this.placement = 'top';
        this.visible = false;
        this.timeout = 3;
    }
    Ng2MdTooltip.prototype.ngOnChanges = function (changes) {
        if (!changes.options.currentValue)
            this.hide();
        else {
            var options;
            if (typeof changes.options.currentValue === 'object') {
                options = changes.options.currentValue;
            }
            else {
                options = {};
                options.message = changes.options.currentValue;
            }
            //console.log(options);
            options.placement = options.placement || this.placement || 'top';
            this.show(options);
        }
    };
    // @HostListener("focusin")
    // @HostListener("mouseenter")
    Ng2MdTooltip.prototype.show = function (options) {
        var _this = this;
        if (!this.visible) {
            this.visible = true;
            var fact = this.resolver.resolveComponentFactory(tooltip_text_1.TooltipText);
            var component = this.viewContainerRef.createComponent(fact);
            component.instance.setPosition(this.elementRef, options);
            this.mytooltip = component;
            var timeout = options.timeout || 3000;
            setTimeout(function () { return _this.hide(); }, timeout);
        }
    };
    // @HostListener("focusout")
    // @HostListener("mouseleave")
    Ng2MdTooltip.prototype.hide = function () {
        if (this.visible) {
            // this.tooltip='';
            this.visible = false;
            var comp = this.mytooltip;
            this.mytooltip.instance.removeMe(function () {
                comp.destroy();
            });
        }
    };
    __decorate([
        core_1.Input("ng2-md-tooltip"), 
        __metadata('design:type', Object)
    ], Ng2MdTooltip.prototype, "options", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Ng2MdTooltip.prototype, "placement", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Ng2MdTooltip.prototype, "tooltipColor", void 0);
    Ng2MdTooltip = __decorate([
        core_1.Directive({
            selector: "[ng2-md-tooltip]"
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.ViewContainerRef, core_1.ComponentFactoryResolver, position_serv_1.PositionService])
    ], Ng2MdTooltip);
    return Ng2MdTooltip;
}());
exports.Ng2MdTooltip = Ng2MdTooltip;
//# sourceMappingURL=ng2-md-tooltip.js.map