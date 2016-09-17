import { Component, OnInit } from '@angular/core';

import { MessageService} from '../services/message-service';
import { MessageTools } from './message-tools';
import { MessageList } from './message-list';
import {Message} from "./message-model";

@Component({
    selector: 'div',
    template: `<div class ="panel panel-default">
               <div class="panel-heading">
               <message-tools (added)="onMessageAdded($event)" (deleted)="onMessageDeleted()" (saved)="saveMessages()"></message-tools>
               </div>
               <div class="panel-body">
               <message-list [messages]="messages"></message-list>
               </div>
               </div>`,
    styleUrls: ['app/messages/messages-main.css'],
    // directives: [MessageTools, MessageList],
    providers: [MessageService]
})
export class MessagesMain implements OnInit {
    errorMessage: string;
    messages:Message[];

    mode = 'Observable';

    constructor (
        private messageService: MessageService
                )
    {
        this.messages =[];
    }

    ngOnInit () {
        this.getMessages();
    }

    getMessages() {
        this.messageService.getMessages()
            .subscribe(
                messages => this.messages = messages,
                error =>  this.errorMessage = <any>error);
    }

    saveMessages () {
        this.messageService.saveMessages(this.messages)
            .subscribe(
                (res)=>{
                    console.log(res);
                },
                error =>  this.errorMessage = <any>error);
    }

    onMessageAdded (message: Message) {
        this.messages.push(message);
    }

    onMessageDeleted () {
            let item: Message;
            this.messages.forEach(function(message){
                if (message.selected === true) item = message;
            });
            if (item) {
            let index = this.messages.indexOf(item);
            if (index > -1) {
                this.messages.splice(index, 1);
            }
        }
    }
}