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
var checkbox_1 = require('@angular2-material/checkbox');
var message_model_1 = require("./message-model");
var MessageList = (function () {
    function MessageList() {
    }
    MessageList.prototype.toggleEditable = function (message) {
        this.message = message;
        this.messages.forEach(function (item) {
            if (item !== message)
                item.editable = false;
        });
        this.message.editable = !this.message.editable;
    };
    MessageList.prototype.toggleChangeActive = function (message) {
        this.message = message;
        this.message.active = !this.message.active;
    };
    MessageList.prototype.inputChange = function (message, event) {
        this.message = message;
        this.message.title = event.target.outerText;
    };
    MessageList.prototype.onSelected = function (message) {
        this.message = message;
        this.messages.forEach(function (item) {
            if (item !== message)
                item.selected = false;
        });
        this.message.selected = !this.message.selected;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], MessageList.prototype, "messages", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', message_model_1.Message)
    ], MessageList.prototype, "message", void 0);
    MessageList = __decorate([
        core_1.Component({
            selector: 'message-list',
            template: "<md-data-table>\n                <thead>\n                <tr>\n                    <th class=\"md-text-cell\">Active</th>\n                    <th class=\"md-text-cell\">Content</th>\n                </tr>\n                </thead>\n                <tbody *ngIf=\"messages.length > 0\">\n                    <tr *ngFor=\"let message of messages\" [ngClass]=\"{'selected': message.selected, 'editable': message.editable}\" (click)=\"onSelected(message)\">\n                        <td class=\"md-text-cell\">\n                            <md-checkbox (change)=\"toggleChangeActive(message)\" [checked]=\"message.active\"></md-checkbox>\n                        </td>\n                        <td class=\"md-text-cell\" attr.contenteditable = \"{{ message.editable }}\" (input)=\"inputChange(message, $event)\" (click)=\"toggleEditable(message)\">\n                            {{ message.body}}\n                        </td>\n                </tr>\n                </tbody>\n                </md-data-table>\n                ",
            styles: ["\n    .selected {\n    background-color: khaki;\n    }\n    .selected{\n        background-color: #fbfff0;\n    }"],
            directives: [checkbox_1.MdCheckbox]
        }), 
        __metadata('design:paramtypes', [])
    ], MessageList);
    return MessageList;
}());
exports.MessageList = MessageList;
//# sourceMappingURL=message-list.js.map