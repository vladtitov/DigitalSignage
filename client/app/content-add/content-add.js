/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */
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
//import { MD_TABS_DIRECTIVES } from '@angular2-material/tabs';
var router_1 = require('@angular/router');
// import {FileContent} from "./content-files";
//import {RssContent} from "./content-rss";
//import {WebContent} from "./content-web";
var AddContent = (function () {
    function AddContent(router, activatedRoute) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.selectedIndex = 0;
        this.hided = new core_1.EventEmitter();
        this.showed = new core_1.EventEmitter();
        this.closed = new core_1.EventEmitter();
        this.changed = new core_1.EventEmitter();
    }
    AddContent.prototype.ngOnInit = function () {
        var _this = this;
        this.paramsSub = this.activatedRoute.params.subscribe(function (params) {
            switch (params['contm2']) {
                case "files":
                    _this.selectedIndex = 0;
                    break;
                case "rss":
                    _this.selectedIndex = 1;
                    break;
                case "web-content":
                    _this.selectedIndex = 2;
                    break;
            }
            ;
            _this.contm2 = +params['contm2'];
        });
        /*        this.router.navigate(['./files']);*/
    };
    AddContent.prototype.ngOnDestroy = function () {
        this.paramsSub.unsubscribe();
    };
    AddContent.prototype.handleFocus = function (evt) {
    };
    AddContent.prototype.onHided = function () {
        this.hided.emit(null);
    };
    AddContent.prototype.onShowed = function () {
        this.showed.emit(null);
    };
    AddContent.prototype.onModalClose = function () {
        this.closed.emit(null);
    };
    AddContent.prototype.onUpload = function () {
        this.changed.emit(null);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AddContent.prototype, "hided", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AddContent.prototype, "showed", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AddContent.prototype, "closed", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AddContent.prototype, "changed", void 0);
    AddContent = __decorate([
        core_1.Component({
            selector: 'add-content',
            template: "\n                <div class=\"add-content\">\n                    <multiple-progressbar \n                            (hided)=\"onHided()\" \n                            (showed)=\"onShowed()\"\n                            (closed)=\"onModalClose()\"\n                            (changed)=\"onUpload()\">\n                    </multiple-progressbar>\n                </div>\n  ",
            styles: ["\n                .add-content-title {\n                    margin-top: 20px;\n                    text-align: center;\n                    font-weight: bold;\n                }\n            "],
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute])
    ], AddContent);
    return AddContent;
}());
exports.AddContent = AddContent;
//# sourceMappingURL=content-add.js.map