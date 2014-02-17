/*jslint node:true, vars:true, nomen:true*/
'use strict';

var MustacheEngine = require('mu2');
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

var clearCache = function () {
    MustacheEngine.clearCache();
};

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

var render = function (type, view, mode, data, callback) {
    var controllername = type + '/' + view;
    var controller = controllers[controllername];

    var base = controller.base;

    if (base) {
        var basecontrollername = base.controller;
        var baseview = base.view || 'view';

        render(basecontrollername, baseview, mode, data, function (err, basecontent) {
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
            }, callback);
        });
    } else {
        var template = './templates/' + type + '/' + view + '.' + mode;
        return renderTemplate(template, data, callback);
    }
};

var getData = function (type, view, mode, params, callback) {
    var controllername = type + '/' + view;
    var controller = controllers[controllername];

    if (!controller) {
        return callback('Unknown controller type "' + controllername + '".');
    }

    var currentcontroller = controller;
    var basecontrollername, basecontroller, base, datatask;
    var tasks = [];

    var createCallback = function (datatask) {
        return function (err, data) {
            if (err) {
                return datatask.reject(err);
            }
            datatask.resolve(data);
        };
    };

    while (currentcontroller) {
        datatask = new Promise();
        tasks.push(datatask);
        currentcontroller.getData.apply(currentcontroller, params.concat(createCallback(datatask)));

        base = currentcontroller.base;
        if (base) {
            basecontrollername = base.controller + '/' + (base.view || 'view');
            basecontroller = controllers[basecontrollername];
        } else {
            basecontroller = undefined;
        }

        currentcontroller = basecontroller;
    }
    promise.all(tasks).then(function (results) {
        var data = _.extend.apply(_, results.reverse());
        callback(null, data);
    }, callback);
};

var display = function (type, view, mode, params, callback) {
    getData(type, view, mode, params, function (err, data) {
        if (err) {
            return callback(err);
        }

        if (mode === 'json') {
            var result = JSON.stringify(data);
            return callback(null, result);
        }

        render(type, view, mode, data, callback);
    });
};

exports.render = display;

exports.clearCache = clearCache;
