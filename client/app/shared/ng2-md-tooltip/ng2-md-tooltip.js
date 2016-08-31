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
var Ng2MdTooltip = (function () {
    function Ng2MdTooltip(elementRef, resolver) {
        this.elementRef = elementRef;
        this.resolver = resolver;
        this.visible = false;
    }
    /* constructor(@Inject(ViewContainerRef) private elementRef:ViewContainerRef,  @Inject(ComponentResolver) private resolver:ComponentResolver) {
     }*/
    Ng2MdTooltip.prototype.ngOnChanges = function (changes) {
        if (!changes.tooltip.currentValue)
            this.hide();
        else {
            console.log(changes);
            this.tooltip = changes.tooltip.currentValue;
            this.show();
        }
    };
    // @HostListener("focusin")
    // @HostListener("mouseenter")
    Ng2MdTooltip.prototype.show = function () {
        if (!this.visible) {
            this.visible = true;
            var fact = this.resolver.resolveComponentFactory(tooltip_text_1.TooltipText);
            var component = this.elementRef.createComponent(fact);
            component.instance.content = this.tooltip;
            component.instance.color = this.tooltipColor;
            component.instance.setPosition(this.elementRef.element, this.placement);
            this.mytooltip = component;
        }
    };
    // @HostListener("focusout")
    // @HostListener("mouseleave")
    Ng2MdTooltip.prototype.hide = function () {
        if (this.visible) {
            this.visible = false;
            this.mytooltip.destroy();
        }
    };
    __decorate([
        core_1.Input("ng2-md-tooltip"), 
        __metadata('design:type', String)
    ], Ng2MdTooltip.prototype, "tooltip", void 0);
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
        __metadata('design:paramtypes', [core_1.ViewContainerRef, core_1.ComponentFactoryResolver])
    ], Ng2MdTooltip);
    return Ng2MdTooltip;
}());
exports.Ng2MdTooltip = Ng2MdTooltip;
//# sourceMappingURL=ng2-md-tooltip.js.map