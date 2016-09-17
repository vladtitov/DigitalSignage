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
var router_1 = require('@angular/router');
var rss_service_1 = require("../services/rss-service");
var RSSView = (function () {
    // rssContent:SafeHtml;
    function RSSView() {
    }
    RSSView.prototype.ngOnInit = function () {
        // this.rssContent = this._sanitizer.bypassSecurityTrustHtml(this.rssItem.content);
    };
    RSSView.prototype.onCapture = function () {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', rss_service_1.RSSItem)
    ], RSSView.prototype, "rssItem", void 0);
    RSSView = __decorate([
        core_1.Component({
            selector: 'rss-view',
            template: "\n                <div  class=\"rss-item\">\n                    <div *ngIf=\"rssItem\" >\n                      <h3>\n                        {{rssItem.title}}            \n                        </h3>\n                        <div [innerHTML]=\"_sanitizer.bypassSecurityTrustHtml(rssItem.content)\" >            \n                        </div>       \n                    </div>           \n                </div>\n                <!--<button class=\"btn btn-default\" (click)=\"onCapture()\">Capture</button>-->\n            ",
        }), 
        __metadata('design:paramtypes', [])
    ], RSSView);
    return RSSView;
}());
exports.RSSView = RSSView;
var RssContent = (function () {
    function RssContent(router, feed) {
        this.router = router;
        this.feed = feed;
        this.hideRightArrow = true;
        this.bgimage = "url('/app/content-add/arrows.png')";
    }
    RssContent.prototype.onSaveClick = function (evt) {
        var _this = this;
        this.feed.saveOnServer(evt).subscribe(function (res) {
            console.log('onSaveClick res', res);
        }, function (err) {
            console.log('onSaveClick error ', err);
            _this.handleError(err); // = <any>err;
        });
        console.log('onSaveClick ', evt);
    };
    RssContent.prototype.onGetFeed = function (input) {
        var _this = this;
        this.hideArrows = true;
        console.log(input);
        this.feed.getData(input).subscribe(function (data) {
            _this.rssfeeds = data;
            _this.selectedIndex = 0;
            _this.rssSelected = _this.rssfeeds[0];
            console.log(_this.rssSelected);
        }, function (error) { return _this.handleError = error; });
    };
    RssContent.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return errMsg;
    };
    RssContent.prototype.onPreviousRssItem = function () {
        var id = this.rssSelected.id;
        if (id > 0) {
            this.rssSelected = this.rssfeeds[id - 1];
            this.hideRightArrow = true;
        }
        if (id - 1 === 0)
            this.hideLeftArrow = false;
    };
    RssContent.prototype.onNextRssItem = function () {
        var id = this.rssSelected.id;
        if (id < this.rssfeeds.length - 1) {
            this.rssSelected = this.rssfeeds[id + 1];
            this.hideLeftArrow = true;
        }
        if (id + 1 === this.rssfeeds.length - 1)
            this.hideRightArrow = false;
    };
    RssContent.prototype.goBack = function () {
        this.router.navigate(["./content-manager", 'view', 0]);
    };
    RssContent = __decorate([
        core_1.Component({
            selector: 'rss-content',
            // directives:[RSSView],
            providers: [rss_service_1.RSSService],
            template: "<div class=\"wraper\">\n                <div class=\"form-horizontal\">\n                  <div class=\"form-group\">\n                    <label class=\"col-sm-1  control-label\" for=\"UrlOfRSS\">URL</label>\n                    <div class=\"col-sm-11\">\n                        <input type=\"text\" name=\"url\" class=\"form-control\" id=\"UrlOfRSS\" placeholder=\"Enter Url of RSS\"  #urlInput >\n                        <button type=\"button\"  class=\"btn btn-default\" (click)=\"onGetFeed(urlInput.value)\">Get</button>\n                    </div>\n                  </div>\n                  <div class=\"rss-content-view\">\n                        <rss-view [rssItem]=\"rssSelected\" ></rss-view>                  \n                  </div>\n                  <div *ngIf=\"hideArrows\" class=\"buttons-nav\">\n                        <button type=\"button\" class=\"arrow left\"  [style.background-image]=\"bgimage\" *ngIf=\"hideLeftArrow\" (click)=\"onPreviousRssItem()\"></button>\n                        <button type=\"button\" class=\"arrow right\"  [style.background-image]=\"bgimage\" *ngIf=\"hideRightArrow\" (click)=\"onNextRssItem()\"></button>\n                  </div>\n                  <div class=\"buttons\">\n                      <a type=\"submit\" class=\"btn btn-default\" (click)=\"onSaveClick(urlInput.value)\">Save</a>\n                      <button type=\"button\" class=\"btn btn-default\" (click)=\"goBack()\">Close</button>\n                  </div>\n                </div>\n               </div>\n             ",
            styles: ["\n               .wraper {\n                 height: 350px;\n               }\n               \n               .form-group input {\n                 width: 80%;\n                 float: left;\n               }\n               \n               .form-horizontal {\n                 position: relative;\n                 height: 350px;\n               }\n               \n               .arrow {\n                 position: absolute;\n                 top: 80%;\n               }\n               \n               .buttons {\n                 position: absolute;\n                 top: 90%;\n                 left: 60%;\n                 width: 170px;\n               }\n               .arrow {\n                 width: 56px;\n                 height: 30px;\n                 border: none;\n               }\n               \n               .arrow:focus {\n                outline: none;\n               }\n               \n               .left {\n                 left: 35%;\n               }\n               \n               .right {\n                 left: 50%;\n                 transform: scale(-1, 1)\n               }\n               \n               .btn {\n                 margin-left: 20px;\n               }\n               \n               .rss-content-view{\n                 position: absolute;\n                 top:0;\n                 right:-30px;\n                 height: 200px;\n                 transform: scale(0.5);\n               }\n\n               "]
        }), 
        __metadata('design:paramtypes', [router_1.Router, rss_service_1.RSSService])
    ], RssContent);
    return RssContent;
}());
exports.RssContent = RssContent;
//# sourceMappingURL=content-rss.js.map