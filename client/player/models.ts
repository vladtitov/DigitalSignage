///<reference path="../typings/jquery/jquery.d.ts"/>
///<reference path="../typings/underscore/underscore.d.ts"/>

module htplayer {

    export var showTip:(message,anchor:JQuery)=>void;
    export  var server:string = 'http://192.168.1.10:56777/';
    export var playerURL:string ='';

    export class VOAsset {
        id:number;
        active: number;
        label:string;
        duration: number;
        height:number;
        mime:string;
        dimension:string;
        original_name:string;
        filename:string;
        selected:boolean;
        path:string;
        size:number;
        thumb:string;
        width:number;
        type:string;
        metadata:string;
        description:string;
        constructor(obj:any){ for(var str in obj) this[str] = obj[str]}
    }

    export class VOPlayLists_Assets{
        id:number;
        active: number;
        label:string;
        duration: number;
        height:number;
        mime:string;
        dimension:string;
        original_name:string;
        filename:string;
        path:string;
        size:number;
        thumb:string;
        width:number;
        type:string;
        metadata:string;
        description:string;

        playlist_id:number;
        asset_id:number;
        after_id:number;
        lasting:number;
        position:number;

        hilited:boolean;
        selected:boolean;
        isCover:boolean;
        constructor(obj:any){
            for(var str in obj) this[str] = obj[str]
            if(!this.lasting) this.lasting = this.duration;
        }
    }

// table layouts
    export class VOLayoutProps{
        id:number;
        label:string;
        description:string;
        timestamp:number;
        create_user:string;
        background:string;
        image:string;
        type:string;
        width:number;
        height:number;
        constructor (obj:any) {
            for (var str in obj)this[str] = obj[str];
            if(!this.id) this.id = -1;
        }
    }

    export class VOLayout{
        viewports: VOViewport [];
        props:VOLayoutProps;
        usedDevice:VODevice[];
        constructor (obj:any) {
            for(var str in obj)this[str] = obj[str];
            var vps:VOViewport[]=[]
            if(obj.viewports){
                obj.viewports.forEach(function(item){
                    vps.push(new VOViewport(item))
                })
            }
            this.viewports = vps;
            this.props = new VOLayoutProps(this.props);

        }
    }


    export class VOTemplate{
        id:number;
        image:string;
        selected:boolean;
        viewports:VOViewport[];
        constructor (obj:any) {
            for (var str in obj)this[str] = obj[str];
            var out:VOViewport[]=[];
            if(obj.viewports){
                obj.viewports.forEach(function(item){
                    out.push(new VOViewport(item));
                })
            }

            this.viewports = out;
        }
    }


    export class VOPlayListProps{
        id: number;
        label:string;
        description: string;
        size: number;
        time_from: number;
        time_to: number;
        created_user: number;
        created_time: number;
        duration:number;
        active: number;
        dimension: number;
        timestamp:number;
        image:string;
        constructor (obj:any) {
            for (var str in obj)this[str] = obj[str];
        }
    }


    export class VOPlaylist {
        props:VOPlayListProps;
        list: VOPlayLists_Assets [];
        image:string;
        constructor (obj:any) {
            for(var str in obj)this[str] = obj[str];
            var ar:VOPlayLists_Assets [] = [];
            if (this.list) this.list.forEach(function (item) {ar.push( new VOPlayLists_Assets (item)) })
            this.list = ar;
            this.props = new VOPlayListProps(this.props || {});
        }
    }

    export class VOViewport {
        id: number;
        label: string;
        image: string;
        x: number;
        y: number;
        width: number;
        height: number;
        playertype:string;
        playlist_id: number;
        constructor (obj:any) {
            for (var str in obj)this[str] = obj[str];
        }
    }



    export class UpdateResult{
        insertId:number;
        changes:number;
        constructor (obj:any) {
            for (var str in obj)this[str] = obj[str];
        }
    }



    export class VOStats{
        assetid:number;
        timestamp:number;
        interrupted:boolean;
        constructor (obj:any) {
            for (var str in obj)this[str] = obj[str];
        }
    }


    export class VOUserData{
        username:string;
        password:string;
        sessionid:string;
        token:string;
        constructor (obj:any) {
            for (var str in obj)this[str] = obj[str];
        }
    }

    export class VODevice{
        id:number;
        label:string;
        description:string;
        layout_id:number;
        layout:VOLayout;
        timestamp:number;
        selected:boolean;
        constructor (obj:any) {
            for (var str in obj)this[str] = obj[str];
        }
    }

    export class VODeviceStats{
        dstamp:number;
        label:string;
        layout_id:number
        llabel:string;
        lstamp:number;
        width:number;
        height:number;

        constructor (obj:any) {
            for (var str in obj)this[str] = obj[str];
        }
    }

}
