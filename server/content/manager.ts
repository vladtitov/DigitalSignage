/// <reference path="../../server.ts" />

import * as express from 'express';
import db = require("./dbContent");
import {DBContent} from "./dbContent";
import {Content} from "./dbContent";
import {UpdateResult} from "../db/dbDriver";

const router = express.Router();

// var mycontent = new db.Content('cappuccino', 'coffee');
// var mycontent = new db.Content();

// mytablePI.deleteTable();
// mytablePI.createNewTable();

// var p = mytablePI.addNewColumn();
// console.log(p);

router.get('/select/all', function (req:express.Request, res:express.Response) {

   var  mydb = new db.DBContent(req.session['user_folder']);
    var promise = mydb.selectAllContent();
    promise.then(function (result) {
        console.log(result);
        res.json(result);
        // sellect
    }, function (err) {
        console.log(err);
    });
});

router.get('/select/:id', function (req:express.Request, res:express.Response) {
    var  mydb = new db.DBContent(req.session['user_folder']);
    var promise = mydb.selectContentById(req.params.id);
    // res.json(req.params);
    promise.then(function (result) {
        console.log("res", result);
        res.json(result);
    }, function (err) {
        console.log(err);
    });
});

router.post('/insert', function (req:express.Request, res:express.Response) {
    var body:any = req.body;
    var mycontent = new Content(body.name, body.type, body.path, body.user, body.stamp);
    var  mydb = new db.DBContent(req.session['user_folder']);
    var promise = mydb.insertContent(mycontent);
    promise.then(function (result:UpdateResult) {
        console.log(result);
        mycontent.id = result.insertId;
        res.json(mycontent);
        // sellect
    }, function (err) {
        console.log(err);
    });
});

router.post('/update', function (req:express.Request, res:express.Response) {
    var body:any = req.body;
    var mycontent = new Content(body.name, body.type, body.path, body.user, body.stamp, body.id);
    console.log(mycontent);

    res.json(req.params);
    var  mydb = new db.DBContent(req.session['user_folder']);
    var promise = mydb.updateContent(mycontent);
    promise.then(function (result) {
        console.log(result);
        res.json(result);
        // sellect
    }, function (err) {
        console.log(err);
    });
});

router.post('/delete', function (req:express.Request, res:express.Response) {
    var body:any = req.body;
    var mycontent = new Content(body.name, body.type, body.path, body.user, body.stamp, body.id);
    var  mydb = new db.DBContent(req.session['user_folder']);
    var promise = mydb.deleteContent(mycontent);
    promise.then(function (result) {
        console.log(result);
        res.json(result);
        // sellect
    }, function (err) {
        console.log(err);
    });
});

export = router



// var insertContent = function (mycontent) {
//     var promise = mytablePI.insertContent(mycontent);
//     promise.then(function (res) {
//         console.log(res);
//         // sellect
//     });
// };
//
// var selectContent = function () {
//     var promise = mytablePI.selectAllContent();
//     promise.then(function (res) {
//         console.log(res);
//         // sellect
//     });
// };
//
// var updateContent = function (mycontent) {
//     var promise = mytablePI.insertContent(mycontent);
//     promise.then(function (res) {
//         console.log(res);
//         // sellect
//     });
// };
//
// var deleteContent = function (mycontent) {
//     var promise = mytablePI.deleteContent(mycontent);
//     promise.then(function (res) {
//         console.log(res);
//         // sellect
//     });
// };
//
// var selectContentById = function (id) {
//     var promise = mytablePI.selectContentById(id);
//     promise.then(function (res) {
//         console.log("res", res);
//         // sellect
//     }, function (err) {
//         console.log(err);
//     });
// };



// isertContent(mycontent);
// selectContent();
// updateContent(mycontent);
// deleteContent(mycontent);

// selectContentById("coffee");

// console.log(mycontent);


// var hrTime = process.hrtime();
// var timestamp = hrTime[0];
// console.log(hrTime);
// console.log(timestamp);
// console.log(hrTime[0] * 1000000 + hrTime[1] / 1000);