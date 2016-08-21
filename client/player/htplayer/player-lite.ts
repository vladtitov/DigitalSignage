/**
 * Created by Vlad on 8/11/2016.
 */
module htplayer{

    export class PlayerLite{
        $view:JQuery;
        $prev:JQuery;
        $next:JQuery;
        width:number;
        height:number;
        x:number;
        y:number;

        constructor(public model:ViewportModel){
            this.width = model.width;
            this.height = model.height;
            this.x = model.x;
            this.y = model.y;
        }

        startPlay():void{
            this.isPlaying = true;
            this.playNext();
        }

        isPlaying:boolean
        stopPlay():void{
            this.isPlaying = false;
        }

        destroy():void{

        }

        nextItem:VOAssetItem;
        currentItem:VOAssetItem;
        prevItem:VOAssetItem;


        playNext():void{

            if(!this.isPlaying) return;
            var asset:VOAssetItem = this.model.getNextItem();
          console.log('hext item    ',asset);

            if(!asset || !asset.ready){
                setTimeout(()=>this.playNext(),1000);
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
            }
            else{
                switch(currentItem.type){
                    case 'video':
                        delay+=3;
                        this.showVideo(currentItem);
                        break;
                    case 'image':
                        this.showImage(currentItem);
                        break;
                    default:
                        this.showImage(currentItem);
                        break;
                }
            }


            setTimeout(()=>this.playNext(),(delay*1000));

        }




        remove():void{
            this.$view.remove();
        }
        showImage(item:VOAssetItem):void{
            var view:JQuery = $('<img>').attr('src',item.path).css('max-width',this.width+'px').css('max-height',this.height+'px');
            this.switchView(view);
        }

        switchView(newview:JQuery):void{
            var prev:JQuery = this.$view.children();
            prev.fadeOut(function () {
                prev.remove();
            });
            newview.hide();
            this.$view.append(newview);
            newview.fadeIn();
        }
        showVideo(item:VOAssetItem):void{
            var view:JQuery = $('<video>').attr('autoplay','true').append($('<source>').attr('src',item.path)).css('max-width',this.width+'px').css('max-height',this.height+'px');
            this.switchView(view)
        }

        appendTo($container):JQuery{
            this.$view = $('<div>').addClass('ht-player').width(this.width).height(this.height).offset({left:this.x,top:this.y}).appendTo($container);
            return this.$view
        }
    }

}