"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TableModel_1 = require("../db/TableModel");
var PlaylistsTable = (function (_super) {
    __extends(PlaylistsTable, _super);
    function PlaylistsTable(folder) {
        _super.call(this, folder, "playlists");
    }
    PlaylistsTable.prototype.updateContentById = function (row, id) {
        row.timestamp = Math.floor(Date.now() / 1000);
        if (id == -1)
            return this.insertContent(row);
        else
            return this.updateContent(row);
    };
    PlaylistsTable.prototype.insertContent = function (row) {
        if (!row.label)
            row.label = 'new playlist ';
        delete row.id;
        return _super.prototype.insertContent.call(this, row);
    };
    return PlaylistsTable;
}(TableModel_1.TableModel));
exports.PlaylistsTable = PlaylistsTable;
//# sourceMappingURL=PlaylistsTable.js.map