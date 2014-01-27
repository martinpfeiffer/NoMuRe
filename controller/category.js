/*jslint node:true,nomen:true, vars:true*/
'use strict';

var REST = require('../rest');
var _ = require('underscore');

exports.getData = function (id) {
    var category = REST.get('/category/' + id);

    var shop = REST.get('/shop');

    return _.extend(category, shop);
};