/**
 * Created by Vlad on 8/5/2016.
 */

///<reference path="../models.ts"/>
    ///<reference path="viewport-model.ts"/>
    ///<reference path="player-lite.ts"/>
    ///<reference path="AssetsModel.ts"/>




module htplayer{

    declare var  MainLibrary:any;

    declare var server:string;

    export class HTMyPlayer{
        onReady:Function;
        layouttimestamp:number;
        $view:JQuery;
        layout:VOLayout;
        onLayotLoaded:Function;

        constructor(selector:string){
            this.$view = $(selector);
        }

        viewports:ViewportModel[];

        appendTo($container:JQuery){
            $container.append(this.$view);
        }

        width():number{
           return this.layout.props.width || 1920;
        }

        height():number{
            return this.layout.props.height || 1080;
        }

        start():void{

        }

        checkLayoutTimestamp():void{

        }

        createView(){
            this.viewports.forEach((model:ViewportModel)=>{
                model.appendView(this.$view)
            })
        }

      /*  loadLayoutStats():void{
            $.get(playerURL+'layout-stats/'+this.layout.id).done((res)=>{
               // this.deviceStats = new VODeviceStats(res.data);

            })
        }
*/

        setNewLayout(layout:VOLayout):void{
            this.layout = layout;
            this.setNewViewPorts();
        }

        loadPlaylist(playlist_id:number):void{
            $.get(playerURL+'layouts/byid/'+playlist_id).done((res)=>{
                console.log(res);
                if(res.data){
                    this.layout = new VOLayout(res.data);
                    this.setNewViewPorts();
                    if(this.onLayotLoaded)this.onLayotLoaded();
                }else console.warn(res)
            })
        }

        loadLayout(layout_id:number):void{
            $.get(playerURL+'layouts/byid/'+layout_id).done((res)=>{
                console.log(res);
              if(res.data){
                  this.layout = new VOLayout(res.data);
                  this.setNewViewPorts();
                  if(this.onLayotLoaded)this.onLayotLoaded();
              }else console.warn(res)
            })
        }

        loadDevice(device_id:number):void{
            $.get(playerURL+'layouts/by-device-id/'+device_id).done((res)=>{
                console.log(res);
                if(res.data){
                    this.layout = new VOLayout(res.data);
                    this.setNewViewPorts();
                    if(this.onLayotLoaded)this.onLayotLoaded();
                }else console.warn(res)
            })
        }

        setNewViewPorts(){
            this.viewports = this.layout.viewports.map(item=>new ViewportModel(item))
            this.createView();
        }

    }

}