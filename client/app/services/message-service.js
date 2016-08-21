/**
 * Created by Dmitriy Prilutsky on 05.07.2016.
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
var http_1 = require('@angular/http');
var message_model_1 = require('../messages/message-model');
var Observable_1 = require('rxjs/Observable');
var MessageService = (function () {
    function MessageService(http) {
        this.http = http;
        this.messagesUrl = '/api/messages/test/all';
    }
    MessageService.prototype.getMessages = function () {
        return this.http.get(this.messagesUrl)
            .map(this.parse)
            .catch(this.handleError);
    };
    MessageService.prototype.saveMessages = function (msgs) {
        var out = [];
        msgs.forEach(function (item) {
            out.push({ id: item.id, active: item.active, body: item.body });
        });
        return this.http.post(this.messagesUrl, out)
            .catch(this.handleError);
    };
    MessageService.prototype.addMessage = function (name) {
        var body = JSON.stringify({ name: name });
        //  let headers = new Headers({ 'Content-Type': 'application/json' });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.messagesUrl, body)
            .map(this.parseOne)
            .catch(this.handleError);
    };
    MessageService.prototype.parse = function (res) {
        var body = res.json().data || [];
        var out = [];
        body.forEach(function (item) {
            out.push(new message_model_1.Message(item));
        });
        return out;
    };
    MessageService.prototype.parseOne = function (res) {
        var body = res.json();
        return body.data || {};
    };
    MessageService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    MessageService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], MessageService);
    return MessageService;
}());
exports.MessageService = MessageService;
//# sourceMappingURL=message-service.js.map