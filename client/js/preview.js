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
            this.view.startPlay();
        };
        ViewportModel.prototype.stopPlay = function () {
            this.view.stopPlay();
        };
        ViewportModel.prototype.setItems = function (ar) {
            ///  console.log('  setItems  MainLibrary   '+(typeof MainLibrary));
            var haslibrary = (typeof MainLibrary !== 'undefined');
            for (var i = 0, n = ar.length; i < n; i++) {
                if (haslibrary)
                    MainLibrary.library.addItem(ar[i]);
                else
                    ar[i].ready = true;
            }
            //  console.log(ar);
            this.playlistItems = ar;
        };
        ViewportModel.prototype.loadPlaylist = function () {
            var _this = this;
            var url = htplayer.playerURL + 'playlists/byid/' + this.playlist_id;
            console.log('loadPlaylist  ' + url);
            $.get(url).done(function (res) {
                console.log('this.playlist_id  ' + _this.playlist_id, res);
                if (res.data && res.data.list) {
                    var ar = res.data.list.map(function (item) { return new htplayer.VOAssetItem(item); });
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
            return this.layout.props.width || 1920;
        };
        HTMyPlayer.prototype.height = function () {
            return this.layout.props.height || 1080;
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
        HTMyPlayer.prototype.loadPlaylist = function (playlist_id) {
            var _this = this;
            $.get(htplayer.playerURL + 'layouts/byid/' + playlist_id).done(function (res) {
                console.log(res);
                if (res.data) {
                    _this.layout = new htplayer.VOLayout(res.data);
                    _this.setNewViewPorts();
                    if (_this.onLayotLoaded)
                        _this.onLayotLoaded();
                }
                else
                    console.warn(res);
            });
        };
        HTMyPlayer.prototype.loadLayout = function (layout_id) {
            var _this = this;
            $.get(htplayer.playerURL + 'layouts/byid/' + layout_id).done(function (res) {
                console.log(res);
                if (res.data) {
                    _this.layout = new htplayer.VOLayout(res.data);
                    _this.setNewViewPorts();
                    if (_this.onLayotLoaded)
                        _this.onLayotLoaded();
                }
                else
                    console.warn(res);
            });
        };
        HTMyPlayer.prototype.loadDevice = function (device_id) {
            var _this = this;
            $.get(htplayer.playerURL + 'layouts/by-device-id/' + device_id).done(function (res) {
                console.log(res);
                if (res.data) {
                    _this.layout = new htplayer.VOLayout(res.data);
                    _this.setNewViewPorts();
                    if (_this.onLayotLoaded)
                        _this.onLayotLoaded();
                }
                else
                    console.warn(res);
            });
        };
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
/**
 * Created by Vlad on 8/10/2016.
 */
///<reference path="../../typings/jquery/jquery.d.ts"/>
///<reference path="../../typings/moment/moment.d.ts"/>
///<reference path="../../typings/underscore/underscore.d.ts"/>
///<reference path="../../typings/cordova/cordova.d.ts"/>
///<reference path="../htplayer/ht-payer.ts"/>
///<reference path="../UtilsServices.ts"/>
var htplayer;
(function (htplayer) {
    var PreviewController = (function () {
        function PreviewController() {
            var _this = this;
            // let params:any = UtilsServices.utils.getUrlParams();
            var layout_id;
            var device_id;
            var playlist_id;
            var params = window.location.href.split('/');
            console.log('params: ', params);
            var ind = params.indexOf('layout');
            if (ind != -1) {
                layout_id = +params[ind + 1];
            }
            else {
                ind = params.indexOf('device');
                if (ind != -1) {
                    device_id = +params[ind + 1];
                }
                else {
                    ind = params.indexOf('playlist');
                    if (ind != -1) {
                        playlist_id = +params[ind + 1];
                    }
                }
            }
            console.log('layout_id', layout_id);
            console.log('device_id', device_id);
            console.log('playlist_id', playlist_id);
            if (!layout_id && !device_id && !playlist_id)
                return;
            console.log(params);
            htplayer.playerURL = '/api/';
            // let id = params.layout_id;
            this.player = new htplayer.HTMyPlayer('#ViewportsContainer');
            if (layout_id)
                this.player.loadLayout(layout_id);
            else if (device_id)
                this.player.loadDevice(device_id);
            this.player.onLayotLoaded = function () {
                _this.player.appendTo($('#MainContainer'));
                _this.fitToWindow();
            };
            $(window).resize(function () { return _this.fitToWindow(); });
        }
        PreviewController.prototype.fitToWindow = function () {
            var _this = this;
            // console.log('resize');
            if (this.delay)
                return;
            this.delay = true;
            setTimeout(function () { _this.delay = false; }, 1.2);
            var w = $(window).width();
            var h = $(window).height();
            var w2 = this.player.width();
            var h2 = this.player.height();
            var k = w / w2;
            $('#ViewportsContainer').css('transform', 'scale(' + k + ')');
        };
        return PreviewController;
    }());
    htplayer.PreviewController = PreviewController;
})(htplayer || (htplayer = {}));
//# sourceMappingURL=preview.js.map