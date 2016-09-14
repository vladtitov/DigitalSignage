var myplayer;
(function (myplayer) {
    var VOAssetItem = (function () {
        function VOAssetItem(obj) {
            for (var str in obj)
                this[str] = obj[str];
            if (!this.lasting)
                this.lasting = this.duration;
        }
        return VOAssetItem;
    }());
    myplayer.VOAssetItem = VOAssetItem;
})(myplayer || (myplayer = {}));
var myplayer;
(function (myplayer) {
    var PlayerController = (function () {
        function PlayerController() {
            this.timestamp = 0;
            this.serverURL = '/api/';
            this.timer = 0;
            this.currentIndex = -1;
            var obj = {
                x: 0,
                y: 0,
                width: 1080,
                height: 1080
            };
            this.model = new myplayer.PlayerModel(obj);
            this.view = new myplayer.PlayerView(this.model);
            var hrefArr = window.location.href.split('/');
            var ind = hrefArr.indexOf('assets');
            if (ind != -1) {
                this.assetsID = hrefArr[ind + 1];
                console.log('assets', this.assetsID);
                this.loadAssets();
            }
        }
        PlayerController.prototype.loadAssets = function () {
            var _this = this;
            var url = this.serverURL + 'assets/select-assets/';
            console.log('loadAssets  ' + url);
            $.post(url, { assetsID: this.assetsID }).done(function (res) {
                console.log('res', res);
                if (res.data && res.data.length) {
                    _this.timestamp = 0;
                    var ar = res.data.map(function (item) { return new myplayer.VOAssetItem(item); });
                    _this.model.setItems(ar);
                    if (_this.onReady)
                        _this.onReady();
                }
            });
        };
        PlayerController.prototype.loadPlaylist = function () {
            var _this = this;
            var url = this.serverURL + '/playlist/' + this.playlist_id;
            console.log('loadPlaylist  ' + url);
            $.get(url).done(function (res) {
                if (res.data && res.data.list) {
                    _this.timestamp = 0;
                    var ar = res.data.list.map(function (item) { return new myplayer.VOAssetItem(item); });
                    _this.model.setItems(ar);
                    if (_this.onReady)
                        _this.onReady();
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
    myplayer.PlayerController = PlayerController;
})(myplayer || (myplayer = {}));
var myplayer;
(function (myplayer) {
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
    myplayer.PlayerModel = PlayerModel;
})(myplayer || (myplayer = {}));
var myplayer;
(function (myplayer) {
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
    myplayer.PlayerView = PlayerView;
})(myplayer || (myplayer = {}));
//# sourceMappingURL=myplayer.js.map