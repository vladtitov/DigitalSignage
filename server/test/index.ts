/// <reference path="../../typings/express/express.d.ts" />

import * as express from 'express';



declare var WWW:string;
declare var SERVER:string;
declare  var onError: (err:any, res: express.Response) => void;

var fs = require('fs');

const router = express.Router();


router.get('/get', function (req:express.Request, res:express.Response) {
   res.json({hello:'world'});
});



export = router