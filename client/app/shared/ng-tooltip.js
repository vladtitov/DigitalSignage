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
var core_1 = require('@angular/core');
var NgTooltip = (function () {
    // message:string;
    function NgTooltip(el) {
        this.el = el.nativeElement;
    }
    Object.defineProperty(NgTooltip.prototype, "isTooltip", {
        set: function (res) {
            if (res && (this.message == 'success')) {
                this.showSuccess();
            }
            else if (res && (this.message == 'error')) {
                this.showError();
            }
            else {
                this.hideTooltip();
            }
            console.log('message: ', this.message, res);
        },
        enumerable: true,
        configurable: true
    });
    NgTooltip.prototype.showSuccess = function () {
        this.el.style.visibility = 'visible';
        this.el.style.opacity = '1';
        this.el.style.backgroundColor = '#5cb85c';
    };
    NgTooltip.prototype.showError = function () {
        this.el.style.visibility = 'visible';
        this.el.style.opacity = '1';
        this.el.style.backgroundColor = '#d9534f';
    };
    NgTooltip.prototype.hideTooltip = function () {
        this.el.style.visibility = 'hidden';
        this.el.style.opacity = '0';
        this.el.style.backgroundColor = '#000';
    };
    __decorate([
        core_1.Input('ng-tooltip'), 
        __metadata('design:type', String)
    ], NgTooltip.prototype, "message", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], NgTooltip.prototype, "isTooltip", null);
    NgTooltip = __decorate([
        core_1.Directive({
            selector: '[ng-tooltip]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], NgTooltip);
    return NgTooltip;
}());
exports.NgTooltip = NgTooltip;
//# sourceMappingURL=ng-tooltip.js.map