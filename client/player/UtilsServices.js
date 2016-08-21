/**
 * Created by Vlad on 7/17/2016.
 */
var UtilsServices = (function () {
    function UtilsServices() {
    }
    UtilsServices.prototype.getUrlParams = function () {
        var _this = this;
        var str = window.location.href;
        var ar = str.split('?');
        if (ar.length == 1)
            return null;
        ar.shift();
        var out = [];
        ar.forEach(function (item) { return _this.parserParams(out, item); });
        return out;
    };
    UtilsServices.prototype.setParams = function (obj) {
        var paramsString = "?";
        for (var key in obj) {
            paramsString += key + "=" + obj[key] + "&";
        }
        paramsString = paramsString.substring(0, paramsString.length - 1);
        window.location.href = window.location.origin + window.location.pathname + paramsString;
    };
    UtilsServices.prototype.parserParams = function (out, str) {
        var ar = str.split('&');
        ar.forEach(function (item) {
            var vars = item.split('=');
            if (vars.length === 2)
                out[vars[0]] = isNaN(Number(vars[1])) ? vars[1] : Number(vars[1]);
        });
        return out;
    };
    UtilsServices.utils = new UtilsServices();
    return UtilsServices;
}());
//# sourceMappingURL=UtilsServices.js.map