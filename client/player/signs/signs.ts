/**
 * Created by Vlad on 8/18/2016.
 */
///<reference path="../../typings/jquery/jquery.d.ts"/>
    ///<reference path="../models.ts"/>


module htplayer {
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
        send(data:any):any{
          return $.post('http://192.168.1.10:56888/debug',data);
        }

        constructor(){
            setInterval(()=>this.checkReload(),3000);
        }

        checkReload():void{
            this.send('checking').done((res)=>{
               // console.log(res);

                if(res.cmd=='reload')window.location.reload();
            })
        }


}
    export class Signs{
        nydevice:VODevice;
        $container:JQuery;

        fs:FileSystem;
        debugger:Debugger;
        commonDir ="/mtd_down/common/";
        fullPath:string;
        version:any;
        downloadPlugin:DownloadPlugin;


        constructor(private server:string,private mydirectory:string,private usbpath?:string){
            this.downloadPlugin = <any> document.getElementById("pluginObjectDownload");
            this.fullPath = this.commonDir+mydirectory;
            this.debugger = new Debugger();
            this.fs = new FileSystem();
            this.$progress  = $('#Progress');
            var bValid = this.fs.isValidCommonPath(mydirectory);
            if (!bValid) {
                this.debugger.send('creating dir  '+mydirectory );
                this.fs.createCommonDir(mydirectory);
            }else {

            }
            var jsdir = mydirectory;
           // this.fs.createCommonDir(jsdir);
            var valid = this.fs.isValidCommonPath(jsdir);

            this.$progress.append(jsdir +"    "+valid+ ' <br/>');
          //  this.debugger.send('have dir   '+mydirectory );


            var file:CommonFile = this.fs.openCommonFile(mydirectory+'/version.json', 'r');

            if(!file)this.downloadVersion('0.0.0');
            else {

               var ver =  file.readAll();
                this.fs.closeCommonFile(file);
                    try{
                        this.version = JSON.parse(ver);
                    }catch (e){
                        this.$progress.append(e);
                    }

               if(this.version )this.downloadVersion(this.version.version);
                else this.downloadVersion('0.0.0');

                //this.debugger.send('version: '+ver);

            }



/*
            var strResult = fileObj.readAll();
            var str = JSON.stringify(bValid);
            this.debugger.send(str);
           // var bResult = fileSystemObj.createCommonDir(myroot);



            this.$container = $('#MainContainer');

            var str:string  = localStorage.getItem('mydevice');
            this.debugger.send(str);
            if(!str){
                this.loadVersion();
            }*/
        }


        onDownloadComplete():void{
var filename = this.commonDir+this.mydirectory+'/'+this.version.start;
           // $('#MainContainer').empty();
            $('#MainContainer').load(filename,function(res){
                this.$progress.append(' load result  '+ res);
            });
            this.$progress.append(' next: '+filename);
        //window.location.href = this.commonDir+this.mydirectory+'/'+this.version.start;
        }

        loadVersion(){

        }

        checkVersion():void{

        }


        downloadNext():void{
            this.currentIndex++;
           // this.errorCount =0;
            this.$progress.append('<br/> ' +this.currentIndex);
           // this.debugger.send('this.downloadfileList. '+this.downloadfileList);

            if(this.currentIndex<this.downloadfileList.length){
                var filename:string = this.downloadfileList[this.currentIndex];
                this.$progress.append(' next: '+filename);
               // document.getElementById('DownResult').innerHTML +='<p> Start download '+filename+'</p>';
                var src= 'http://192.168.1.10:56888/'+filename;
                var dest = this.fullPath+'/'+filename;

                this.$progress.append(' '+src+'  to '+dest+'<br/>');

                //this.debugger.send('downloading'+ src+'  to '+dest);

                var res = this.downloadPlugin.StartDownFile(src,dest);

            }else this.onDownloadComplete();


        }


        errorCount:number=0
        currentIndex:number=0;
        downloadfileList;

        onDownloadEvent(param:string):void{
            this.$progress.append(' '+param+' => ');
            var strList:string[] = param.split('?');
            if (strList[0]=='1000') {
                this.$progress.append(" Downloading : "+this.downloadfileList[this.currentIndex]+ ': ');
                if(strList[1] == '1') {
                    this.errorCount =0;
                    this.$progress.append(' Downloaded : '+this.downloadfileList[this.currentIndex]);
                    setTimeout(()=> {
                        this.downloadNext();
                    },1000);
                }
                else {
                    this.$progress.append("  DOWNLOAD FAILED! "+this.downloadfileList[this.currentIndex]+' this.errorCount :'+ this.errorCount+' ' );
                    if(++this.errorCount<3)this.currentIndex--;
                    this.downloadNext();

                }

            }
            // DownRatio : 0~100
            else if (strList[0]=='1001' ) this.$progress.append('DownRatio : 0~100   ' +strList[1] );
            // Down Speed : Bytes/Sec : It will be reach after Ratio
            else if (strList[0]=='1002' )this.$progress.append('Down Speed : Bytes/Sec : It will be reach after Rati  '+strList[1]);

        }



        $progress:JQuery;



        onSettingsDownloaded():void{
            var vers:any = this.fs.openCommonFile(this.mydirectory+'/version.json', 'r').readAll();
            this.$progress.append('Version: '+vers);
            if(vers){
                this.version = JSON.parse(vers);

           this.$progress.append('<br/>');
                if(this.version && this.version.download){
                    this.downloadfileList = this.version.download;
                    this.currentIndex=-1;
                    this.downloadPlugin.OnComplete = (param)=>this.onDownloadEvent(param);
                    this.downloadNext();
                }
            }



        }

        downloadVersion(currentVersion:string):void{


           // this.debugger.send('downloadVersion'+downloadPlugin);

            var errorCount:number=0;
            var dest = this.fullPath+'/version.json';
            var src:string = 'http://192.168.1.10:56888/version/'+currentVersion;
            this.debugger.send(src+'   dest:'+dest);
            this.$progress.append(src+'   dest:'+dest);
            var res = this.downloadPlugin.StartDownFile(src,dest);
            var deb = this.debugger;
            var self = this;


            var downloadComplete = function(param){

                var params:string[] = param.split('?');
                if(params[0]=='1000'){
                   // document.getElementById('DownResult').innerHTML +='<p> got 1000   '+self.onSettingsDownloaded+'</p>';

                    self.onSettingsDownloaded();
                }
                document.getElementById('DownResult').innerHTML +='<p> '+param + '    '+dest+'</p>';

                    //deb.send('params   downloadComplete' + param1);
            }

            this.downloadPlugin.OnComplete = downloadComplete;//(res,res2)=>this.onDownloadEvent(res,res2);



           // this.debugger.send('downloadPlugin  res   '+ downloadPlugin.OnComplete);
        }

        downloadFile():void{

            var DownloadPlugin:any = document.getElementById("pluginObjectDownload");
            DownloadPlugin.OnComplete = 'loadWidget';
            function loadWidget(param1) {
                var strList= param1.split('?');
                alert("strList = "+strList);
                alert("OnComplete");  }
        }
        checkFilesystem(){

        }

        readUsbDrive():void {
            var fileSystemObj = new FileSystem();
            var usbPath = this.usbpath;
           var arrFiles = fileSystemObj.readDir(usbPath)
             if (arrFiles) {
              //  var vers= arrFiles.fil
                for (var i=0; i < arrFiles.length; i++) {
                    alert(arrFiles[i].name);
                    alert(arrFiles[i].isDir);
                }
            }
        }
    }
}


