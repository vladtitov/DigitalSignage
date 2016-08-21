import {Component, Input} from '@angular/core';
import { MdCheckbox } from '@angular2-material/checkbox';
import {Message} from "./message-model";

@Component({
    selector: 'message-list',
    template:  `<md-data-table>
                <thead>
                <tr>
                    <th class="md-text-cell">Active</th>
                    <th class="md-text-cell">Content</th>
                </tr>
                </thead>
                <tbody *ngIf="messages.length > 0">
                    <tr *ngFor="let message of messages" [ngClass]="{'selected': message.selected, 'editable': message.editable}" (click)="onSelected(message)">
                        <td class="md-text-cell">
                            <md-checkbox (change)="toggleChangeActive(message)" [checked]="message.active"></md-checkbox>
                        </td>
                        <td class="md-text-cell" attr.contenteditable = "{{ message.editable }}" (input)="inputChange(message, $event)" (click)="toggleEditable(message)">
                            {{ message.body}}
                        </td>
                </tr>
                </tbody>
                </md-data-table>
                `,
    styles: [`
    .selected {
    background-color: khaki;
    }
    .selected{
        background-color: #fbfff0;
    }`],
        directives: [MdCheckbox]
    })

export class MessageList {
    @Input () messages:Message[];
    @Input () message: Message;

    toggleEditable (message:Message) {
        this.message = message;
        this.messages.forEach(function(item){
            if (item !== message) item.editable = false;
        });
        this.message.editable = !this.message.editable;
    }

    toggleChangeActive (message:Message) {
        this.message = message;
        this.message.active = !this.message.active;
    }

    inputChange (message:Message, event) {
        this.message = message;
        this.message.title = event.target.outerText;
    }

    onSelected (message:Message) {
        this.message = message;
        this.messages.forEach(function(item){
            if (item !== message) item.selected = false;
        });
        this.message.selected = !this.message.selected;
    }
}