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
//# sourceMappingURL=ht-payer.js.map