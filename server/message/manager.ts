/// <reference path="../../typings/express/express.d.ts" />

import * as express from 'express';
import db = require("./dbMessages");
import {DBMessages} from "./dbMessages";
import {Message} from "./dbMessages";
import {UpdateResult} from "../db/dbDriver";

declare var WWW:string;
declare var SERVER:string;
declare  var onError: (err:any, res: express.Response) => void;

var fs = require('fs');

const router = express.Router();
var mydb: DBMessages = new db.DBMessages();

// mytablePI.deleteTable();
// mydb.createNewTable();

// var p = mytablePI.addNewColumn();
// console.log(p);

/**
 * @api {get} api/messages/select/all Get All Messages
 * @apiVersion 0.0.1
 * @apiName GetMessages
 * @apiGroup Messages
 *
 * @apiDescription Response all messages from DB.
 *
 * @apiSuccessExample {json} Success-Response:
 *     {
 *         "data": [
 *             {
 *                 "id": 1,
 *                 "activ": 1,
 *                 "message": "some text"
 *             },
 *             {
 *                 "id": 2,
 *                 "activ": 0,
 *                 "message": "some text"
 *             }
 *         ]
 *      }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "errno": 1
 *       "code": "SQLITE_ERROR"
 *     }
 */

router.get('/select/all', function (req:express.Request, res:express.Response) {
    var promise = mydb.selectAllContent();
    promise.then(function (result) {
        console.log(result);
        res.json({data:result});
        // sellect
    }, function (err) {
        console.log(err);
        res.json(err);
    });
});

/**
 * @api {get} api/messages/select/:id Get Message
 * @apiVersion 0.0.1
 * @apiName GetMessage
 * @apiGroup Messages
 *
 * @apiDescription Response message from DB by id.
 *
 * @apiParam {number} id   id in BD
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "id":  1
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *      {
 *          "data": {
 *              "id": 1,
 *              "activ": "true",
 *              "message": "some text"
 *          }
 *      }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "errno": 1
 *       "code": "SQLITE_ERROR"
 *     }
 */

router.get('/select/:id', function (req:express.Request, res:express.Response) {
    var promise = mydb.selectContentById(req.params.id);
    // res.json(req.params);
    promise.then(function (result) {
        if(result !== {}) {
            console.log("res", result);
            res.json({data:result});
        } else {
            onError(result, res);
        }

        // res.json({data:result});
    }, function (err) {
        console.log(err);
        onError(err, res);
        // res.json(err);
    });
});

/**
 * @api {post} api/messages/insert Insert Message
 * @apiVersion 0.0.1
 * @apiName InsertMessages
 * @apiGroup Messages
 *
 * @apiDescription Insert messages in DB.
 *
 * @apiParam {String} active    true or false.
 * @apiParam {String} message   Message text
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "active":  "true",
 *       "message": "some text"
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "activ": "true"
 *       "message": "some text"
 *       "id": 1
 *     }
 *
 * @apiErrorExample Error-Response:
 *     {
 *       "errno": 1
 *       "code": "SQLITE_ERROR"
 *     }
 */

router.post('/insert', function (req:express.Request, res:express.Response) {
    var body:any = req.body;
    // res.send(req.body);
    // return;
    var message = new Message(body.active, body.message);

    var promise = mydb.insertContent(message);
    promise.then(function (result:UpdateResult) {
        // console.log(result);
        message.id = result.insertId;
        console.log(message);
        res.json(message);
    }, function (err) {
        console.log(err);
        onError(err, res);
        // res.json(err);
    });
});

/**
 * @api {post} api/messages/update Update Message
 * @apiVersion 0.0.1
 * @apiName UpdateMessage
 * @apiGroup Messages
 *
 * @apiDescription Update messages in DB.
 *
 * @apiParam {Number} id        id in BD
 * @apiParam {String} active    true or false.
 * @apiParam {String} message   Message text
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "id":      1
 *       "active":  true,
 *       "message": "some text"
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": {
 *         "changes": 1
 *       }
 *     }
 *
 * @apiErrorExample Error-Response:
 *     {
 *       "errno": 1
 *       "code": "SQLITE_ERROR"
 *     }
 */

router.post('/update', function (req:express.Request, res:express.Response) {
    var body:any = req.body;
    var message = new Message(body.active, body.message, body.id);
    console.log(message);

    // res.json(req.params);

    var promise = mydb.updateContent(message);
    promise.then(function (result) {
        if(result.changes) {
            res.json({data:result});
        } else {
            onError(result, res);
        }
        console.log(result);

        // sellect
    }, function (err) {
        console.log(err);
        res.json(err);
    });
});

router.post('/delete', function (req:express.Request, res:express.Response) {
    var body:any = req.body;
    var message = new Message(body.active, body.message, body.id);

    var promise = mydb.deleteContent(message);
    promise.then(function (result) {
        console.log(result);
        res.json({data:result});
        // sellect
    }, function (err) {
        console.log(err);
        res.json(err);
    });
});

export = router