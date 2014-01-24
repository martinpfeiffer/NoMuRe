/*jslint node:true, vars:true*/
'use strict';

// Load required modules
var MustacheEngine = require('mu2'); // mu2 is a fast mustache engine
var fs = require('fs');

var productcontroller = require('./controller/product');

var express = require('express');
var app = express();

var routes = {
    'test1': {
        'type': 'product',
        'id': '1'
    },
    'test2': {
        'type': 'product',
        'id': '2'
    }
};

routes['/'] = routes.test1;

app.get('/:resource?/:view?', function (req, res) {
    var resource = req.params.resource || '/';
    var view = req.params.view || 'view';
    var route = routes[resource];

    if (!route) {
        res.send(404, "no route found for '" + resource + "'.");
        res.end();
        return;
    }

    var controller, template;
    if (route.type === 'product') {
        controller = productcontroller;
    } else {
        res.send(500, "'" + resource + "' has an unknown type '" + route.type + "'.");
        res.end();
        return;
    }

    var data;
    try {
        data = controller.getData(route.id);
    } catch (e) {
        res.send(500, e);
        res.end();
        return;
    }

    template = './templates/' + route.type + '/' + view + '.html';

    fs.stat(template, function (err, stat) {
        if (err || !stat.isFile()) {
            res.send(500, err || template + ' is no file.');
            res.end();
            return;
        }

        var stream = MustacheEngine.compileAndRender(template, data);
        stream.pipe(res);
    });
});

var port = 8000;
console.log("listening on port " + port);
app.listen(port);