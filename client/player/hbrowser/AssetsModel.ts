/**
 * Created by Vlad on 8/14/2016.
 */

module hbrowser {
declare var MainLibrary;

    export class VOAssetItem {
        active: boolean;
        after_id: number;
        asset_id: number;
        duration: number;
        height: number;
        id: number;
        lasting: number;
        mime: string
        orig_dimension: string;
        path: string
        playlist_id: number;
        playlists_stamp: number;
        position: number;
        size: number;
        time_from: number;
        time_to: number;
        playlist_from: number;
        playlist_to: number;
        timestamp: number;
        type: string;
        width: number;
        ready:boolean;
        filename: string;

        constructor(obj: any) {
            for (var str in obj)this[str] = obj[str];
            if (!this.lasting) this.lasting = this.duration;


        }
    }

}