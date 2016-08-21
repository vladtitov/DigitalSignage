/**
 * Created by Vlad on 8/14/2016.
 */
var htplayer;
(function (htplayer) {
    var VOAssetItem = (function () {
        function VOAssetItem(obj) {
            for (var str in obj)
                this[str] = obj[str];
            if (!this.lasting)
                this.lasting = this.duration;
        }
        return VOAssetItem;
    }());
    htplayer.VOAssetItem = VOAssetItem;
})(htplayer || (htplayer = {}));
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
/**
 * Created by Vlad on 8/11/2016.
 */
///<reference path="AssetsModel.ts"/>
var htplayer;
(function (htplayer) {
    var ViewportModel = (function () {
        function ViewportModel(obj) {
            this.timer = 0;
            this.currentIndex = -1;
            for (var str in obj)
                this[str] = obj[str];
            this.getPlaylist();
        }
        ViewportModel.prototype.getPlaylist = function () {
            if (this.playlist_id) {
                this.loadPlaylist();
            }
            else
                console.warn(' PlayerController   no palylistid');
        };
        ViewportModel.prototype.destroy = function () {
            this.view.remove();
        };
        ViewportModel.prototype.appendView = function ($container) {
            this.view = new htplayer.PlayerLite(this);
            this.view.appendTo($container);
        };
        ViewportModel.prototype.getNextItem = function () {
            this.currentIndex++;
            if (this.currentIndex >= this.playlistItems.length)
                this.currentIndex = 0;
            return this.playlistItems[this.currentIndex];
        };
        ViewportModel.prototype.startPlay = function () {
            console.log('PlayerController   start paly');
            this.view.startPlay();
        };
        ViewportModel.prototype.stopPlay = function () {
            this.view.stopPlay();
        };
        ViewportModel.prototype.setItems = function (ar) {
            ///  console.log('  setItems  MainLibrary   '+(typeof MainLibrary));
            if (typeof MainLibrary !== 'undefined') {
                for (var i = 0, n = ar.length; i < n; i++) {
                    MainLibrary.library.addItem(ar[i]);
                }
            }
            //  console.log(ar);
            this.playlistItems = ar;
        };
        ViewportModel.prototype.loadPlaylist = function () {
            var _this = this;
            var url = htplayer.playerURL + 'playlist/' + this.playlist_id;
            console.log('loadPlaylist  ' + url);
            $.get(url).done(function (res) {
                /// console.log('this.playlist_id  '+this.playlist_id,res);
                if (res.data) {
                    var ar = res.data.map(function (item) { return new htplayer.VOAssetItem(item); });
                    _this.setItems(ar);
                    _this.startPlay();
                }
                // var vo:VOPlaylist = new VOPlaylist(res.data);
                // this.playlist = new PlayListModel(vo);
                //   this.startPlay();
            });
        };
        return ViewportModel;
    }());
    htplayer.ViewportModel = ViewportModel;
})(htplayer || (htplayer = {}));
/**
 * Created by Vlad on 8/11/2016.
 */
var htplayer;
(function (htplayer) {
    var PlayerLite = (function () {
        function PlayerLite(model) {
            this.model = model;
            this.width = model.width;
            this.height = model.height;
            this.x = model.x;
            this.y = model.y;
        }
        PlayerLite.prototype.startPlay = function () {
            console.log('player lirt start ');
            this.isPlaying = true;
            this.playNext();
        };
        PlayerLite.prototype.stopPlay = function () {
            this.isPlaying = false;
        };
        PlayerLite.prototype.destroy = function () {
        };
        PlayerLite.prototype.playNext = function () {
            var _this = this;
            if (!this.isPlaying)
                return;
            var asset = this.model.getNextItem();
            console.log('hext item    ', asset);
            if (!asset || !asset.ready) {
                setTimeout(function () { return _this.playNext(); }, 1000);
                return;
            }
            if (!this.nextItem) {
                this.nextItem = asset;
                this.playNext();
                return;
            }
            this.prevItem = this.currentItem;
            this.currentItem = this.nextItem;
            this.nextItem = asset;
            var currentItem = this.currentItem;
            if (isNaN(currentItem.lasting))
                currentItem.lasting = 10;
            var delay = currentItem.lasting;
            if (this.prevItem && this.prevItem.asset_id === this.currentItem.asset_id) {
                console.log('same asset skipping');
            }
            else {
                switch (currentItem.type) {
                    case 'video':
                        delay += 3;
                        this.showVideo(currentItem);
                        break;
                    case 'image':
                        this.showImage(currentItem);
                        break;
                    default:
                        this.showImage(currentItem);
                        break;
                }
            }
            setTimeout(function () { return _this.playNext(); }, (delay * 1000));
        };
        PlayerLite.prototype.remove = function () {
            this.$view.remove();
        };
        PlayerLite.prototype.showImage = function (item) {
            var view = $('<img>').attr('src', item.path).css('max-width', this.width + 'px').css('max-height', this.height + 'px');
            this.switchView(view);
        };
        PlayerLite.prototype.switchView = function (newview) {
            var prev = this.$view.children();
            prev.fadeOut(function () {
                prev.remove();
            });
            newview.hide();
            this.$view.append(newview);
            newview.fadeIn();
        };
        PlayerLite.prototype.showVideo = function (item) {
            var view = $('<video>').attr('autoplay', 'true').append($('<source>').attr('src', item.path)).css('max-width', this.width + 'px').css('max-height', this.height + 'px');
            this.switchView(view);
        };
        PlayerLite.prototype.appendTo = function ($container) {
            this.$view = $('<div>').addClass('ht-player').width(this.width).height(this.height).offset({ left: this.x, top: this.y }).appendTo($container);
            return this.$view;
        };
        return PlayerLite;
    }());
    htplayer.PlayerLite = PlayerLite;
})(htplayer || (htplayer = {}));
/**
 * Created by Vlad on 8/5/2016.
 */
///<reference path="../models.ts"/>
///<reference path="viewport-model.ts"/>
///<reference path="player-lite.ts"/>
///<reference path="AssetsModel.ts"/>
var htplayer;
(function (htplayer) {
    var HTMyPlayer = (function () {
        function HTMyPlayer(selector) {
            this.$view = $(selector);
        }
        HTMyPlayer.prototype.appendTo = function ($container) {
            $container.append(this.$view);
        };
        HTMyPlayer.prototype.width = function () {
            return this.layout.width || 1920;
        };
        HTMyPlayer.prototype.height = function () {
            return this.layout.height || 1080;
        };
        HTMyPlayer.prototype.start = function () {
        };
        HTMyPlayer.prototype.checkLayoutTimestamp = function () {
        };
        HTMyPlayer.prototype.createView = function () {
            var _this = this;
            this.viewports.forEach(function (model) {
                model.appendView(_this.$view);
            });
        };
        /*  loadLayoutStats():void{
              $.get(playerURL+'layout-stats/'+this.layout.id).done((res)=>{
                 // this.deviceStats = new VODeviceStats(res.data);
  
              })
          }
  */
        HTMyPlayer.prototype.setNewLayout = function (layout) {
            this.layout = layout;
            this.setNewViewPorts();
        };
        /* loadLayout(layout_id:number):void{
             $.get(playerURL+'layout/'+layout_id).done((res)=>{
                 console.log(res);
 
               if(res.data){
                   this.layout = new VOLayout(res.data);
                   this.setNewViewPorts();
                   if(this.onLayotLoaded)this.onLayotLoaded();
               }else console.warn(res)
             })
         }*/
        HTMyPlayer.prototype.setNewViewPorts = function () {
            this.viewports = this.layout.viewports.map(function (item) { return new htplayer.ViewportModel(item); });
            this.createView();
        };
        return HTMyPlayer;
    }());
    htplayer.HTMyPlayer = HTMyPlayer;
})(htplayer || (htplayer = {}));
/**
 * Created by Vlad on 7/17/2016.
 */
var UtilsServices = (function () {
    function UtilsServices() {
    }
    UtilsServices.prototype.getUrlParams = function () {
        var _this = this;
        var str = window.location.href;
        var ar = str.split('?');
        if (ar.length == 1)
            return null;
        ar.shift();
        var out = [];
        ar.forEach(function (item) { return _this.parserParams(out, item); });
        return out;
    };
    UtilsServices.prototype.setParams = function (obj) {
        var paramsString = "?";
        for (var key in obj) {
            paramsString += key + "=" + obj[key] + "&";
        }
        paramsString = paramsString.substring(0, paramsString.length - 1);
        window.location.href = window.location.origin + window.location.pathname + paramsString;
    };
    UtilsServices.prototype.parserParams = function (out, str) {
        var ar = str.split('&');
        ar.forEach(function (item) {
            var vars = item.split('=');
            if (vars.length === 2)
                out[vars[0]] = isNaN(Number(vars[1])) ? vars[1] : Number(vars[1]);
        });
        return out;
    };
    UtilsServices.utils = new UtilsServices();
    return UtilsServices;
}());
///<reference path="../../typings/jquery/jquery.d.ts"/>
///<reference path="../../typings/moment/moment.d.ts"/>
///<reference path="../../typings/underscore/underscore.d.ts"/>
///<reference path="../htplayer/ht-payer.ts"/>
///<reference path="../models.ts"/>
///<reference path="../UtilsServices.ts"/>
///<reference path="Library.ts"/>
///<reference path="../htplayer/AssetsModel.ts"/>
///<reference path="../htplayer/viewport-model.ts"/>
var htplayer;
(function (htplayer) {
    var UpdateManager = (function () {
        function UpdateManager() {
        }
        UpdateManager.prototype.start = function () {
            try {
                this.userdata = new htplayer.VOUserData(JSON.parse(localStorage.getItem('userdata')));
            }
            catch (e) {
                console.log(e);
            }
            //  console.log('userdata ',this.userdata);
            if (!this.userdata || !this.userdata.token) {
                if (this.onNeedLogin)
                    this.onNeedLogin();
                return;
            }
            htplayer.playerURL = htplayer.server + 'player/' + this.userdata.token + '/';
            try {
                this.mydevice = new htplayer.VODevice(JSON.parse(localStorage.getItem('mydevice')));
            }
            catch (e) {
                console.log(e);
            }
            if (!this.mydevice) {
                if (this.onNeedLogin)
                    this.onNeedLogin();
                return;
            }
            // console.log('mydevice     ',this.mydevice);
            try {
                this.mylayout = new htplayer.VOLayout(JSON.parse(localStorage.getItem('mylayout')));
            }
            catch (e) {
                console.log(e);
            }
            // console.log('mylayout ',this.mylayout);
            if (!this.mylayout) {
                this.loadLayout();
            }
            else {
                if (UpdateManager.online)
                    this.loadDevice();
                else {
                    console.log('on ready');
                    if (this.onReady)
                        this.onReady(this.mylayout);
                }
            }
        };
        UpdateManager.prototype.loadDevice = function () {
            var _this = this;
            var url = htplayer.playerURL + 'mydevice-stats/' + this.mydevice.id;
            console.log('load device ' + url);
            $.get(url).done(function (res) {
                //  console.log(res);
                if (res.data) {
                    var olddevice = _this.mydevice;
                    _this.mydevice = new htplayer.VODevice(res.data);
                    localStorage.setItem('mydevice', JSON.stringify(_this.mydevice));
                    _this.loadLayout();
                }
                else
                    console.warn(res);
            });
        };
        UpdateManager.prototype.onOldLayout = function () {
            if (this.onReady)
                this.onReady(this.mylayout);
        };
        UpdateManager.prototype.loadLayout = function () {
            var _this = this;
            var url = htplayer.playerURL + 'layout/' + this.mydevice.layout_id;
            console.log('load layout ' + url);
            $.get(url).done(function (res) {
                /// console.log(res);
                if (res.data) {
                    var oldLayout = _this.mylayout;
                    _this.mylayout = new htplayer.VOLayout(res.data);
                    if (_this.onReady)
                        _this.onReady(_this.mylayout);
                    if (oldLayout && _this.mylayout.id === oldLayout.id && _this.mylayout.timestamp == oldLayout.timestamp) {
                        _this.onOldLayout();
                    }
                    else {
                        localStorage.setItem('mylayout', JSON.stringify(_this.mylayout));
                        if (_this.onNewLayout)
                            _this.onNewLayout(_this.mylayout);
                    }
                }
                else
                    console.warn(res);
            });
        };
        UpdateManager.prototype.saveData = function () {
            localStorage.setItem('userdata', JSON.stringify(this.userdata));
            localStorage.setItem('mydevice', JSON.stringify(this.mydevice));
        };
        UpdateManager.prototype.saveLayout = function () {
            console.log('savong ', this.mylayout);
            localStorage.setItem('mylayout', JSON.stringify(this.mylayout));
        };
        return UpdateManager;
    }());
    htplayer.UpdateManager = UpdateManager;
    var PlayerController = (function () {
        function PlayerController() {
            var _this = this;
            var params = UtilsServices.utils.getUrlParams();
            if (params && params.callback)
                this.callback = params.callback;
            UpdateManager.online = true;
            console.log('htplayer comiled          ');
            this.$view = $('#MainPlayerContainer');
            $.ajaxSetup({
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                }
            });
            this.updateManager = new UpdateManager();
            this.updateManager.onReady = function () { return _this.startPlayer(); };
            this.updateManager.onNeedLogin = function () { return _this.onNeedLogin(); };
            this.updateManager.onNewLayout = function (layout) { return _this.onNewLayout(layout); };
            if (MainLibrary.library.getFilesystem()) {
                MainLibrary.library.onReady = function () { return _this.updateManager.start(); };
                console.log('playing on device uodated');
            }
            else {
                this.updateManager.start();
                console.log('playing in browser');
            }
        }
        PlayerController.prototype.showTip = function (message, obj) {
            var tip = $('#Library #ToolTip').clone().html('<span class="fa fa-minus-circle"></span> <span>' + message + '</span>').offset(obj.offset());
            tip.appendTo('body');
            setTimeout(function () {
                tip.remove();
            }, 3000);
        };
        PlayerController.prototype.startPlayer = function () {
            this.updateManager.onReady = null;
            if (this.callback) {
                console.log('this.callback  ' + this.callback);
                console.log('this.callback  ' + decodeURI(this.callback));
            }
            console.log('starting player  device ' + this.updateManager.mydevice.id + ' layoyt' + this.updateManager.mylayout.id);
            this.player = new htplayer.HTMyPlayer('#HTMyPlayer');
            this.player.setNewLayout(this.updateManager.mylayout);
            this.player.appendTo(this.$view);
            this.player.start();
        };
        PlayerController.prototype.onNewLayout = function (layout) {
        };
        PlayerController.prototype.onNeedLogin = function () {
            window.location.href = 'player-login.html';
        };
        return PlayerController;
    }());
    htplayer.PlayerController = PlayerController;
})(htplayer || (htplayer = {}));
$(document).ready(function () { return new htplayer.PlayerController(); });
//# sourceMappingURL=htplayer.js.map