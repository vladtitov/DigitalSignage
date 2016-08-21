///<reference path="../typings/jquery/jquery.d.ts"/>
///<reference path="../typings/underscore/underscore.d.ts"/>
var htplayer;
(function (htplayer) {
    htplayer.server = 'http://192.168.1.10:56777/';
    htplayer.playerURL = '';
    var VOAsset = (function () {
        function VOAsset(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VOAsset;
    }());
    htplayer.VOAsset = VOAsset;
    var VOPlayLists_Assets = (function () {
        function VOPlayLists_Assets(obj) {
            for (var str in obj)
                this[str] = obj[str];
            if (!this.lasting)
                this.lasting = this.duration;
        }
        return VOPlayLists_Assets;
    }());
    htplayer.VOPlayLists_Assets = VOPlayLists_Assets;
    // table layouts
    var VOLayoutProps = (function () {
        function VOLayoutProps(obj) {
            for (var str in obj)
                this[str] = obj[str];
            if (!this.id)
                this.id = -1;
        }
        return VOLayoutProps;
    }());
    htplayer.VOLayoutProps = VOLayoutProps;
    var VOLayout = (function () {
        function VOLayout(obj) {
            for (var str in obj)
                this[str] = obj[str];
            var vps = [];
            if (obj.viewports) {
                obj.viewports.forEach(function (item) {
                    vps.push(new VOViewport(item));
                });
            }
            this.viewports = vps;
            this.props = new VOLayoutProps(this.props);
        }
        return VOLayout;
    }());
    htplayer.VOLayout = VOLayout;
    var VOTemplate = (function () {
        function VOTemplate(obj) {
            for (var str in obj)
                this[str] = obj[str];
            var out = [];
            if (obj.viewports) {
                obj.viewports.forEach(function (item) {
                    out.push(new VOViewport(item));
                });
            }
            this.viewports = out;
        }
        return VOTemplate;
    }());
    htplayer.VOTemplate = VOTemplate;
    var VOPlayListProps = (function () {
        function VOPlayListProps(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VOPlayListProps;
    }());
    htplayer.VOPlayListProps = VOPlayListProps;
    var VOPlaylist = (function () {
        function VOPlaylist(obj) {
            for (var str in obj)
                this[str] = obj[str];
            var ar = [];
            if (this.list)
                this.list.forEach(function (item) { ar.push(new VOPlayLists_Assets(item)); });
            this.list = ar;
            this.props = new VOPlayListProps(this.props || {});
        }
        return VOPlaylist;
    }());
    htplayer.VOPlaylist = VOPlaylist;
    var VOViewport = (function () {
        function VOViewport(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VOViewport;
    }());
    htplayer.VOViewport = VOViewport;
    var UpdateResult = (function () {
        function UpdateResult(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return UpdateResult;
    }());
    htplayer.UpdateResult = UpdateResult;
    var VOStats = (function () {
        function VOStats(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VOStats;
    }());
    htplayer.VOStats = VOStats;
    var VOUserData = (function () {
        function VOUserData(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VOUserData;
    }());
    htplayer.VOUserData = VOUserData;
    var VODevice = (function () {
        function VODevice(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VODevice;
    }());
    htplayer.VODevice = VODevice;
    var VODeviceStats = (function () {
        function VODeviceStats(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VODeviceStats;
    }());
    htplayer.VODeviceStats = VODeviceStats;
})(htplayer || (htplayer = {}));
//# sourceMappingURL=models.js.map