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
 * Created by Vlad on 7/19/2016.
 */
/// <reference path="../../typings/moment/moment.d.ts" />
var core_1 = require("@angular/core");
var moment = require('moment');
var TimeCellCompnent = (function () {
    function TimeCellCompnent() {
        this.timecell = new TimeCellVO(0);
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', TimeCellVO)
    ], TimeCellCompnent.prototype, "timecell", void 0);
    TimeCellCompnent = __decorate([
        core_1.Component({
            selector: "time-cell",
            template: "\n            <div class=\"mycell\">\n                <div class=\"mytime\"> {{timecell.time}}</div> \n                <div class=\"dashline\">\n                    <svg height=\"1\" width=\"128\">\n                          <g fill=\"none\" stroke=\"black\" stroke-width=\"2\">                       \n                            <path stroke-dasharray=\"10,10\" d=\"M5 0 128 0\" />                        \n                          </g>\n                     </svg>\n                </div>\n            </div>\n",
            styles: ["\n      .mycell{\n            width: 128px;\n            background-color: #4b7caa;\n            color: white;              \n      }\n      .mytime{\n            transform:translateX(-15px);\n      }\n      .dashline{\n      transform:translate(-64px,64px) rotate(90deg);\n       \n      }\n    \n\n\n"]
        }), 
        __metadata('design:paramtypes', [])
    ], TimeCellCompnent);
    return TimeCellCompnent;
}());
exports.TimeCellCompnent = TimeCellCompnent;
var TimeCellVO = (function () {
    function TimeCellVO(num) {
        this.num = num;
        this.time = '';
        this.id = num;
        this.time = moment.unix(num * 10).format('mm:ss');
    }
    return TimeCellVO;
}());
exports.TimeCellVO = TimeCellVO;
//# sourceMappingURL=TimeCell.js.map