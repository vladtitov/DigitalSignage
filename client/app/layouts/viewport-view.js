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
 * Created by Vlad on 7/29/2016.
 */
/**
 * Created by Vlad on 7/21/2016.
 */
var core_1 = require("@angular/core");
var models_1 = require("../services/models");
var ViewPortView = (function () {
    function ViewPortView() {
        this.onview = new core_1.EventEmitter();
        this.toggleview = true;
        this.borderColor = 'thin solid black';
    }
    ViewPortView.prototype.ngOnInit = function () {
        console.log(this.item);
    };
    ViewPortView.prototype.onDragEnter = function (evt) {
        console.log("enter");
        /* setTimeout( () => {this.dragService.onDragEnd = (item) => {
             this.item.playlistid = item.id;
             this.item.image = item.image;
             console.log(item);
         }*/
        //  this.borderColor = 'thin solid red';}, 100);
        /*this.dragService.emitDragEnd.subscribe(
         (item) => {
         this.item.playlistid = item.id;
         this.item.image = item.image;
         }
         )*/
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', models_1.VOViewport)
    ], ViewPortView.prototype, "item", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ViewPortView.prototype, "onview", void 0);
    ViewPortView = __decorate([
        core_1.Component({
            selector: 'viewport-view',
            template: "    \n                <div class=\"mydiv\"\n                 [style.top]=item.y [style.left]=item.x \n                 [style.width]=item.width \n                 [style.height]=item.height\n                 [style.border]=borderColor\n                >\n                    <img src=\"{{ item.image }}\" width=\"{{ item.width }}\" height=\" {{ item.height }}\">\n                        \n                    <div class=\"cover\"\n                        (dragenter)=\"onDragEnter($event)\"\n                        (dragleave)=\"onDragLeave($event)\"\n                        (click)=\"onClickViewport($event)\"\n                        >                \n                     </div>      \n                         \n                </div>\n            ",
            styles: ["\n             .mydiv {\n                 background-color: whitesmoke; \n                       \n                 position: absolute;\n                 }\n                 .cover{\n                     position: absolute;\n                     top:0;\n                     left: 0;\n                     width: 100%;\n                     height: 100%;\n                     z-index: 1000;\n                     background-color: rgba(255, 255, 255, 0.1);\n             }\n            "],
        }), 
        __metadata('design:paramtypes', [])
    ], ViewPortView);
    return ViewPortView;
}());
exports.ViewPortView = ViewPortView;
//# sourceMappingURL=viewport-view.js.map