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
var message_service_1 = require('../services/message-service');
var MessagesMain = (function () {
    function MessagesMain(messageService) {
        this.messageService = messageService;
        this.mode = 'Observable';
        this.messages = [];
    }
    MessagesMain.prototype.ngOnInit = function () {
        this.getMessages();
    };
    MessagesMain.prototype.getMessages = function () {
        var _this = this;
        this.messageService.getMessages()
            .subscribe(function (messages) { return _this.messages = messages; }, function (error) { return _this.errorMessage = error; });
    };
    MessagesMain.prototype.saveMessages = function () {
        var _this = this;
        this.messageService.saveMessages(this.messages)
            .subscribe(function (res) {
            console.log(res);
        }, function (error) { return _this.errorMessage = error; });
    };
    MessagesMain.prototype.onMessageAdded = function (message) {
        this.messages.push(message);
    };
    MessagesMain.prototype.onMessageDeleted = function () {
        var item;
        this.messages.forEach(function (message) {
            if (message.selected === true)
                item = message;
        });
        if (item) {
            var index = this.messages.indexOf(item);
            if (index > -1) {
                this.messages.splice(index, 1);
            }
        }
    };
    MessagesMain = __decorate([
        core_1.Component({
            selector: 'div',
            template: "<div class =\"panel panel-default\">\n               <div class=\"panel-heading\">\n               <message-tools (added)=\"onMessageAdded($event)\" (deleted)=\"onMessageDeleted()\" (saved)=\"saveMessages()\"></message-tools>\n               </div>\n               <div class=\"panel-body\">\n               <message-list [messages]=\"messages\"></message-list>\n               </div>\n               </div>",
            styleUrls: ['app/messages/messages-main.css'],
            // directives: [MessageTools, MessageList],
            providers: [message_service_1.MessageService]
        }), 
        __metadata('design:paramtypes', [message_service_1.MessageService])
    ], MessagesMain);
    return MessagesMain;
}());
exports.MessagesMain = MessagesMain;
//# sourceMappingURL=messages-main.js.map