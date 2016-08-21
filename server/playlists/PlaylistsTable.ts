import Q = require('q');
import {DBDriver, UpdateResult} from "../db/dbDriver";
// import {IDBDriver} from "../db/dbDriver";
import {TableModel} from "../db/TableModel";
import {VOPlaylist, VOPlayListProps,} from "../../client/app/services/models";


export class PlaylistsTable extends TableModel {
    constructor(folder:string){
        super(folder,"playlists");
    }

    updateContentById(row:VOPlayListProps,id:number): Q.Promise<UpdateResult | UpdateResult>{
        row.timestamp = Math.floor(Date.now() / 1000);
        if(id==-1)  return this.insertContent(row)
        else  return this.updateContent(row)
    }

    insertContent(row:VOPlayListProps): Q.Promise<UpdateResult> {
        if(!row.label)row.label =  'new playlist ';

        delete  row.id;
        return super.insertContent(row)
    }



}