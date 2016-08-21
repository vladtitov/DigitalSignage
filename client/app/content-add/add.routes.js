/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */
"use strict";
var content_add_1 = require("./content-add");
exports.addRoutes = [
    {
        path: 'content-manager/add',
        component: content_add_1.AddContent,
    },
    {
        path: 'content-manager/add/:id',
        component: content_add_1.AddContent
    }
];
//# sourceMappingURL=add.routes.js.map