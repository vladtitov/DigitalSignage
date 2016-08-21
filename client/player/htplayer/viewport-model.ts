/**
 * Created by Vlad on 8/11/2016.
 */

///<reference path="AssetsModel.ts"/>

module htplayer{

    declare var  MainLibrary:any

    export class ViewportModel{
        view:PlayerLite;
        // playlist:any
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


        playlistItems:VOAssetItem[]

        constructor (obj:any) {
            for (var str in obj)this[str] = obj[str];
            this.getPlaylist();
        }


        getPlaylist():void{
            if(this.playlist_id){
                this.loadPlaylist();
            }else console.warn(' PlayerController   no palylistid');
        }

        destroy():void{

            this.view.remove();

        }




        appendView($container:JQuery){
            this.view = new PlayerLite(this);
            this.view.appendTo($container);
        }


        timer:number=0;
        currentIndex:number=-1;

        getNextItem():VOAssetItem{
            this.currentIndex++
            if(this.currentIndex>=this.playlistItems.length) this.currentIndex=0;
            return this.playlistItems[this.currentIndex];

        }

        startPlay():void{
            this.view.startPlay();
        }
        stopPlay():void{
            this.view.stopPlay();
        }



        setItems(ar:VOAssetItem[]):void{
          ///  console.log('  setItems  MainLibrary   '+(typeof MainLibrary));

            var haslibrary:boolean = (typeof MainLibrary !== 'undefined')

            for(var i=0,n=ar.length;i<n;i++) {
                if(haslibrary)  MainLibrary.library.addItem(ar[i]);
                else ar[i].ready = true;
            }


          //  console.log(ar);

            this.playlistItems = ar;

        }




        loadPlaylist():void{
            var url:string = playerURL+'playlists/byid/'+this.playlist_id;
            console.log('loadPlaylist  '+url);
            $.get(url).done((res)=>{
                console.log('this.playlist_id  '+this.playlist_id,res);
                if(res.data && res.data.list){
                    var ar:VOAssetItem[] = res.data.list.map(item=>new VOAssetItem(item));
                    this.setItems(ar);
                    this.startPlay();
                }

                // var vo:VOPlaylist = new VOPlaylist(res.data);
                // this.playlist = new PlayListModel(vo);
                //   this.startPlay();
            })
        }
    }

}