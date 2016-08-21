"use strict";
var Playlists_Assets = (function () {
    function Playlists_Assets(obj) {
        if (obj) {
            for (var str in obj) {
                if (Playlists_Assets[str])
                    this[str] = obj[str];
            }
            this.listId = Number(this.listId);
            this.assetId = Number(this.assetId);
            this.afterId = Number(this.afterId);
        }
    }
    Playlists_Assets.id = 1;
    Playlists_Assets.listId = 1;
    Playlists_Assets.assetId = 1;
    Playlists_Assets.duration = 1;
    Playlists_Assets.afterId = 1;
    Playlists_Assets.dimension = 'dv';
    Playlists_Assets.position = 1;
    return Playlists_Assets;
}());
exports.Playlists_Assets = Playlists_Assets;
//# sourceMappingURL=Playlists_Assets.js.map