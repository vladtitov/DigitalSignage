/**
 * Created by Vlad on 8/20/2016.
 */
module hbrowser{
    export class PlayerModel{
        active:boolean;
        dimension:string
        height:number;
        width:number;
        x:number;
        y:number;
        id:number;
        image:string;
        label:string;
        layout_id:number;
        player_type:string;
        playlist_id:number;
        published_id:number;
        time_from:number;
        time_to:number;
        platlist_stamp:number;
        viewport_id:number;
        static dx:number=1;
        static dy:number = 1;
       private  _x:number;
       private  _y:number;
        private _width:number;
       private  _height:number;
        onScale:Function;

        playlistItems:VOAssetItem[]
        onReady:Function;
        currentIndex:number;
        constructor (obj:any) {
            for (var str in obj)this[str] = obj[str];
            this.currentIndex =-1;
            this._x=this.x;
            this._y=this.y;
            this._width=this.width;
            this._height=this.height;
            var dx:number= PlayerModel.dx;
            var dy:number = PlayerModel.dy;
            this.x=Math.round(this._x*dx);
            this.y=Math.round(this._y*dy);
            this.width= Math.round(this._width*dx);
            this.height = Math.round(this._height*dy);
            this.playlistItems=[]

        }
        scale(dx:number,dy:number):void{
            this.x=Math.round(this._x*dx);
            this.y=Math.round(this._y+dy);
            this.width= Math.round(this._width*dx);
            this.height = Math.round(this._height*dy);
            if(this.onScale)this.onScale()
        }

        setItems(ar:VOAssetItem[]):void{
            ar.forEach(function(item:VOAssetItem){item.ready= true})
            this.playlistItems = ar;
        }

        getNextItem():VOAssetItem{
                    if(this.playlistItems.length){
                        this.currentIndex++;
                        if(this.currentIndex>=this.playlistItems.length) this.currentIndex=0;
                        return this.playlistItems[this.currentIndex];
                    }else return null

        }

    }
}