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
 * Created by админ on 16.09.2016.
 */
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var ng2_md_tooltip_1 = require("./ng2-md-tooltip/ng2-md-tooltip");
var tooltip_text_1 = require("./ng2-md-tooltip/tooltip-text");
var position_serv_1 = require("./ng2-md-tooltip/position-serv");
var content_filter_pipe_1 = require("../assets/content-filter.pipe");
var content_search_pipe_1 = require("../assets/content-search.pipe");
var asset_card_1 = require("../assets/asset-card");
var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [
                ng2_md_tooltip_1.Ng2MdTooltip,
                tooltip_text_1.TooltipText,
                content_filter_pipe_1.ContentFilterPipe,
                content_search_pipe_1.ContentSearchPipe,
                asset_card_1.AssetCard
            ],
            exports: [ng2_md_tooltip_1.Ng2MdTooltip, content_filter_pipe_1.ContentFilterPipe, content_search_pipe_1.ContentSearchPipe, asset_card_1.AssetCard],
            entryComponents: [tooltip_text_1.TooltipText],
            providers: [position_serv_1.PositionService]
        }), 
        __metadata('design:paramtypes', [])
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map