/**
 * Created by Vlad on 8/11/2016.
 */
///<reference path="../../typings/jquery/jquery.d.ts"/>
///<reference path="AssetsModel.ts"/>
var myplayer;
(function (myplayer) {
    ////SUM of playlist + Viewport
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
            // this.playlist_id = this.model.playlist_id;
            var hrefArr = window.location.href.split('/');
            var ind = hrefArr.indexOf('assets');
            if (ind != -1) {
                this.assetsID = hrefArr[ind + 1]; // /assets/35,48,54,135   SELECT * FROM assets WHERE id = 35 OR id = 48 ..
                console.log('assets', this.assetsID);
                this.loadAssets();
            }
            // var ind:number = hrefArr.indexOf('playlist_id');
            // if(ind != -1){
            //     this.playlist_id = hrefArr[ind+1];
            //     this.loadPlaylist()
            // } else {
            //     ind = hrefArr.indexOf('assets');
            //     if(ind != -1) {
            //         var assets = hrefArr[ind+1]; // /assets/35,48,54,135   SELECT * FROM assets WHERE id = 35 OR id = 48 ..
            //
            //     }
            // }
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
            /// console.log('hext item    ',asset);
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
//# sourceMappingURL=myplayer-controllerl.js.map