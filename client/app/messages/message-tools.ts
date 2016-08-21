
import {Component, Input, Output, EventEmitter} from '@angular/core';

import {Message} from './message-model';


@Component({
    selector: 'message-tools',
    templateUrl: 'app/messages/message-tools.html',
    styles: [`.tools > div {
        display: inline-block;
    }`],
    })



export class MessageTools {
    @Input () message: Message;
    @Input () messages: Message[];

    @Output () deleted = new EventEmitter();
    @Output () added = new EventEmitter();
    @Output () saved = new EventEmitter();

    add (title: string){
        this.added.emit(new Message({active:true,body:title}));
    }

    del () {
        this.deleted.emit(null);
    }
    
    save () {
        this.saved.emit(null);
    }
}