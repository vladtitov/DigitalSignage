/**
 * Created by Vlad on 8/5/2016.
 */
///<reference path="../htplayer/AssetsModel.ts"/>
///<reference path="../models.ts"/>
///<reference path="../../typings/cordova/cordova.d.ts"/>
var FileLoader = (function () {
    function FileLoader(asset, directory) {
        this.asset = asset;
        this.directory = directory;
        this.READY = 'ready';
        this.trigger = $({});
        this.download();
    }
    FileLoader.prototype.destroy = function () {
        this.asset = null;
        this.file = null;
        this.fs = null;
        this.trigger = null;
    };
    FileLoader.prototype.download = function () {
        var _this = this;
        var fileTransfer = new FileTransfer();
        var url = encodeURI(MainLibrary.server + this.asset.path);
        var path = this.directory + this.asset.filename;
        fileTransfer.download(url, path, function (entry) {
            _this.asset.path = entry.toURL();
            _this.file = entry;
            _this.trigger.triggerHandler(_this.READY, _this);
            console.log("download complete: " + _this.asset.filename);
        }, function (error) {
            console.log("download error source " + error.source);
            console.log("download error target " + error.target);
            console.log("upload error code" + error.code);
        }, false, {
            headers: {
                "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
            }
        });
        console.log('start download ' + this.asset.filename);
    };
    return FileLoader;
}());
var MainLibrary = (function () {
    function MainLibrary() {
        this.haveNames = [];
        this.storage = window.PERSISTENT;
        this.folder = 'content';
    }
    Object.defineProperty(MainLibrary, "library", {
        get: function () {
            if (!MainLibrary._library)
                MainLibrary._library = new MainLibrary();
            return MainLibrary._library;
        },
        enumerable: true,
        configurable: true
    });
    MainLibrary.prototype.onErrorCreateFile = function (err) {
    };
    MainLibrary.prototype.onErrorLoadFs = function (err) {
        alert('error load filesystem ' + err);
    };
    MainLibrary.prototype.getFilesystem = function () {
        var _this = this;
        if (typeof window.requestFileSystem === 'undefined') {
            MainLibrary.ondevice = false;
            return false;
        }
        MainLibrary.ondevice = true;
        window.requestFileSystem(this.storage, 0, function (fs) {
            //console.log(fs);
            _this.fs = fs;
            _this.root = fs.root;
            _this.root.getDirectory(_this.folder, { create: true }, function (dir) {
                _this.directory = dir.toURL();
                dir.createReader().readEntries(function (res) {
                    _this.files = res;
                    _this.haveNames = res.map(function (item) { return item.name; });
                    console.log('have names   ', _this.haveNames);
                    if (_this.onReady)
                        _this.onReady();
                }, function (error) { console.log('error read files'); });
            });
            /* fs.root.getFile("newPersistentFile.txt", { create: true, exclusive: false }, function (fileEntry) {

                 console.log("fileEntry is file?" + fileEntry.isFile.toString());
                 // fileEntry.name == 'someFile.txt'
                 // fileEntry.fullPath == '/someFile.txt'
                // writeFile(fileEntry, null);

             },(err)=>this. onErrorCreateFile(err));*/
        }, function (err) { return _this.onErrorLoadFs(err); });
        return true;
    };
    MainLibrary.prototype.onFileReady = function (fl) {
        var item = fl.asset;
        item.ready = true;
        var name = item.filename;
        this.haveNames.push(name);
        var ind = this.inQueueNames.indexOf(name);
        if (ind !== -1)
            this.inQueueNames.splice(ind, 1);
        fl.destroy();
    };
    MainLibrary.prototype.addItem = function (item) {
        var _this = this;
        if (MainLibrary.ondevice) {
            if (!item.path)
                return;
            var name = item.path.substr(item.path.lastIndexOf('/') + 1);
            item.filename = name;
            if (this.haveNames.indexOf(name) !== -1) {
                item.path = this.directory + name;
                item.ready = true;
            }
            else {
                if (!this.inQueueNames)
                    this.inQueueNames = [];
                var ind = this.inQueueNames.indexOf(name);
                if (ind === -1) {
                    var loader = new FileLoader(item, this.directory);
                    loader.READY, function (evt, loader) { return _this.onFileReady(loader); };
                    this.inQueueNames.push(name);
                }
            }
        }
        else
            item.ready = true;
    };
    MainLibrary.server = 'http://192.168.1.10:56777/';
    return MainLibrary;
}());
//# sourceMappingURL=Library.js.map