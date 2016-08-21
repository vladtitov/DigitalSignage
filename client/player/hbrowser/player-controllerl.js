/**
 * Created by Vlad on 8/11/2016.
 */
///<reference path="AssetsModel.ts"/>
var hbrowser;
(function (hbrowser) {
    ////SUM of playlist + Viewport
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
                    _this.startPlay();
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
            // console.log(url);
            $.get(url).done(function (res) {
                //  console.log(res);
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
            // this.view.remove();
        };
        PlayerController.prototype.appendTo = function ($container) {
            if (!this.$view)
                this.$view = $('<div>').addClass('view-port');
            this.view.appendTo(this.$view);
            $container.append(this.$view);
        };
        PlayerController.prototype.startPlay = function () {
            this.isPlaying = true;
            this.playNext();
        };
        PlayerController.prototype.stopPlay = function () {
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
            setTimeout(function () { return _this.playNext(); }, (delay * 1000));
        };
        return PlayerController;
    }());
    hbrowser.PlayerController = PlayerController;
})(hbrowser || (hbrowser = {}));
//# sourceMappingURL=player-controllerl.js.map