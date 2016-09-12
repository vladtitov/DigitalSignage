/**
 * Created by Vlad on 8/11/2016.
 */
module myplayer{

    export class PlayerView{
        $view:JQuery;
        $prev:JQuery;
        $next:JQuery;
        width:number;
        height:number;
        x:number;
        y:number;

        constructor(public model:PlayerModel){
            this.width = model.width;
            this.height = model.height;
            this.x = model.x;
            this.y = model.y;
        }

        destroy():void{
            if(this.$view)this.$view.remove();
            if( this.$prev)this.$view.remove();
            if(this.$next) this.$next.remove();
            this.$view = null;
            this.$prev = null;
            this.$next= null;
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