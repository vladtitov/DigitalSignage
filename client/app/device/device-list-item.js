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
 * Created by админ on 29.07.2016.
 */
var core_1 = require("@angular/core");
var models_1 = require("../services/models");
var layout_editor_service_1 = require("../layout-editor/layout-editor-service");
var DeviceListItem = (function () {
    function DeviceListItem(layoutService) {
        this.layoutService = layoutService;
        this.mydevice = new models_1.VODevice({});
        this.currentLayout = new models_1.VOLayout({});
    }
    DeviceListItem.prototype.ngOnInit = function () {
        var _this = this;
        var id = +this.mydevice.layout_id;
        if (isNaN(id) || id === 0)
            return;
        this.layoutService.getLayoutById2(id)
            .subscribe(function (data) {
            _this.currentLayout = data;
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', models_1.VODevice)
    ], DeviceListItem.prototype, "mydevice", void 0);
    DeviceListItem = __decorate([
        core_1.Component({
            selector: 'device-list-item',
            template: "\n<div [class.selected]=\"mydevice.selected\" class=\"myitem\">\n            <div class=\"deviceVO float-left item-128\">\n                <div class=\"myid\"><span>{{mydevice.id}}</span></div>\n                <div class=\"fa fa-desktop icon\"></div>\n                <div class=\"deviceText\">{{mydevice.label}}</div>\n                <div class=\"deviceText\">{{mydevice.description}}</div>\n            </div>\n            <div class=\"layoutVO float-left item-128\">\n                <div class=\"pos-relative\">\n                    <div class=\"pos-absolute item-128\" >\n                        <img class=\"pos-center max-128\" src=\"{{currentLayout.props.image}}\" />\n                    </div>\n                </div>\n                <div class=\"myid\" *ngIf=\"currentLayout.props.id>0\"><span>{{currentLayout.props.id}}</span></div>\n            </div>\n</div>\n\n",
            styles: ["\n        .myitem{\n            width: 260px;\n            height: 128px;\n        }\n        .deviceVO{\n            text-align: center;\n            padding: 22px 0;\n            position: relative;\n        }\n        .layoutVO{\n            position: relative;\n        }\n        .image{\n        \n        }\n        .deviceText{\n            width: 128px;\n            white-space: nowrap;\n            overflow: hidden;\n            text-overflow: ellipsis;\n        }\n        .icon{\n            font-size: 50px;\n        }\n        .selected{\n            border:thin solid red;\n        }\n"]
        }), 
        __metadata('design:paramtypes', [layout_editor_service_1.LayoutEditorService])
    ], DeviceListItem);
    return DeviceListItem;
}());
exports.DeviceListItem = DeviceListItem;
//# sourceMappingURL=device-list-item.js.map