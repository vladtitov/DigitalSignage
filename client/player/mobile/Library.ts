/**
 * Created by Vlad on 8/5/2016.
 */

    ///<reference path="../htplayer/AssetsModel.ts"/>
    ///<reference path="../models.ts"/>

    ///<reference path="../../typings/cordova/cordova.d.ts"/>



 class FileLoader{

        fs:FileSystem;
        READY:string='ready';
        trigger:JQuery = $({});
        file:FileEntry;


        destroy():void{
            this.asset = null;
            this.file = null;
            this.fs=null;
            this.trigger=null
        }
        constructor(public asset:htplayer.VOAssetItem, public directory:string){

            this.download();
        }

        download():void{
            var fileTransfer = new FileTransfer();
            var url = encodeURI(MainLibrary.server + this.asset.path);
            var path = this.directory +this.asset.filename;
            fileTransfer.download(
                url,
                path,
                (entry:FileEntry) =>{
                    this.asset.path = entry.toURL();
                    this.file = entry;
                    this.trigger.triggerHandler(this.READY,this)
                    console.log("download complete: " + this.asset.filename);
                },
                function(error) {
                    console.log("download error source " + error.source);
                    console.log("download error target " + error.target);
                    console.log("upload error code" + error.code);
                },
                false,
                {
                    headers: {
                        "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                    }
                }
            );

            console.log('start download '+this.asset.filename);

        }


    }
   class MainLibrary{
        static _library:MainLibrary
        static server:string = 'http://192.168.1.10:56777/';
        static get library():MainLibrary{
            if(!MainLibrary._library)MainLibrary._library = new MainLibrary();
            return MainLibrary._library
        }

        static ondevice:boolean;
        onReady:Function;
        onError:Function;
        private fs:FileSystem;
        private root:DirectoryEntry;
        folder:string;
        storage:number
       directory:string;
        private haveNames:string[] =[];
        files:FileEntry[];


        constructor(){
            this.storage = window.PERSISTENT;
            this.folder = 'content';
        }

        onErrorCreateFile(err):void{

        }

        onErrorLoadFs(err):void{
            alert('error load filesystem '+err);
        }

        getFilesystem():boolean{

            if(typeof window.requestFileSystem ==='undefined') {
                MainLibrary.ondevice = false;
                return false
            }

            MainLibrary.ondevice = true;
            window.requestFileSystem(this.storage, 0, (fs) =>{
                //console.log(fs);
                this.fs = fs;
                this.root = fs.root;
                this.root.getDirectory(this.folder,{create:true},(dir:DirectoryEntry)=>{
                    this.directory = dir.toURL();
                    dir.createReader().readEntries((res:FileEntry[])=>{
                        this.files = res;
                        this.haveNames = res.map(function(item:FileEntry){ return item.name});
                        console.log('have names   ',this.haveNames);
                        if(this.onReady) this.onReady();
                    }
                    ,error=>{ console.log('error read files')}
                    )

                })
                ;

               /* fs.root.getFile("newPersistentFile.txt", { create: true, exclusive: false }, function (fileEntry) {

                    console.log("fileEntry is file?" + fileEntry.isFile.toString());
                    // fileEntry.name == 'someFile.txt'
                    // fileEntry.fullPath == '/someFile.txt'
                   // writeFile(fileEntry, null);

                },(err)=>this. onErrorCreateFile(err));*/

            },(err)=>this.onErrorLoadFs(err));

            return true;
        }


        onFileReady(fl:FileLoader):void{
            var item:htplayer.VOAssetItem = fl.asset
            item.ready = true;
            var name:string = item.filename;
            this.haveNames.push(name);
            var ind = this.inQueueNames.indexOf(name);
            if(ind!==-1)this.inQueueNames.splice(ind,1);

            fl.destroy();
        }


/*
       loadNext():void{
           if(this.itemsInQueue.length === 0 ){
               return;
           }

           var asset:VOAssetItem = this.itemsInQueue.pop();
           var loader:FileLoader =  new FileLoader(asset,this.directory);
           loader.READY,(evt,loader)=>this.onFileReady(loader);
        }*/

       /* addInQueue(asset:VOAssetItem):void{
            if(!this.itemsInQueue)this.itemsInQueue =[];
            var exists:VOAssetItem[] = this.itemsInQueue.filter((item:VOAssetItem)=>item.filename ==asset.filename);
            if(exists.length ===0){
                this.itemsInQueue.push(asset);
                this.loadNext();
            }

        }
*/
        inQueueNames:string[]



        addItem(item:htplayer.VOAssetItem):void{
            if( MainLibrary.ondevice){
                if(!item.path) return

                var name:string = item.path.substr(item.path.lastIndexOf('/')+1);
                item.filename = name;
                if(this.haveNames.indexOf(name)!==-1) {
                    item.path = this.directory+name;
                    item.ready = true;
                } else{
                    if(!this.inQueueNames) this. inQueueNames=[];

                    var ind:number =  this.inQueueNames.indexOf(name);
                    if(ind ===-1){
                        var loader:FileLoader =  new FileLoader(item,this.directory);
                        loader.READY,(evt,loader)=>this.onFileReady(loader);
                        this.inQueueNames.push(name);
                    }


                }
            }else item.ready = true;

        }

    }
