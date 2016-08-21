var htplayer;
(function (htplayer) {
    var AssetVO = (function () {
        function AssetVO(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return AssetVO;
    }());
    htplayer.AssetVO = AssetVO;
    var PlayListItemVO = (function () {
        function PlayListItemVO(obj) {
            for (var str in obj)
                this[str] = obj[str];
            this.asset = new AssetVO(this.asset);
            if (!this.duration)
                this.duration = this.asset.duration;
        }
        PlayListItemVO.removeMe = function (item) {
        };
        return PlayListItemVO;
    }());
    htplayer.PlayListItemVO = PlayListItemVO;
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
    var PlaylistVO = (function () {
        function PlaylistVO(obj) {
            for (var str in obj)
                this[str] = obj[str];
            var ar = [];
            if (this.list)
                this.list.forEach(function (item) {
                    ar.push(new PlayListItemVO(item));
                });
            this.list = ar;
            if (this.list.length && this.list[0].asset)
                this.image = this.list[0].asset.path;
            this.props = new VOPlayListProps(this.props || {});
            this.image = this.list.length ? this.list[0].asset.thumb : '';
        }
        return PlaylistVO;
    }());
    htplayer.PlaylistVO = PlaylistVO;
    var VOViewport = (function () {
        function VOViewport(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VOViewport;
    }());
    htplayer.VOViewport = VOViewport;
    var VODevice = (function () {
        function VODevice(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VODevice;
    }());
    htplayer.VODevice = VODevice;
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
})(htplayer || (htplayer = {}));
var htplayer;
(function (htplayer) {
    var ViewportModel = (function () {
        function ViewportModel(viewport) {
            this.viewport = viewport;
        }
        ViewportModel.prototype.appendTo = function ($container) {
            return this.view.appendTo($container);
        };
        ViewportModel.prototype.startPlay = function () {
            console.log('playing');
            this.playNext();
        };
        ViewportModel.prototype.playNext = function () {
            var _this = this;
            var item = this.playlist.getNext();
            console.log(item);
            switch (item.type) {
                case 'video':
                    this.view.showVideo(item);
                    break;
                case 'image':
                    this.view.showImage(item);
                    break;
                default:
                    this.view.showImage(item);
                    break;
            }
            setTimeout(function () { return _this.playNext(); }, 10000);
        };
        ViewportModel.prototype.createView = function () {
            if (!this.view)
                this.view = new ViewportView(this);
        };
        ViewportModel.prototype.isReady = function () {
            if (!this.playlist)
                return false;
            var need = this.playlist.needToDownload();
            return need === 0;
        };
        ViewportModel.prototype.loadPlaylist = function () {
            var _this = this;
            $.get(htplayer.server + 'api/player/playlist/' + this.viewport.playlist_id).done(function (res) {
                var vo = new htplayer.PlaylistVO(res.data);
                _this.playlist = new htplayer.PlayListModel(vo);
            });
        };
        return ViewportModel;
    }());
    htplayer.ViewportModel = ViewportModel;
    var ViewportView = (function () {
        function ViewportView(model) {
            this.model = model;
        }
        ViewportView.prototype.showImage = function (item) {
            this.$view.empty();
            this.$view.append($('<img>').attr('src', item.path));
        };
        ViewportView.prototype.showVideo = function (item) {
            this.$view.empty();
            this.$view.append($('<video>').attr('autoplay', 'true').append($('<source>').attr('src', item.path)));
        };
        ViewportView.prototype.appendTo = function ($container) {
            this.$view = $('<div>').addClass('ht-player').appendTo($container);
            return this.$view;
        };
        return ViewportView;
    }());
    htplayer.ViewportView = ViewportView;
})(htplayer || (htplayer = {}));
var htplayer;
(function (htplayer) {
    htplayer.server = 'http://192.168.1.10:56777/';
    var PlayListModel = (function () {
        function PlayListModel(playlist) {
            this.playlist = playlist;
            this.current = 0;
            var out = [];
            var paths = [];
            var names = [];
            playlist.list.forEach(function (item) {
                if (item && item.path && item.path.length && item.path.lastIndexOf('/') !== -1) {
                    var filename = item.path.substr(item.path.lastIndexOf('/') + 1);
                    item.filename = filename;
                    out.push(item);
                    if (!htplayer.MainLibrary.library.haveFile(filename))
                        paths.push(item.path);
                    names.push(filename);
                }
            });
            if (paths.length && htplayer.MainLibrary.library.device)
                htplayer.MainLibrary.library.addInQoeue(paths);
            this.filenames = names;
            this.list = out;
        }
        PlayListModel.prototype.needToDownload = function () {
            if (!htplayer.MainLibrary.library.device)
                return 0;
            var need = htplayer.MainLibrary.library.notHaveNames(this.filenames);
            return need.length;
        };
        PlayListModel.prototype.getItemByName = function (name) {
            var ind = this.filenames.indexOf(name);
            return this.list[ind];
        };
        PlayListModel.prototype.getNext = function () {
            this.current++;
            if (this.current >= this.list.length)
                this.current = 0;
            var item = this.list[this.current];
            htplayer.MainLibrary.library.setFilePath(item);
            return item;
        };
        return PlayListModel;
    }());
    htplayer.PlayListModel = PlayListModel;
    var Player = (function () {
        function Player(test) {
            var _this = this;
            console.log('HTplayer                ');
            if (test) {
                htplayer.MainLibrary.library.device = null;
                this.getDevice();
            }
            else {
                htplayer.MainLibrary.library.getFilesystem();
                htplayer.MainLibrary.library.onReady = function () {
                    console.log('libary ready ');
                    _this.getDevice();
                };
            }
            this.$loading = $('#deviceready');
            this.$main = $('#MainContainer');
            this.$container = $('#ViewportsContainer');
        }
        Player.prototype.getDevice = function () {
            var _this = this;
            $.get(htplayer.server + 'api/player/mydevice/1').done(function (res) {
                _this.device = new htplayer.VODevice(res.data);
                var ar = [];
                _this.device.layout.viewports.forEach(function (item) {
                    var vp = new htplayer.ViewportModel(item);
                    vp.loadPlaylist();
                    ar.push(vp);
                });
                _this.viewports = ar;
                _this.checkIsReady();
            });
        };
        Player.prototype.onReady = function () {
            console.log('files are ready   ');
        };
        Player.prototype.checkIsReady = function () {
            var _this = this;
            this.checkInterval = setInterval(function () {
                if (_this.isReady()) {
                    clearInterval(_this.checkInterval);
                    if (htplayer.MainLibrary.library.inQueue.length) {
                        console.log("MainLibrary.library.inQueue", htplayer.MainLibrary.library.inQueue);
                        console.log("MainLibrary.library.inProgressNames", htplayer.MainLibrary.library.inProgressNames);
                        htplayer.MainLibrary.library.loadNext();
                    }
                    _this.onReady();
                }
            }, 3000);
        };
        Player.prototype.removeLoadingScreen = function () {
            if (this.$loading) {
                this.$loading.remove();
                this.$loading = null;
            }
        };
        Player.prototype.isReady = function () {
            var _this = this;
            var ready = true;
            this.viewports.forEach(function (vp) {
                if (vp.isReady()) {
                    if (!vp.view) {
                        vp.createView();
                        vp.appendTo(_this.$container);
                        vp.startPlay();
                    }
                    _this.removeLoadingScreen();
                }
                else
                    ready = false;
            });
            return ready;
        };
        return Player;
    }());
    htplayer.Player = Player;
})(htplayer || (htplayer = {}));
var htplayer;
(function (htplayer) {
    var FileLoader = (function () {
        function FileLoader(filename, path, directory) {
            this.filename = filename;
            this.path = path;
            this.directory = directory;
            this.server = 'http://192.168.1.10:56777/';
            this.READY = 'ready';
            this.trigger = $({});
            this.download();
        }
        FileLoader.prototype.download = function () {
            var _this = this;
            var fileTransfer = new FileTransfer();
            var url = encodeURI(this.server + this.path);
            var path = this.directory + this.filename;
            console.log(url, path);
            fileTransfer.download(url, path, function (entry) {
                _this.path = entry.toURL();
                _this.file = entry;
                _this.trigger.triggerHandler(_this.READY, entry);
                console.log("download complete: " + _this.filename);
            }, function (error) {
                console.log("download error source " + error.source);
                console.log("download error target " + error.target);
                console.log("upload error code" + error.code);
            }, false, {
                headers: {
                    "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                }
            });
            console.log('start download ' + this.filename);
        };
        return FileLoader;
    }());
    htplayer.FileLoader = FileLoader;
    var MainLibrary = (function () {
        function MainLibrary() {
            this.haveNames = [];
            this.inQueue = [];
            this.necessaryNames = [];
            this.inProgressNames = [];
            this.server = 'http://192.168.1.10:56777/';
        }
        MainLibrary.prototype.setFilePath = function (item) {
            if (this.haveNames.indexOf(item.filename) !== -1)
                item.path = this.directory + '/' + item.filename;
        };
        MainLibrary.prototype.haveFile = function (name) {
            return this.haveNames.indexOf(name) !== -1;
        };
        MainLibrary.prototype.onErrorCreateFile = function (err) {
        };
        MainLibrary.prototype.onErrorLoadFs = function (err) {
            alert('error load filesystem ' + err);
        };
        MainLibrary.prototype.getFilesystem = function () {
            var _this = this;
            if (!this.device)
                return;
            window.requestFileSystem(window.PERSISTENT, 0, function (fs) {
                _this.fs = fs;
                _this.root = fs.root;
                _this.root.getDirectory('content', { create: true }, function (dir) {
                    _this.directory = dir.toURL();
                    dir.createReader().readEntries(function (res) {
                        _this.files = res;
                        _this.haveNames = res.map(function (item) { return item.name; });
                        console.log('have names ', _this.haveNames);
                        if (_this.onReady)
                            _this.onReady();
                    }, function (error) { console.log('error read files'); });
                });
            }, function (err) { return _this.onErrorLoadFs(err); });
        };
        MainLibrary.prototype.onFileReady = function (fl) {
            var name = fl.filename;
            var ind = this.inProgressNames.indexOf(name);
            if (ind !== -1)
                this.inProgressNames.splice(ind, 0);
            this.haveNames.push(name);
        };
        MainLibrary.prototype.notInProgress = function (names) {
            var out = [];
            var test = this.inProgressNames;
            names.forEach(function (item) {
                if (test.indexOf(item) === -1)
                    out.push(item);
            });
            return out;
        };
        MainLibrary.prototype.notHaveNames = function (names) {
            var out = [];
            var test = this.haveNames;
            names.forEach(function (item) {
                if (test.indexOf(item) === -1)
                    out.push(item);
            });
            return out;
        };
        MainLibrary.prototype.loadNext = function () {
            var _this = this;
            if (this.inQueue.length) {
                var path = this.inQueue.pop();
                if (!path)
                    return;
                var name = path.substr(path.lastIndexOf('/') + 1);
                if (name && this.haveNames.indexOf(name) === -1) {
                    console.log('dont have in storage ' + name);
                    if (this.inProgressNames.indexOf(name) == -1) {
                        console.log('dont have in prograess ' + name);
                        var loader = new FileLoader(name, path, this.directory);
                        loader.trigger.on(loader.READY, function (evt, file) { return _this.onFileReady(file); });
                        this.inProgressNames.push(name);
                    }
                    else
                        this.loadNext();
                }
                else
                    this.loadNext();
            }
        };
        MainLibrary.prototype.addInQoeue = function (paths) {
            var _this = this;
            paths.forEach(function (path) {
                if (!path || path == 'undefined' || path === 'null') {
                    console.log('ERRRROR library to load    ' + path);
                }
                else {
                    var name = path.substr(path.lastIndexOf('/') + 1);
                    if (!name || name.indexOf('.') == -1) {
                        console.log('ERRRROR library to load    ' + path);
                    }
                    else
                        _this.inQueue.push(path);
                }
            });
            this.loadNext();
        };
        MainLibrary.library = new MainLibrary();
        return MainLibrary;
    }());
    htplayer.MainLibrary = MainLibrary;
})(htplayer || (htplayer = {}));
//# sourceMappingURL=main.js.map