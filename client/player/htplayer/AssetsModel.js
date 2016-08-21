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
//# sourceMappingURL=AssetsModel.js.map