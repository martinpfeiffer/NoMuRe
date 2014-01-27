/*jslint node:true,nomen:true, vars:true*/
'use strict';

var REST = require('../../rest');

exports.getData = function (id) {
    var shop = REST.get('/shop');
    shop.PageTitle = shop.ShopName;
    return shop;
};