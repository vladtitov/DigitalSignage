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
 * Created by Vlad on 8/21/2016.
 */
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var router_1 = require("@angular/router");
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var app_routing_1 = require('./app.routing');
var assets_module_1 = require("./assets/assets.module");
var playlist_module_1 = require("./play-list/playlist.module");
var layouts_module_1 = require("./layouts/layouts.module");
var devices_module_1 = require("./device/devices.module");
var shared_module_1 = require("./shared/shared.module");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                http_1.JsonpModule,
                router_1.RouterModule.forRoot(app_routing_1.routerConfig),
                assets_module_1.AssetsModule,
                playlist_module_1.PlaylistModule,
                layouts_module_1.LayoutsModule,
                devices_module_1.DevicesModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                app_component_1.AppComponent
            ],
            providers: [],
            // entryComponents: [ TooltipText ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map