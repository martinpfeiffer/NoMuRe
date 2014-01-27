/*jslint node:true, vars:true, nomen:true*/
'use strict';

// Load required modules
var MustacheEngine = require('mu2'); // mu2 is a fast mustache engine
var fs = require('fs');
var Stream = require('stream');

var productcontroller = require('./controller/product');
var categorycontroller = require('./controller/category');

var controllers = {
    'product': productcontroller,
    'category': categorycontroller
};

exports.render = function (controllername, view, params, callback) {
    var controller = controllers[controllername];

    var data;
    try {
        data = controller.getData.apply(controller, params);
    } catch (e) {
        return callback(e);
    }

    if (view === 'json') {
        var stream = new Stream();
        stream.pipe = function (dest) {
            dest.write(JSON.stringify(data));
        };
        return callback(null, stream);
    }

    var template = './templates/' + controllername + '/' + view + '.html';

    fs.stat(template, function (err, stat) {
        if (err || !stat.isFile()) {
            return callback(err || template + ' is no file.');
        }

        var stream = MustacheEngine.compileAndRender(template, data);
        return callback(null, stream);
    });
};