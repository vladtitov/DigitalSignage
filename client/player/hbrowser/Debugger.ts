/**
 * Created by Vlad on 8/19/2016.
 */
module hbrowser{

    interface USBFiles{
        name:string;
        isDir:boolean;
    }
    interface CommonFile{
        writeAll(tex:string)
        readAll():string;

    }

    interface DownloadPlugin{
        StartDownFile(src:string,dest:string)
        OnComplete:Function;
    }

    declare class FileSystem{
        createCommonDir(path:string);
        isValidCommonPath(path:string);
        readDir(path:string):USBFiles[];
        openCommonFile(filename:string,readwrite:string):CommonFile
        closeCommonFile(file:CommonFile)
    }


    export class Debugger{

        private interval:any;
        private $view:JQuery;
        private $console:JQuery;

        send(data:any):void{
            if(typeof data =='object')data=JSON.stringify(data);
          $.post('http://192.168.1.10:56888/debug',data);
        }

        show(msg:string):void{
            if(!this.$console)this.createConsole();
            this.$console.append(msg);
        }
        constructor(){

        }

        rewriteconsole(){
            console.log = (log)=>this.send(log);
            console.error = (log)=>this.send(log);
            console.warn = (log)=>this.send(log);

        }
        private createConsole():void{
            this.$view = $('<div>').appendTo('body').css({
                position:'absolute',
                top:0,
                left:0
            });
            this.$console =  $('<div>').appendTo(this.$view).css({
                position:'absolute',
                top:0,
                left:0
            });
        }

        stop():void {
            clearInterval(this.interval);
        }

        start():void{
           this.interval =  setInterval(()=>this.checkReload(),3000);
           this.rewriteconsole();
        }

        checkReload():void{
               $.get('http://192.168.1.10:56888/reload/'+Date.now()).done((res) =>{
                  // this.show(res);
                   if(res =='reload') window.location.reload();
               })


        }


    }
}