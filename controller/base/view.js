/*jslint node:true,nomen:true, vars:true*/
'use strict';

var REST = require('../../rest');

exports.getData = function (id, callback) {
    REST.get('/shop', function (err, shop) {
        if (err) {
            return callback(err);
        }
        shop.PageTitle = shop.ShopName;
        callback(null, shop);
    });
};