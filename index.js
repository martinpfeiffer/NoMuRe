/*jslint node:true, vars:true*/
'use strict';

// Load required modules
var MustacheEngine = require('mu2'); // mu2 is a fast mustache engine

MustacheEngine.root = 'templates';

var producttemplate = 'product.html';
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

app.get('/:ressource?', function (req, res) {
    var ressource = req.params.ressource || '/';
    var route = routes[ressource];

    if (!route) {
        //404
        res.end();
        return;
    }

    var controller, template;
    if (route.type === 'product') {
        controller = productcontroller;
        template = producttemplate;
    } else {
        //404
        res.end();
        return;
    }

    var stream = MustacheEngine.compileAndRender(template, controller.getData(route.id));
    stream.pipe(res);
});

app.listen(8000);