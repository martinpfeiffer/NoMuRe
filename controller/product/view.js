/*jslint node:true,nomen:true, vars:true*/
'use strict';

var REST = require('../../rest');

exports.base = {
    'controller': 'base',
    'view': 'view',
    'extensions': {
        'content': 'view'
    }
};

exports.getData = function (id, callback) {
    REST.get('/products/' + id, function (err, product) {
        if (err) {
            return callback(err);
        }
        product.ListPrice = product.ListPrice + ' €';
        product.PageTitle = product.Name;
        callback(null, product);
    });

};