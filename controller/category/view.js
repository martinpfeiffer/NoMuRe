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
    REST.get('/category/' + id, function (err, category) {
        if (err) {
            return callback(err);
        }
        callback(null, category);
    });
};