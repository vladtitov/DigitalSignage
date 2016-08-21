/**
 * Created by Vlad on 8/20/2016.
 */
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
//# sourceMappingURL=player-model.js.map