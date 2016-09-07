
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
            // let params:any = UtilsServices.utils.getUrlParams();
            let layout_id:number;
            let device_id:number;
            let playlist_id:number;
            let params:string[] = window.location.href.split('/');
            console.log('params: ', params);

            let ind:number = params.indexOf('layout');
            if(ind != -1){ layout_id = +params[ind+1]; }
            else {
                ind = params.indexOf('device');
                if(ind != -1){ device_id = +params[ind+1]; }
                else {
                    ind = params.indexOf('playlist');
                    if(ind != -1){ playlist_id = +params[ind+1]; }
                }
            }
            console.log('layout_id', layout_id);
            console.log('device_id', device_id);
            console.log('playlist_id', playlist_id);

            if(!layout_id && !device_id && !playlist_id) return;

            console.log(params);

            htplayer.playerURL = '/api/';
           // let id = params.layout_id;
           this.player = new htplayer.HTMyPlayer('#ViewportsContainer');
           if(layout_id) this.player.loadLayout(layout_id);
            else if(device_id) this.player.loadDevice(device_id);
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


