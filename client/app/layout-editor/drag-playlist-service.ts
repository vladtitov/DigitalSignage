/**
 * Created by Vlad on 7/21/2016.
 */
import {Injectable} from "@angular/core";
import {VOPlaylist} from "../services/models";
import {EventEmitter} from "@angular/platform-browser-dynamic/src/facade/async";
@Injectable()
export class DragPlayListService{
    emitDragEnd: EventEmitter<{}> = new EventEmitter();
    item:VOPlaylist;
    onDragEnd:Function;

    setItem(item:VOPlaylist):void{

    }
}