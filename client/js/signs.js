///<reference path="../typings/jquery/jquery.d.ts"/>
///<reference path="../typings/underscore/underscore.d.ts"/>
var htplayer;
(function (htplayer) {
    htplayer.server = 'http://192.168.1.10:56777/';
    htplayer.playerURL = '';
    var VOAsset = (function () {
        function VOAsset(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VOAsset;
    }());
    htplayer.VOAsset = VOAsset;
    var VOPlayLists_Assets = (function () {
        function VOPlayLists_Assets(obj) {
            for (var str in obj)
                this[str] = obj[str];
            if (!this.lasting)
                this.lasting = this.duration;
        }
        return VOPlayLists_Assets;
    }());
    htplayer.VOPlayLists_Assets = VOPlayLists_Assets;
    // table layouts
    var VOLayoutProps = (function () {
        function VOLayoutProps(obj) {
            for (var str in obj)
                this[str] = obj[str];
            if (!this.id)
                this.id = -1;
        }
        return VOLayoutProps;
    }());
    htplayer.VOLayoutProps = VOLayoutProps;
    //
    var VOLayout = (function () {
        function VOLayout(obj) {
            for (var str in obj)
                this[str] = obj[str];
            var vps = [];
            if (obj.viewports) {
                obj.viewports.forEach(function (item) {
                    vps.push(new VOViewport(item));
                });
            }
            this.viewports = vps;
            this.props = new VOLayoutProps(this.props);
        }
        return VOLayout;
    }());
    htplayer.VOLayout = VOLayout;
    var VOTemplate = (function () {
        function VOTemplate(obj) {
            for (var str in obj)
                this[str] = obj[str];
            var out = [];
            if (obj.viewports) {
                obj.viewports.forEach(function (item) {
                    out.push(new VOViewport(item));
                });
            }
            this.viewports = out;
        }
        return VOTemplate;
    }());
    htplayer.VOTemplate = VOTemplate;
    var VOPlayListProps = (function () {
        function VOPlayListProps(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VOPlayListProps;
    }());
    htplayer.VOPlayListProps = VOPlayListProps;
    var VOPlaylist = (function () {
        function VOPlaylist(obj) {
            for (var str in obj)
                this[str] = obj[str];
            var ar = [];
            if (this.list)
                this.list.forEach(function (item) { ar.push(new VOPlayLists_Assets(item)); });
            this.list = ar;
            this.props = new VOPlayListProps(this.props || {});
        }
        return VOPlaylist;
    }());
    htplayer.VOPlaylist = VOPlaylist;
    var VOViewport = (function () {
        function VOViewport(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VOViewport;
    }());
    htplayer.VOViewport = VOViewport;
    var UpdateResult = (function () {
        function UpdateResult(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return UpdateResult;
    }());
    htplayer.UpdateResult = UpdateResult;
    var VOStats = (function () {
        function VOStats(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VOStats;
    }());
    htplayer.VOStats = VOStats;
    var VOUserData = (function () {
        function VOUserData(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VOUserData;
    }());
    htplayer.VOUserData = VOUserData;
    var VODevice = (function () {
        function VODevice(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VODevice;
    }());
    htplayer.VODevice = VODevice;
    var VODeviceStats = (function () {
        function VODeviceStats(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VODeviceStats;
    }());
    htplayer.VODeviceStats = VODeviceStats;
})(htplayer || (htplayer = {}));
/**
 * Created by Vlad on 8/18/2016.
 */
///<reference path="../../typings/jquery/jquery.d.ts"/>
///<reference path="../models.ts"/>
var htplayer;
(function (htplayer) {
    var Debugger = (function () {
        function Debugger() {
            var _this = this;
            setInterval(function () { return _this.checkReload(); }, 3000);
        }
        Debugger.prototype.send = function (data) {
            return $.post('http://192.168.1.10:56888/debug', data);
        };
        Debugger.prototype.checkReload = function () {
            this.send('checking').done(function (res) {
                // console.log(res);
                if (res.cmd == 'reload')
                    window.location.reload();
            });
        };
        return Debugger;
    }());
    htplayer.Debugger = Debugger;
    var Signs = (function () {
        function Signs(server, mydirectory, usbpath) {
            this.server = server;
            this.mydirectory = mydirectory;
            this.usbpath = usbpath;
            this.commonDir = "/mtd_down/common/";
            this.errorCount = 0;
            this.currentIndex = 0;
            this.downloadPlugin = document.getElementById("pluginObjectDownload");
            this.fullPath = this.commonDir + mydirectory;
            this.debugger = new Debugger();
            this.fs = new FileSystem();
            this.$progress = $('#Progress');
            var bValid = this.fs.isValidCommonPath(mydirectory);
            if (!bValid) {
                this.debugger.send('creating dir  ' + mydirectory);
                this.fs.createCommonDir(mydirectory);
            }
            else {
            }
            var jsdir = mydirectory;
            // this.fs.createCommonDir(jsdir);
            var valid = this.fs.isValidCommonPath(jsdir);
            this.$progress.append(jsdir + "    " + valid + ' <br/>');
            //  this.debugger.send('have dir   '+mydirectory );
            var file = this.fs.openCommonFile(mydirectory + '/version.json', 'r');
            if (!file)
                this.downloadVersion('0.0.0');
            else {
                var ver = file.readAll();
                this.fs.closeCommonFile(file);
                try {
                    this.version = JSON.parse(ver);
                }
                catch (e) {
                    this.$progress.append(e);
                }
                if (this.version)
                    this.downloadVersion(this.version.version);
                else
                    this.downloadVersion('0.0.0');
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
        Signs.prototype.onDownloadComplete = function () {
            var filename = this.commonDir + this.mydirectory + '/' + this.version.start;
            // $('#MainContainer').empty();
            $('#MainContainer').load(filename, function (res) {
                this.$progress.append(' load result  ' + res);
            });
            this.$progress.append(' next: ' + filename);
            //window.location.href = this.commonDir+this.mydirectory+'/'+this.version.start;
        };
        Signs.prototype.loadVersion = function () {
        };
        Signs.prototype.checkVersion = function () {
        };
        Signs.prototype.downloadNext = function () {
            this.currentIndex++;
            // this.errorCount =0;
            this.$progress.append('<br/> ' + this.currentIndex);
            // this.debugger.send('this.downloadfileList. '+this.downloadfileList);
            if (this.currentIndex < this.downloadfileList.length) {
                var filename = this.downloadfileList[this.currentIndex];
                this.$progress.append(' next: ' + filename);
                // document.getElementById('DownResult').innerHTML +='<p> Start download '+filename+'</p>';
                var src = 'http://192.168.1.10:56888/' + filename;
                var dest = this.fullPath + '/' + filename;
                this.$progress.append(' ' + src + '  to ' + dest + '<br/>');
                //this.debugger.send('downloading'+ src+'  to '+dest);
                var res = this.downloadPlugin.StartDownFile(src, dest);
            }
            else
                this.onDownloadComplete();
        };
        Signs.prototype.onDownloadEvent = function (param) {
            var _this = this;
            this.$progress.append(' ' + param + ' => ');
            var strList = param.split('?');
            if (strList[0] == '1000') {
                this.$progress.append(" Downloading : " + this.downloadfileList[this.currentIndex] + ': ');
                if (strList[1] == '1') {
                    this.errorCount = 0;
                    this.$progress.append(' Downloaded : ' + this.downloadfileList[this.currentIndex]);
                    setTimeout(function () {
                        _this.downloadNext();
                    }, 1000);
                }
                else {
                    this.$progress.append("  DOWNLOAD FAILED! " + this.downloadfileList[this.currentIndex] + ' this.errorCount :' + this.errorCount + ' ');
                    if (++this.errorCount < 3)
                        this.currentIndex--;
                    this.downloadNext();
                }
            }
            else if (strList[0] == '1001')
                this.$progress.append('DownRatio : 0~100   ' + strList[1]);
            else if (strList[0] == '1002')
                this.$progress.append('Down Speed : Bytes/Sec : It will be reach after Rati  ' + strList[1]);
        };
        Signs.prototype.onSettingsDownloaded = function () {
            var _this = this;
            var vers = this.fs.openCommonFile(this.mydirectory + '/version.json', 'r').readAll();
            this.$progress.append('Version: ' + vers);
            if (vers) {
                this.version = JSON.parse(vers);
                this.$progress.append('<br/>');
                if (this.version && this.version.download) {
                    this.downloadfileList = this.version.download;
                    this.currentIndex = -1;
                    this.downloadPlugin.OnComplete = function (param) { return _this.onDownloadEvent(param); };
                    this.downloadNext();
                }
            }
        };
        Signs.prototype.downloadVersion = function (currentVersion) {
            // this.debugger.send('downloadVersion'+downloadPlugin);
            var errorCount = 0;
            var dest = this.fullPath + '/version.json';
            var src = 'http://192.168.1.10:56888/version/' + currentVersion;
            this.debugger.send(src + '   dest:' + dest);
            this.$progress.append(src + '   dest:' + dest);
            var res = this.downloadPlugin.StartDownFile(src, dest);
            var deb = this.debugger;
            var self = this;
            var downloadComplete = function (param) {
                var params = param.split('?');
                if (params[0] == '1000') {
                    // document.getElementById('DownResult').innerHTML +='<p> got 1000   '+self.onSettingsDownloaded+'</p>';
                    self.onSettingsDownloaded();
                }
                document.getElementById('DownResult').innerHTML += '<p> ' + param + '    ' + dest + '</p>';
                //deb.send('params   downloadComplete' + param1);
            };
            this.downloadPlugin.OnComplete = downloadComplete; //(res,res2)=>this.onDownloadEvent(res,res2);
            // this.debugger.send('downloadPlugin  res   '+ downloadPlugin.OnComplete);
        };
        Signs.prototype.downloadFile = function () {
            var DownloadPlugin = document.getElementById("pluginObjectDownload");
            DownloadPlugin.OnComplete = 'loadWidget';
            function loadWidget(param1) {
                var strList = param1.split('?');
                alert("strList = " + strList);
                alert("OnComplete");
            }
        };
        Signs.prototype.checkFilesystem = function () {
        };
        Signs.prototype.readUsbDrive = function () {
            var fileSystemObj = new FileSystem();
            var usbPath = this.usbpath;
            var arrFiles = fileSystemObj.readDir(usbPath);
            if (arrFiles) {
                //  var vers= arrFiles.fil
                for (var i = 0; i < arrFiles.length; i++) {
                    alert(arrFiles[i].name);
                    alert(arrFiles[i].isDir);
                }
            }
        };
        return Signs;
    }());
    htplayer.Signs = Signs;
})(htplayer || (htplayer = {}));
//# sourceMappingURL=signs.js.map