/**
 * Created by Vlad on 8/14/2016.
 */
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
//# sourceMappingURL=AssetsModel.js.map