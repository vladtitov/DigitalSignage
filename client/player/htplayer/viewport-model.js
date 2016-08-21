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
//# sourceMappingURL=viewport-model.js.map