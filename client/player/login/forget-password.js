/**
 * Created by Vlad on 8/14/2016.
 */
var htplayer;
(function (htplayer) {
    var ForgetPassword = (function () {
        function ForgetPassword() {
            this.$view = $('#ForgetPassword');
            this.$username = this.$view.find('.username').first();
            this.$message = this.$view.find('.message');
        }
        ForgetPassword.prototype.setUserName = function (username) {
            this.$username.text(username);
        };
        ForgetPassword.prototype.addListeners = function () {
            var _this = this;
            this.$view.find('.close').click(function () {
                if (_this.onClose)
                    _this.onClose();
            });
            this.$btnSubmit = this.$view.find('.submit').first().click(function () { return _this.onSubmitClick(); });
            this.$btnClose = this.$view.find('.close').click(function () {
                if (_this.onClose)
                    _this.onClose();
            });
        };
        ForgetPassword.prototype.appendTo = function ($cont) {
            $cont.append(this.$view);
            this.addListeners();
        };
        ForgetPassword.prototype.setUsername = function (text) {
            this.$username.text(text);
        };
        ForgetPassword.prototype.onSubmitClick = function () {
            var _this = this;
            this.$btnSubmit.prop('disabled', true);
            setTimeout(function () {
                _this.$btnSubmit.prop('disabled', false);
            }, 2000);
            $.post(htplayer.server + 'account/forgetpassword', this.$username.text()).done(function (res) {
                if (res.data) {
                    _this.$message.text('Email sent to you with confirmation to reset password');
                }
                else {
                    htplayer.showTip('Error processing request', _this.$btnSubmit);
                }
            });
        };
        return ForgetPassword;
    }());
    htplayer.ForgetPassword = ForgetPassword;
})(htplayer || (htplayer = {}));
//# sourceMappingURL=forget-password.js.map