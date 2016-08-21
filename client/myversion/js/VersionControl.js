/**
 * Created by Vlad on 8/13/2016.
 */
///<reference path="../../typings/jquery.d.ts"/>
///<reference path="../../typings/FileSystem.d.ts"/>
///<reference path="../../typings/cordova/cordova.d.ts"/>
var uplight;
(function (uplight) {
    var FileLoader = (function () {
        function FileLoader(filepath, server, directory) {
            // var ind:number = source.lastIndexOf('/')+1;
            // var folder:string =source.substr(0,ind);
            // var filename = source.substr(ind);
            var _this = this;
            this.filepath = filepath;
            // console.log(ind+'   '+ folder+'   '+filename);
            var fileTransfer = new FileTransfer();
            var url = encodeURI(server + filepath);
            var dest = directory + filepath;
            console.log(url);
            fileTransfer.download(url, dest, function (entry) {
                _this.destination = entry.toURL();
                _this.onComplete(_this);
                console.log("download complete: " + _this.destination);
            }, function (error) {
                console.log(error);
                _this.onError(_this, error);
            }, false, {
                headers: {
                    "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                }
            });
        }
        FileLoader.prototype.destroy = function () {
            this.onComplete = null;
            this.onError = null;
        };
        FileLoader.prototype.download = function () {
            /*
            
                        var fileTransfer = new FileTransfer();
                        var url = encodeURI(this.source);
                        var dest:string = this.destination;
            
                        fileTransfer.download(
                            url,
                            dest,
                            (entry:FileEntry) =>{
                                this.destination = entry.toURL();
                               this.onComplete(this);
                                console.log("download complete: " + this.destination);
                            },
                            (error)=> {
                                console.log("download error source " + error.source);
                                console.log("download error target " + error.target);
                                console.log("upload error code" + error.code);
                                this.onError(this);
                            },
                            false,
                            {
                                headers: {
                                    "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                                }
                            }
                        );
            
                        console.log('start download '+this.source);
            */
        };
        return FileLoader;
    }());
    uplight.FileLoader = FileLoader;
    var VersionControl = (function () {
        function VersionControl() {
            var _this = this;
            this.server = 'http://192.168.1.10:56888/';
            this.loadDirectory(function () {
                console.log(_this.appfiles);
                console.log(_this.appDirectory);
                var file = _this.getAppFileRef('version.json');
                if (file) {
                    file.file(function (file) {
                        var reader = new FileReader();
                        reader.onloadend = function (evt) {
                            _this.myversion = JSON.parse(evt.target.result);
                            _this.loadServerVersion();
                        };
                        reader.readAsText(file);
                    });
                }
                else
                    _this.loadServerVersion();
            });
        }
        VersionControl.prototype.loadAppFile = function (filename) {
        };
        VersionControl.prototype.getAppFileRef = function (filename) {
            var f;
            this.appfiles.forEach(function (entry) {
                if (entry.name == filename)
                    f = entry;
            });
            return f;
        };
        VersionControl.prototype.loadDirectory = function (callBack) {
            var _this = this;
            this.getFolderEbtry('myapp', function (dir, files) {
                _this.appfiles = files;
                _this.appDirectory = dir;
                callBack();
            }, function (err) { return _this.onError(err); });
        };
        VersionControl.prototype.onError = function (err) {
        };
        VersionControl.prototype.getFolderEbtry = function (folder, callBack, onError) {
            window.requestFileSystem(window.PERSISTENT, 0, function (fs) {
                fs.root.getDirectory(folder, { create: true }, function (dir) {
                    dir.createReader().readEntries(function (res) {
                        callBack(dir, res);
                    }, function (error) { console.log('error read files'); });
                });
            }, onError);
        };
        VersionControl.prototype.getAppFile = function (filename, dataObj, callBack) {
            window.requestFileSystem(window.PERSISTENT, 0, function (fs) {
            }, function (err) { return callBack(err); });
        };
        VersionControl.prototype.saveAppFile = function (filename, dataObj, callBack) {
            this.appDirectory.getFile(filename, { create: true, exclusive: false }, function (fileEntry) {
                fileEntry.createWriter(function (fileWriter) {
                    fileWriter.onwriteend = function () { callBack(); };
                    fileWriter.onerror = function (e) {
                        callBack(e);
                    };
                    fileWriter.write(dataObj);
                });
            }, function (err) { return callBack(err); });
        };
        VersionControl.prototype.saveVersion = function () {
        };
        VersionControl.prototype.showError = function (err) {
            $('#Error').text(JSON.parse(err));
        };
        VersionControl.prototype.onDownloadComplete = function () {
            var _this = this;
            if (this.errors.length)
                console.error(this.errors);
            this.saveAppFile('version.json', JSON.stringify(this.myversion), function (err) {
                if (err)
                    _this.showError(err);
                else {
                    _this.start();
                }
            });
        };
        VersionControl.prototype.start = function () {
            console.log('staring ' + this.myversion.start);
            //  window.location.href =  this.myversion.start;
        };
        VersionControl.prototype.removeLoader = function (loader) {
            var ind = this.downloading.indexOf(loader);
            if (ind !== -1)
                this.downloading.splice(ind, 1);
            loader.destroy();
        };
        VersionControl.prototype.onLoaderComplte = function (loader) {
            this.removeLoader(loader);
            if (this.downloading.length === 0)
                this.onDownloadComplete();
        };
        VersionControl.prototype.onLoaderError = function (loader) {
            this.errors.push('loading ' + loader.destination);
            this.removeLoader(loader);
            if (this.downloading.length === 0)
                this.onDownloadComplete();
        };
        VersionControl.prototype.downloadAppFiles = function () {
            var _this = this;
            var files = this.myversion.download;
            console.log('start download ', files);
            var out = [];
            var server = this.server;
            var dir = this.appDirectory.toURL();
            if (!this.appDirectory) {
                console.log('errrro');
                return;
            }
            files.forEach(function (path) {
                var loader = new FileLoader(path, server, dir);
                loader.onComplete = function (loader) { return _this.onLoaderComplte(loader); };
                loader.onError = function (loader) { return _this.onLoaderError(loader); };
                out.push(loader);
            });
            this.errors = [];
            this.downloading = out;
        };
        VersionControl.prototype.loadServerVersion = function () {
            var _this = this;
            var vers = this.myversion ? this.myversion.version : '0.0.0';
            $.get(this.server + 'version/' + vers).done(function (res) {
                console.log(res);
                var download = res.download;
                if (download && download.length) {
                    _this.myversion = res;
                    _this.downloadAppFiles();
                }
                else {
                    console.log('nothing  to download');
                    _this.start();
                }
            });
        };
        return VersionControl;
    }());
    uplight.VersionControl = VersionControl;
})(uplight || (uplight = {}));
//# sourceMappingURL=VersionControl.js.map