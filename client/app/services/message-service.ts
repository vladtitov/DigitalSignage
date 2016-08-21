/**
 * Created by Dmitriy Prilutsky on 05.07.2016.
 */

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import {Message, IMessage} from '../messages/message-model';
import { Observable } from 'rxjs/Observable';

interface IMsg {
    msg: string;
    active: boolean;
}


@Injectable()
export class MessageService {
    constructor(private http:Http) {
    }


    private messagesUrl = '/api/messages/test/all';

    getMessages (): Observable<Message[]> {
        return this.http.get(this.messagesUrl)
            .map(this.parse)
            .catch(this.handleError);
    }


    saveMessages (msgs:Message[]): Observable<Message[]> {
        var out:IMessage[] = [];
        msgs.forEach(function(item:Message){
            out.push({id:item.id,active:item.active,body:item.body})
        })
        return this.http.post(this.messagesUrl,out)
            .catch(this.handleError);
    }
    addMessage (name: Message): Observable<Message> {
        let body = JSON.stringify({ name });
      //  let headers = new Headers({ 'Content-Type': 'application/json' });
       // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.messagesUrl, body)
            .map(this.parseOne)
            .catch(this.handleError);
    }

    private parse(res: Response) {
        let body:IMessage[] = res.json().data || [];

        var out:Message[] = [];
        body.forEach (function (item:IMessage) {
            out.push(new Message(item))
        })

        return out;
    }

    private parseOne(res: Response) {
        let body = res.json();
        return body.data || { };
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}