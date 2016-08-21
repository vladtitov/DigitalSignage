/**
 * Created by Vlad on 7/16/2016.
 */
(function (module) {
    'use strict';

    var async    = require('async');
    var feed     = require("feed-read");
    var dateTime = require('./dateTime');


    function getContents(siteUrl, callback) {
        feed(siteUrl, function (error, contents) {
            if (error) {
                throw error;
            }

            var jsonResult = [];

            async.forEach(contents, function (item) {

                var pubDate = new Date(item.published);
                var pubTime = pubDate.getHours() + ":" + pubDate.getMinutes();

                pubDate = pubDate.getFullYear() + "-" + (pubDate.getMonth() + 1) + "-" + pubDate.getDate();
                pubDate = dateTime.convertFormatGeorgian(pubDate);

                jsonResult.push({
                    "title": item.title,
                    "content" : item.content,
                    "link": item.link,
                    "date": pubDate,
                    "time": pubTime,
                });

            });

            callback(jsonResult);
        });
    }

    module.exports = {
        read: getContents
    };
})(module);