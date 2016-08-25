'use strict';
var RP = require('request-promise');
module.exports = function (req, res) {
    var folder = req.session['user_folder'];
    var body = req.body;
    if (req.file) {
        var file = req.file;
        RP('http://192.168.1.10:56555/api/assets/myupload/' + folder, {
            method: 'POST',
            formData: { file: file.buffer },
            body: body
        })
            .then(function (response) {
            return res.status(200).send(response);
        })
            .catch(function (e) {
            return res.status(500).send(e.message);
        });
    }
    else {
        return res.status(500).send('unable to upload file');
    }
};
//# sourceMappingURL=uploadController.js.map