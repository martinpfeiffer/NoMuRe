/*jslint node:true*/
'use strict';

var routes = {
    'test1': {
        'type': 'product',
        'id': '1'
    },
    'test2': {
        'type': 'product',
        'id': '2'
    },
    'test3': {
        'type': 'product',
        'id': '3'
    },
    'cat1': {
        'type': 'category',
        'id': '1'
    }
};

exports.route = function (url, callback) {
    url = url || 'cat1';
    var route = routes[url];

    if (!route) {
        return callback('no route found for "' + url + '".');
    }

    return callback(null, route);
};