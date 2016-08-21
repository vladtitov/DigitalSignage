/**
 * Created by Vlad on 8/11/2016.
 */
var hbrowser;
(function (hbrowser) {
    var PlayerView = (function () {
        function PlayerView(model) {
            this.model = model;
            this.width = model.width;
            this.height = model.height;
            this.x = model.x;
            this.y = model.y;
        }
        PlayerView.prototype.destroy = function () {
            if (this.$view)
                this.$view.remove();
            if (this.$prev)
                this.$view.remove();
            if (this.$next)
                this.$next.remove();
            this.$view = null;
            this.$prev = null;
            this.$next = null;
        };
        PlayerView.prototype.remove = function () {
            this.$view.remove();
        };
        PlayerView.prototype.showImage = function (item) {
            var view = $('<img>').attr('src', item.path).css('max-width', this.width + 'px').css('max-height', this.height + 'px');
            this.switchView(view);
        };
        PlayerView.prototype.switchView = function (newview) {
            var prev = this.$view.children();
            prev.fadeOut(function () {
                prev.remove();
            });
            newview.hide();
            this.$view.append(newview);
            newview.fadeIn();
        };
        PlayerView.prototype.showVideo = function (item) {
            var view = $('<video>').attr('autoplay', 'true').append($('<source>').attr('src', item.path)).css('max-width', this.width + 'px').css('max-height', this.height + 'px');
            this.switchView(view);
        };
        PlayerView.prototype.appendTo = function ($container) {
            this.$view = $('<div>').addClass('ht-player').width(this.width).height(this.height).offset({ left: this.x, top: this.y }).appendTo($container);
            return this.$view;
        };
        return PlayerView;
    }());
    hbrowser.PlayerView = PlayerView;
})(hbrowser || (hbrowser = {}));
//# sourceMappingURL=player-view.js.map