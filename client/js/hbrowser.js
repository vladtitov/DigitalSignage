var hbrowser;
(function (hbrowser) {
    var VOAssetItem = (function () {
        function VOAssetItem(obj) {
            for (var str in obj)
                this[str] = obj[str];
            if (!this.lasting)
                this.lasting = this.duration;
        }
        return VOAssetItem;
    }());
    hbrowser.VOAssetItem = VOAssetItem;
})(hbrowser || (hbrowser = {}));
var hbrowser;
(function (hbrowser) {
    var Debugger = (function () {
        function Debugger() {
        }
        Debugger.prototype.send = function (data) {
            if (typeof data == 'object')
                data = JSON.stringify(data);
            $.post('http://192.168.1.10:56888/debug', data);
        };
        Debugger.prototype.show = function (msg) {
            if (!this.$console)
                this.createConsole();
            this.$console.append(msg);
        };
        Debugger.prototype.rewriteconsole = function () {
            var _this = this;
            console.log = function (log) { return _this.send(log); };
            console.error = function (log) { return _this.send(log); };
            console.warn = function (log) { return _this.send(log); };
        };
        Debugger.prototype.createConsole = function () {
            this.$view = $('<div>').appendTo('body').css({
                position: 'absolute',
                top: 0,
                left: 0
            });
            this.$console = $('<div>').appendTo(this.$view).css({
                position: 'absolute',
                top: 0,
                left: 0
            });
        };
        Debugger.prototype.stop = function () {
            clearInterval(this.interval);
        };
        Debugger.prototype.start = function () {
            var _this = this;
            this.interval = setInterval(function () { return _this.checkReload(); }, 3000);
            this.rewriteconsole();
        };
        Debugger.prototype.checkReload = function () {
            $.get('http://192.168.1.10:56888/reload/' + Date.now()).done(function (res) {
                if (res == 'reload')
                    window.location.reload();
            });
        };
        return Debugger;
    }());
    hbrowser.Debugger = Debugger;
})(hbrowser || (hbrowser = {}));
var hbrowser;
(function (hbrowser) {
    var DeviceModel = (function () {
        function DeviceModel(obj) {
            for (var str in obj)
                this[str] = obj[str];
            var cl;
            this.$view = $('<div>').addClass('mydevice').data('id', this.id);
            var icon = '<div class="fa fa-desktop"></div>';
            var label = '<div>' + this.label + '</div>';
            var descr = '<div>' + this.description + '</div>';
            var props = '<div>' + label + descr + '</div>';
            this.$deviceView = $('<div>').addClass('mydevice-view').html(icon + props).appendTo(this.$view);
            if (this.image) {
                var layout = '<div><img src="' + this.image + '"/></div>';
                this.$layoutView = $('<div>').addClass('layout').html(layout).appendTo(this.$view);
            }
        }
        Object.defineProperty(DeviceModel.prototype, "selected", {
            set: function (sel) {
                sel ? this.$view.addClass('selected') : this.$view.removeClass('selected');
            },
            enumerable: true,
            configurable: true
        });
        return DeviceModel;
    }());
    hbrowser.DeviceModel = DeviceModel;
})(hbrowser || (hbrowser = {}));
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
var hbrowser;
(function (hbrowser) {
    var DevicesList = (function () {
        function DevicesList() {
        }
        DevicesList.prototype.addListeners = function () {
            var _this = this;
            this.$submit = this.$view.find('.submit').first().click(function () {
                if (_this.selectedDevice) {
                    if (_this.onComplete) {
                        var dev = new htplayer.VODevice({
                            id: _this.selectedDevice.id,
                            description: _this.selectedDevice.description,
                            layout_id: _this.selectedDevice.layout_id,
                            timestamp: _this.selectedDevice.timestamp
                        });
                        _this.onComplete(dev);
                    }
                }
                else
                    _this.$submit.prop('disabled', true);
            });
            this.$submit.prop('disabled', true);
            this.$list.on('click', '.mydevice', function (evt) {
                var id = $(evt.currentTarget).data('id');
                if (isNaN(id))
                    return;
                if (_this.selectedDevice)
                    _this.selectedDevice.selected = false;
                _this.$submit.prop('disabled', false);
                _this.selectedDevice = _this.getDeviceByIg(id)[0];
                _this.selectedDevice.selected = true;
            });
        };
        DevicesList.prototype.createView = function () {
            this.$view = $('<div>').addClass('devices-list-view text-center row');
            this.$submit = $('<button>').text('Sign this devise').prop('disabled', true).addClass('btn btn-primary').appendTo(this.$view);
            var row = $('<div>').addClass('row').appendTo(this.$view);
            this.$list = $('<div>').addClass('devices-list row').appendTo(row);
        };
        DevicesList.prototype.appendTo = function ($outlet) {
            if (!this.$view)
                this.createView();
            this.$view.appendTo($outlet);
            this.addListeners();
        };
        DevicesList.prototype.getDeviceByIg = function (id) {
            return this.devices.filter(function (item) { return item.id == id; });
        };
        DevicesList.prototype.loadDevices = function (url) {
            var _this = this;
            $.get(url).done(function (res) {
                var list = res.data;
                if (!list) {
                    console.warn(res);
                    return;
                }
                console.log(res.data);
                _this.metadata = res.metadata || [];
                _this.devices = list.map(function (item) { return new hbrowser.DeviceModel(item); });
                _this.showDevices();
                _this.showMetadata();
            }).fail(function () { return _this.onFail(); });
        };
        DevicesList.prototype.showMetadata = function () {
            var out = '<ul>';
            this.metadata.forEach(function (item) {
                out += '<li><label>' + item.label + '</label><span>' + item.value + '</span></li>';
            });
            out += '</ul>';
            this.$view.find('.metadata').first().html(out);
        };
        DevicesList.prototype.showDevices = function () {
            var list1 = this.$list;
            this.devices.forEach(function (item) {
                if (item.layout_id)
                    list1.append(item.$view);
            });
            this.$list.append(list1);
        };
        return DevicesList;
    }());
    hbrowser.DevicesList = DevicesList;
})(hbrowser || (hbrowser = {}));
var hbrowser;
(function (hbrowser) {
    var DevicesManager = (function () {
        function DevicesManager(serverURL) {
            this.serverURL = serverURL;
            this.myinterval = 0;
        }
        DevicesManager.prototype.loadFromStorage = function () {
            try {
                this.mydevice = new htplayer.VODevice(JSON.parse(localStorage.getItem('mydevice')));
            }
            catch (e) {
                console.log(e);
            }
            if (this.mydevice && this.mydevice.id) {
                this.device_id = this.mydevice.id;
                this.loadDevice(this.device_id);
            }
            else if (this.onNeedDevice)
                this.onNeedDevice();
        };
        DevicesManager.prototype.startAoutCheck = function (delay) {
            var _this = this;
            if (!delay)
                delay = 10000;
            if (this.myinterval == 0)
                this.myinterval = setInterval(function () { return _this.loadDevice(); }, delay);
        };
        DevicesManager.prototype.stopAutoCheck = function () {
            clearInterval(this.myinterval);
            this.myinterval = 0;
        };
        DevicesManager.prototype.isOldDeviceData = function (newD) {
            var oldD = this.mydevice;
            if (oldD && oldD.timestamp == newD.timestamp && oldD.layout.props.id == newD.layout.props.id && oldD.layout.props.timestamp == newD.layout.props.timestamp)
                return true;
            return false;
        };
        DevicesManager.prototype._onDeviceLoaded = function (res) {
            if (res.data) {
                var device = new htplayer.VODevice(res.data);
                if (this.isOldDeviceData(device)) {
                    console.log('old device and layout');
                    return;
                }
                else {
                    console.log('new  device or layout');
                    this.mydevice = new htplayer.VODevice(res.data);
                    localStorage.setItem('mydevice', JSON.stringify(this.mydevice));
                    if (this.onNewDeviceLoaded)
                        this.onNewDeviceLoaded(this.mydevice);
                }
                if (this.onDeviceLoaded)
                    this.onDeviceLoaded(this.mydevice);
            }
            else
                this._onError(res);
        };
        DevicesManager.prototype.loadDevice = function (device_id) {
            var _this = this;
            if (device_id)
                this.device_id = device_id;
            if (!this.device_id)
                return false;
            $.get(this.serverURL + '/device/' + this.device_id).done(function (res) { return _this._onDeviceLoaded(res); }).fail(function (err) { return _this._onError(err); });
            return true;
        };
        DevicesManager.prototype._onError = function (err) {
            if (this.onError)
                this.onError(err);
        };
        return DevicesManager;
    }());
    hbrowser.DevicesManager = DevicesManager;
})(hbrowser || (hbrowser = {}));
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
var hbrowser;
(function (hbrowser) {
    var HBrowserController = (function () {
        function HBrowserController(options) {
            this.options = options;
            this.$container = $('#MainContainer');
            this.debug = new hbrowser.Debugger();
            this.debug.start();
            this.initDeviceManager();
        }
        HBrowserController.prototype.initDeviceManager = function () {
            var _this = this;
            var params = UtilsServices.utils.getUrlParams();
            var device_id = 0;
            if (params && params.device_id)
                device_id = Number(params.device_id);
            if (isNaN(device_id))
                device_id = 0;
            this.decicesManager = new hbrowser.DevicesManager(this.options.serverURL);
            this.decicesManager.loadDevice(device_id);
            this.decicesManager.startAoutCheck();
            this.decicesManager.onNewDeviceLoaded = function (device) {
                _this.createLayout(device.layout);
            };
        };
        HBrowserController.prototype.createLayout = function (layout) {
            if (this.layoutModel) {
                window.location.reload();
                return;
            }
            this.layoutModel = new hbrowser.LayoutController(this.options.serverURL);
            this.layoutModel.setLayout(layout);
            this.layoutModel.appendTo(this.$container);
        };
        HBrowserController.prototype.onNeedLogin = function () {
            this.$container.load('myversion/login.html');
            this.debug.show('need login');
        };
        return HBrowserController;
    }());
    hbrowser.HBrowserController = HBrowserController;
})(hbrowser || (hbrowser = {}));
var hbrowser;
(function (hbrowser) {
    var LayoutController = (function () {
        function LayoutController(serverURL) {
            this.serverURL = serverURL;
            this.$view = $('<div>').addClass('player-layout');
            this.screenHeight = $(window).height();
            this.screenWidth = $(window).width();
        }
        LayoutController.prototype.appendTo = function ($container) {
            $container.append(this.$view);
        };
        LayoutController.prototype.setLayout = function (layout) {
            this.layout = layout;
            var dw = this.screenWidth / layout.props.width;
            var dh = this.screenHeight / layout.props.height;
            hbrowser.PlayerModel.dx = dw;
            hbrowser.PlayerModel.dy = dh;
            console.log(dw + ' ' + dh);
            this.createViewPorts(layout.viewports);
        };
        LayoutController.prototype.createViewPorts = function (viewports) {
            var view = this.$view;
            var out = [];
            var server = this.serverURL;
            var w = this.screenWidth;
            var h = this.screenHeight;
            viewports.forEach(function (vp) {
                var ctr = new hbrowser.PlayerController(server, vp);
                out.push(ctr);
                ctr.appendTo(view);
                ctr.onReady = function () {
                    ctr.startPlay();
                    ctr.onReady = null;
                };
            });
            this.playerControllers = out;
        };
        return LayoutController;
    }());
    hbrowser.LayoutController = LayoutController;
})(hbrowser || (hbrowser = {}));
var hbrowser;
(function (hbrowser) {
    var PlayerController = (function () {
        function PlayerController(serverURL, obj) {
            this.serverURL = serverURL;
            this.timestamp = 0;
            this.myinterval = 0;
            this.timer = 0;
            this.currentIndex = -1;
            this.model = new hbrowser.PlayerModel(obj);
            this.view = new hbrowser.PlayerView(this.model);
            this.playlist_id = this.model.playlist_id;
            this.loadPlaylist();
            this.startInterval();
        }
        PlayerController.prototype.loadPlaylist = function () {
            var _this = this;
            var url = this.serverURL + '/playlist/' + this.playlist_id;
            console.log('loadPlaylist  ' + url);
            $.get(url).done(function (res) {
                if (res.data && res.data.list) {
                    _this.timestamp = 0;
                    var ar = res.data.list.map(function (item) { return new hbrowser.VOAssetItem(item); });
                    _this.model.setItems(ar);
                    if (_this.onReady)
                        _this.onReady();
                }
            });
        };
        PlayerController.prototype.needNewPlaylist = function () {
            console.log('new  playlist');
            this.loadPlaylist();
        };
        PlayerController.prototype.startInterval = function () {
            var _this = this;
            if (this.myinterval === 0)
                this.myinterval = setInterval(function () { return _this.loadPlaylistStats(); }, 10000);
        };
        PlayerController.prototype.stopInterval = function () {
            clearInterval(this.myinterval);
            this.myinterval = 0;
        };
        PlayerController.prototype.loadPlaylistStats = function () {
            var _this = this;
            this.startInterval();
            var url = this.serverURL + '/playlist-timestamp/' + this.playlist_id;
            $.get(url).done(function (res) {
                if (res.data) {
                    if (_this.timestamp == 0) {
                        _this.timestamp = res.data.timestamp;
                        return;
                    }
                    if (_this.timestamp != res.data.timestamp)
                        _this.needNewPlaylist();
                    else
                        console.log('old  playlist');
                }
            });
        };
        PlayerController.prototype.destroy = function () {
            this.stopPlay();
            this.view.destroy();
            this.$view.empty();
            this.$view.remove();
        };
        PlayerController.prototype.appendTo = function ($container) {
            if (!this.$view)
                this.$view = $('<div>').addClass('view-port');
            this.view.appendTo(this.$view);
            $container.append(this.$view);
        };
        PlayerController.prototype.startPlay = function () {
            if (!this.isPlaying) {
                this.isPlaying = true;
                this.playNext();
            }
        };
        PlayerController.prototype.stopPlay = function () {
            clearTimeout(this.checkTimeout);
            this.isPlaying = false;
        };
        PlayerController.prototype.playNext = function () {
            var _this = this;
            if (!this.isPlaying)
                return;
            var asset = this.model.getNextItem();
            if (!asset || !asset.ready) {
                setTimeout(function () { return _this.playNext(); }, 2000);
                console.log('asset not resdy');
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
                console.log('playing ' + currentItem.type + ' ' + this.currentItem.path);
                switch (currentItem.type) {
                    case 'video':
                        delay += 3;
                        this.view.showVideo(currentItem);
                        break;
                    case 'image':
                        this.view.showImage(currentItem);
                        break;
                    default:
                        this.view.showImage(currentItem);
                        break;
                }
            }
            if (typeof requestAnimationFrame === 'function') {
                this.frameCount = 0;
                this.needFrames = delay * 60;
                var path = this.currentItem.path;
                clearTimeout(this.checkTimeout);
                this.checkTimeout = setTimeout(function () { return _this.onDelayExeed20(path, delay); }, (delay * 1500));
                requestAnimationFrame(function (timer) { return _this.onFrame(timer); });
            }
            else
                console.error(' error no support for requestAnimationFrame');
        };
        PlayerController.prototype.onDelayExeed20 = function (path, delay) {
            var fps = this.frameCount / delay;
            if (fps < 5)
                console.error(' error delay exeed 200%  fps was: ' + fps + ' path: ' + path);
            else
                console.warn('delay exeed +50%  fps was: ' + fps + ' path: ' + path);
        };
        PlayerController.prototype.onFrame = function (timer) {
            var _this = this;
            if (!this.isPlaying)
                return;
            this.frameCount++;
            if (this.frameCount > this.needFrames) {
                this.playNext();
            }
            else
                requestAnimationFrame(function (timer) { return _this.onFrame(timer); });
        };
        return PlayerController;
    }());
    hbrowser.PlayerController = PlayerController;
})(hbrowser || (hbrowser = {}));
var hbrowser;
(function (hbrowser) {
    var PlayerModel = (function () {
        function PlayerModel(obj) {
            for (var str in obj)
                this[str] = obj[str];
            this.currentIndex = -1;
            this._x = this.x;
            this._y = this.y;
            this._width = this.width;
            this._height = this.height;
            var dx = PlayerModel.dx;
            var dy = PlayerModel.dy;
            this.x = Math.round(this._x * dx);
            this.y = Math.round(this._y * dy);
            this.width = Math.round(this._width * dx);
            this.height = Math.round(this._height * dy);
            this.playlistItems = [];
        }
        PlayerModel.prototype.scale = function (dx, dy) {
            this.x = Math.round(this._x * dx);
            this.y = Math.round(this._y + dy);
            this.width = Math.round(this._width * dx);
            this.height = Math.round(this._height * dy);
            if (this.onScale)
                this.onScale();
        };
        PlayerModel.prototype.setItems = function (ar) {
            ar.forEach(function (item) { item.ready = true; });
            this.playlistItems = ar;
        };
        PlayerModel.prototype.getNextItem = function () {
            if (this.playlistItems.length) {
                this.currentIndex++;
                if (this.currentIndex >= this.playlistItems.length)
                    this.currentIndex = 0;
                return this.playlistItems[this.currentIndex];
            }
            else
                return null;
        };
        PlayerModel.dx = 1;
        PlayerModel.dy = 1;
        return PlayerModel;
    }());
    hbrowser.PlayerModel = PlayerModel;
})(hbrowser || (hbrowser = {}));
var hbrowser;
(function (hbrowser) {
    var PlayerView = (function () {
        function PlayerView(model) {
            this.model = model;
            this.width = model.width;
            this.height = model.height;
            this.x = model.x;
            this.y = model.y;
        }
        PlayerView.prototype.destroy = function () {
            if (this.$view)
                this.$view.remove();
            if (this.$prev)
                this.$view.remove();
            if (this.$next)
                this.$next.remove();
            this.$view = null;
            this.$prev = null;
            this.$next = null;
        };
        PlayerView.prototype.remove = function () {
            this.$view.remove();
        };
        PlayerView.prototype.showImage = function (item) {
            var view = $('<img>').attr('src', item.path).css('max-width', this.width + 'px').css('max-height', this.height + 'px');
            this.switchView(view);
        };
        PlayerView.prototype.switchView = function (newview) {
            var prev = this.$view.children();
            prev.fadeOut(function () {
                prev.remove();
            });
            newview.hide();
            this.$view.append(newview);
            newview.fadeIn();
        };
        PlayerView.prototype.showVideo = function (item) {
            var view = $('<video>').attr('autoplay', 'true').append($('<source>').attr('src', item.path)).css('max-width', this.width + 'px').css('max-height', this.height + 'px');
            this.switchView(view);
        };
        PlayerView.prototype.appendTo = function ($container) {
            this.$view = $('<div>').addClass('ht-player').width(this.width).height(this.height).offset({ left: this.x, top: this.y }).appendTo($container);
            return this.$view;
        };
        return PlayerView;
    }());
    hbrowser.PlayerView = PlayerView;
})(hbrowser || (hbrowser = {}));
//# sourceMappingURL=hbrowser.js.map