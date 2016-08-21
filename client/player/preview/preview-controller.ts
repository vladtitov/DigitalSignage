
/**
 * Created by Vlad on 8/10/2016.
 */

///<reference path="../../typings/jquery/jquery.d.ts"/>
///<reference path="../../typings/moment/moment.d.ts"/>
///<reference path="../../typings/underscore/underscore.d.ts"/>
///<reference path="../../typings/cordova/cordova.d.ts"/>

///<reference path="../htplayer/ht-payer.ts"/>



    ///<reference path="../UtilsServices.ts"/>


module htplayer{
    export class PreviewController{

        private player:htplayer.HTMyPlayer
        constructor(){
            let params:any = UtilsServices.utils.getUrlParams();
            console.log(params);
            if(!params || !params.layout_id){
                console.warn('heed layout_id');
              return;
            }
            htplayer.playerURL = '/api/';
           let id = params.layout_id;
           this.player = new htplayer.HTMyPlayer('#ViewportsContainer');
           this.player.loadLayout(id);
            this.player.onLayotLoaded = ()=>{
                this.player.appendTo($('#MainContainer'));
                this.fitToWindow();
            }

            $( window ).resize(()=> this.fitToWindow());
        }

        private delay:boolean;


        fitToWindow():void {
           // console.log('resize');
            if(this.delay) return
            this.delay = true;
            setTimeout(()=>{ this.delay = false},1.2);
            let w:number =  $( window ).width();
            let h:number =  $( window ).height();
            let w2=  this.player.width();
            let h2:number = this.player.height();
            let k = w/w2;




            $('#ViewportsContainer').css('transform','scale('+k+')');

        }
    }
}


