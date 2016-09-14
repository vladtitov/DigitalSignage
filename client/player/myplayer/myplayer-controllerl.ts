/**
 * Created by Vlad on 8/11/2016.
 */
///<reference path="../../typings/jquery/jquery.d.ts"/>
///<reference path="AssetsModel.ts"/>

module myplayer{

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
        serverURL:string = '/api/';
        playlist_id:string;
        assetsID: string;

        constructor () {
            var obj:any = {
                x:0,
                y:0,
                width:1080,
                height:1080
            };
            this.model = new PlayerModel(obj);
            this.view = new PlayerView(this.model);
            // this.playlist_id = this.model.playlist_id;
            var hrefArr:string[] = window.location.href.split('/');

            var ind = hrefArr.indexOf('assets');
            if(ind != -1) {
                this.assetsID = hrefArr[ind+1]; // /assets/35,48,54,135   SELECT * FROM assets WHERE id = 35 OR id = 48 ..
                console.log('assets', this.assetsID);
                this.loadAssets();
            }


            // var ind:number = hrefArr.indexOf('playlist_id');
            // if(ind != -1){
            //     this.playlist_id = hrefArr[ind+1];
            //     this.loadPlaylist()
            // } else {
            //     ind = hrefArr.indexOf('assets');
            //     if(ind != -1) {
            //         var assets = hrefArr[ind+1]; // /assets/35,48,54,135   SELECT * FROM assets WHERE id = 35 OR id = 48 ..
            //
            //     }
            // }


        }

        loadAssets():void{
            var url:string = this.serverURL+'assets/select-assets/';
            console.log('loadAssets  '+url);
            $.post(url,{assetsID:this.assetsID}).done((res)=>{
                console.log('res', res);
                if(res.data && res.data.length){
                    this.timestamp =0;
                    var ar:VOAssetItem[] = res.data.map(item=>new VOAssetItem(item));
                    this.model.setItems(ar);
                    if(this.onReady)this.onReady();
                }
            });
        }


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