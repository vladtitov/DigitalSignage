

export class Playlists_Assets {

    id: number;
    listId: number;
    assetId: number;
    duration: number;
    afterId: number;
    dimension: string;
    position:number;

    static id: number = 1;
    static listId: number = 1;
    static assetId: number = 1;
    static duration: number = 1;
    static afterId: number = 1;
    static dimension: string = 'dv';
    static position:number= 1;

    // static getInit(): Playlists_Assets {
    //     return new PlayList(
    //         {
    //             id : 1,
    //             playlist_id: 1,
    //             asset_id: 1,
    //             duration: 1,
    //             after_id: 1
    //         }
    //     );
    // }

    constructor(obj?: any) {
        if(obj) {
            for(var str in obj) {
                if(Playlists_Assets[str]) this[str] = obj[str];
            }
            this.listId = Number(this.listId);
            this.assetId = Number(this.assetId);
            this.afterId = Number(this.afterId);
        }
        // console.log('constructor AssetVO');
    }
}