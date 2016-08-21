/**
 * Created by Vlad on 8/11/2016.
 */
var htplayer;
(function (htplayer) {
    var PlayerLite = (function () {
        function PlayerLite(model) {
            this.model = model;
            this.width = model.width;
            this.height = model.height;
            this.x = model.x;
            this.y = model.y;
        }
        PlayerLite.prototype.startPlay = function () {
            this.isPlaying = true;
            this.playNext();
        };
        PlayerLite.prototype.stopPlay = function () {
            this.isPlaying = false;
        };
        PlayerLite.prototype.destroy = function () {
        };
        PlayerLite.prototype.playNext = function () {
            var _this = this;
            if (!this.isPlaying)
                return;
            var asset = this.model.getNextItem();
            console.log('hext item    ', asset);
            if (!asset || !asset.ready) {
                setTimeout(function () { return _this.playNext(); }, 1000);
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
                switch (currentItem.type) {
                    case 'video':
                        delay += 3;
                        this.showVideo(currentItem);
                        break;
                    case 'image':
                        this.showImage(currentItem);
                        break;
                    default:
                        this.showImage(currentItem);
                        break;
                }
            }
            setTimeout(function () { return _this.playNext(); }, (delay * 1000));
        };
        PlayerLite.prototype.remove = function () {
            this.$view.remove();
        };
        PlayerLite.prototype.showImage = function (item) {
            var view = $('<img>').attr('src', item.path).css('max-width', this.width + 'px').css('max-height', this.height + 'px');
            this.switchView(view);
        };
        PlayerLite.prototype.switchView = function (newview) {
            var prev = this.$view.children();
            prev.fadeOut(function () {
                prev.remove();
            });
            newview.hide();
            this.$view.append(newview);
            newview.fadeIn();
        };
        PlayerLite.prototype.showVideo = function (item) {
            var view = $('<video>').attr('autoplay', 'true').append($('<source>').attr('src', item.path)).css('max-width', this.width + 'px').css('max-height', this.height + 'px');
            this.switchView(view);
        };
        PlayerLite.prototype.appendTo = function ($container) {
            this.$view = $('<div>').addClass('ht-player').width(this.width).height(this.height).offset({ left: this.x, top: this.y }).appendTo($container);
            return this.$view;
        };
        return PlayerLite;
    }());
    htplayer.PlayerLite = PlayerLite;
})(htplayer || (htplayer = {}));
//# sourceMappingURL=player-lite.js.map