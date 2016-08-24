'use strict';
const RP = require('request-promise');

module.exports = (req, res) => {
    var folder = req.session['user_folder'];
    const body = req.body;
    if(req.file) {
        const file = req.file;

        RP('http://192.168.1.10:56555/api/assets/myupload/'+folder, {
            method: 'POST',
            formData: {file: file.buffer},
            body: body
        })
            .then((response) => {
            return res.status(200).send(response);
    })
    .catch((e) => {
            return res.status(500).send(e.message);
    })
    }
    else {
        return res.status(500).send('unable to upload file');
    }
};