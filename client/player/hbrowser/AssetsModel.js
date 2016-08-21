/**
 * Created by Vlad on 8/14/2016.
 */
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
//# sourceMappingURL=AssetsModel.js.map