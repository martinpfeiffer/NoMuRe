/*jslint node:true, vars:true, nomen:true*/
'use strict';

// Load required modules
var MustacheEngine = require('mu2'); // mu2 is a fast mustache engine
var fs = require('fs');
var _ = require('underscore');
var promise = require('node-promise');

var basecontroller = require('./controller/base/view');
var productcontroller = require('./controller/product/view');
var categorycontroller = require('./controller/category/view');

var controllers = {
    'product/view': productcontroller,
    'category/view': categorycontroller,
    'base/view': basecontroller
};

var Promise = promise.Promise;

var renderTemplate = function (template, data, callback) {
    fs.stat(template, function (err, stat) {
        if (err || !stat.isFile()) {
            return callback(err || template + ' is no file.');
        }

        var stream = MustacheEngine.compileAndRender(template, data);
        var result = '';
        stream.on('data', function (data) {
            result += data;
        });
        stream.on('end', function () {
            callback(null, result);
        });
    });
};

var render = function (type, view, mode, params, childdata, callback) {
    var controllername = type + '/' + view;
    var controller = controllers[controllername];

    if (!controller) {
        return callback("Unknown controller type '" + controllername + "'.");
    }

    var data;
    try {
        data = controller.getData.apply(controller, params);
    } catch (e) {
        return callback(e);
    }

    if (mode === 'json') {
        var result = JSON.stringify(data);
        return callback(null, result);
    }

    if (childdata) {
        data = _.extend(data, childdata);
    }

    var base = controller.base;

    if (base) {
        var basecontrollername = base.controller;
        var baseview = base.view || 'view';
        render(basecontrollername, baseview, mode, params, data, function (err, basecontent) {
            if (err) {
                return callback(err);
            }

            var tasks = _.map(base.extensions, function (extensiontemplate, extensionname) {
                var task = new Promise();

                var template = './templates/' + type + '/' + extensiontemplate + '.' + mode;
                renderTemplate(template, data, function (err, extensioncontent) {
                    if (err) {
                        return task.reject(err);
                    }

                    // replace extensions in basecontent
                    basecontent = basecontent.replace('{*' + extensionname + '*}', extensioncontent);
                    task.resolve();
                });

                return task;
            });
            promise.all(tasks).then(function () {
                callback(null, basecontent);
            }, function (err) {
                callback(err);
            });
        });
    } else {
        var template = './templates/' + type + '/' + view + '.' + mode;
        return renderTemplate(template, data, callback);
    }
};

exports.render = render;