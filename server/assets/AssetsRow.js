"use strict";
var AssetRow = (function () {
    function AssetRow(obj) {
        for (var str in obj)
            this[str] = obj[str];
    }
    AssetRow.getInit = function () {
        return new AssetRow({
            id: 0,
            originalName: 'string',
            path: 'string',
            thumb: 'string',
            size: 0,
            width: 0,
            height: 0,
            mime: 'string',
            orig_dimension: 'string',
            active: 0,
            duration: 0,
            type: 'string',
            time_from: 0,
            time_to: 0,
            created_user: 0,
            created_time: 0,
            metadata: 'string'
        });
    };
    return AssetRow;
}());
exports.AssetRow = AssetRow;
//# sourceMappingURL=AssetsRow.js.map