/**
 * Created by Vlad on 8/11/2016.
 */

///<reference path="AssetsModel.ts"/>

module hbrowser{

    declare var  MainLibrary:any


    ////SUM of playlist + Viewport
    export class PlayerController{
        view:PlayerView;
        $view:JQuery;
        model:PlayerModel;
        isPlaying:boolean;
        nextItem:VOAssetItem;
        prevItem:VOAssetItem;
        currentItem:VOAssetItem;
        timestamp:number=0;
        onReady:Function;

        constructor (private serverURL:string,obj:any) {
            this.model = new PlayerModel(obj)
            this.view = new PlayerView(this.model);
            this.playlist_id = this.model.playlist_id;
            this.loadPlaylist();
            this.startInterval();

        }


        playlist_id:number;
        loadPlaylist():void{
            var url:string = this.serverURL+'/playlist/'+this.playlist_id;
            console.log('loadPlaylist  '+url);
            $.get(url).done((res)=>{
                if(res.data && res.data.list){
                    this.timestamp =0;
                    var ar:VOAssetItem[] = res.data.list.map(item=>new VOAssetItem(item));
                    this.model.setItems(ar);
                    if(this.onReady)this.onReady();
                }
            })
        }


        needNewPlaylist():void{
            console.log('new  playlist');
           this.loadPlaylist();
        }

        myinterval:any=0;
        startInterval():void{
            if(this.myinterval===0)this.myinterval = setInterval(()=>this.loadPlaylistStats(),10000);
        }
        stopInterval():void{
            clearInterval(this.myinterval)
            this.myinterval = 0;
        }
        loadPlaylistStats():void{
            this.startInterval();
            var url:string = this.serverURL+'/playlist-timestamp/'+this.playlist_id;
           // console.log(url);
            $.get(url).done((res)=>{
              //  console.log(res);
                if(res.data){
                    if(this.timestamp == 0){
                        this.timestamp = res.data.timestamp;
                        return;
                    }
                    if(this.timestamp !=res.data.timestamp) this.needNewPlaylist();
                    else console.log('old  playlist');
                }

            })

        }
        destroy():void{
            this.stopPlay();
            this.view.destroy();
            this.$view.empty();
            this.$view.remove();
        }


        appendTo($container:JQuery){
            if(!this.$view) this.$view = $('<div>').addClass('view-port');
            this.view.appendTo(this.$view);
            $container.append(this.$view);
        }


        timer:number=0;
        currentIndex:number=-1;


        startPlay():void{
            if(!this.isPlaying){
                this.isPlaying = true;
                this.playNext();
            }
        }

        stopPlay():void{
                clearTimeout(this.checkTimeout)
                this.isPlaying = false;
        }

        checkTimeout:any;
        playNext():void{
            if(!this.isPlaying) return;
            var asset:VOAssetItem = this.model.getNextItem();
           /// console.log('hext item    ',asset);

            if(!asset || !asset.ready){
                setTimeout(()=>this.playNext(),2000);
                console.log('asset not resdy');
                return;
            }
            if(!this.nextItem){
                this.nextItem = asset;
                this.playNext();
                return;
            }
            this.prevItem  = this.currentItem;

            this.currentItem =  this.nextItem;

            this.nextItem = asset;

            var currentItem = this.currentItem;

            if(isNaN(currentItem.lasting)) currentItem.lasting = 10;
            var delay:number=currentItem.lasting;

            if(this.prevItem && this.prevItem.asset_id === this.currentItem.asset_id){
                console.log('same asset skipping');

            }else{
                console.log('playing '+currentItem.type+ ' '+ this.currentItem.path);
                switch(currentItem.type){
                    case 'video':
                        delay+=3;
                        this.view.showVideo(currentItem);
                        break;
                    case 'image':
                        this.view.showImage(currentItem);
                        break;
                    default:
                        this.view.showImage(currentItem);
                        break;
                }

            }

            if(typeof requestAnimationFrame ==='function'){
                this.frameCount=0;
                this.needFrames = delay*60;
                var path:string = this.currentItem.path;
                clearTimeout(this.checkTimeout);
                this.checkTimeout =  setTimeout(()=>this.onDelayExeed20(path,delay),(delay*1500));
                requestAnimationFrame((timer)=>this.onFrame(timer))

            }else console.error(' error no support for requestAnimationFrame');



        }

        onDelayExeed20(path:string,delay:number):void{
                var fps:number =  this.frameCount/delay;
            if(fps<5)console.error(' error delay exeed 200%  fps was: '+fps+ ' path: '+path);
              else  console.warn('delay exeed +50%  fps was: '+fps+ ' path: '+path);


        }

        needFrames:number;
        frameCount:number;

        onFrame(timer:number):void{
            if(!this.isPlaying) return;
            this.frameCount++;
            if(this.frameCount > this.needFrames){
                this.playNext();
            }
            else requestAnimationFrame((timer:number)=>this.onFrame(timer))
        }

    }

}