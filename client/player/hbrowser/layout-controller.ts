
/**
 * Created by Vlad on 8/20/2016.
 */
///<reference path="../models.ts"/>
module hbrowser{
    export class LayoutController{

        $view:JQuery
        private layout:htplayer.VOLayout;
        screenWidth:number;
        screenHeight:number;

        private playerControllers:PlayerController[];

        constructor(private serverURL:string){
            this.$view = $('<div>').addClass('player-layout');
            this.screenHeight = $(window).height();
            this.screenWidth = $(window).width();
        }


        appendTo($container:JQuery):void{

            $container.append(this.$view);
        }

        setLayout(layout:htplayer.VOLayout):void{
                this.layout = layout;
          var dw= this.screenWidth/layout.props.width;
           var dh=  this.screenHeight/layout.props.height;
            PlayerModel.dx=dw;
            PlayerModel.dy=dh;
           console.log(dw+' '+dh);
                this.createViewPorts(layout.viewports);

        }

        createViewPorts(viewports:htplayer.VOViewport[]):void{
            var view:JQuery = this.$view;
            var out:PlayerController[]=[]
            var server:string = this.serverURL;
            var w:number = this.screenWidth;
            var h:number = this.screenHeight;

           viewports.forEach(function(vp:htplayer.VOViewport){
               var ctr= new PlayerController(server,vp);
               out.push(ctr);
               ctr.appendTo(view)
               ctr.onReady = ()=>{
                   ctr.startPlay();
                   ctr.onReady=null;
               }

           })
            this.playerControllers = out;
        }
    }
}