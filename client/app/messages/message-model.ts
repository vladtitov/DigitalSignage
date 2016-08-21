export interface IMessage {
    active: boolean;
    id?: number;
    body:string
}

export class Message implements IMessage{
    active: boolean;
    selected: boolean = false;
    editable: boolean = false;
    body:string;
    title:string;
    id:number;
    static count:number = 1;
    constructor (obj:IMessage) {
        for(var str in obj)this[str] = obj[str];
        if(this.id && this.id>Message.count)Message.count = this.id;
        if(!this.id) this.id = Message.count++;

    }
}