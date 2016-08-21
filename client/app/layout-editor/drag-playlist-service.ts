/**
 * Created by Vlad on 7/21/2016.
 */
import {Injectable, EventEmitter} from "@angular/core";
import {VOPlaylist} from "../services/models";

@Injectable()
export class DragPlayListService{
    emitDragEnd: EventEmitter<{}> = new EventEmitter();
    item:VOPlaylist;
    onDragEnd:Function;

    setItem(item:VOPlaylist):void{

    }
}