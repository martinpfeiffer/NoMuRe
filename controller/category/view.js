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

exports.getData = function (id) {
    var category = REST.get('/category/' + id);

    return category;
};