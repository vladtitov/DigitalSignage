"use strict";
var express = require('express');
var fs = require('fs');
var router = express.Router();
router.get('/get', function (req, res) {
    res.json({ hello: 'world' });
});
module.exports = router;
//# sourceMappingURL=index.js.map