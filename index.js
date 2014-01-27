/*jslint node:true, vars:true*/
'use strict';

// Load required modules
var MustacheEngine = require('mu2'); // mu2 is a fast mustache engine

MustacheEngine.root = 'templates';

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

app.get('/:ressource?/:view?', function (req, res) {
    var ressource = req.params.ressource || '/';
    var view = req.params.view || 'view';
    var route = routes[ressource];

    if (!route) {
        //404
        res.end();
        return;
    }

    var controller, template;
    if (route.type === 'product') {
        controller = productcontroller;
    } else {
        //404
        res.end();
        return;
    }

    template = route.type + '/' + view + '.html';

    try {
        var stream = MustacheEngine.compileAndRender(template, controller.getData(route.id));
        stream.pipe(res);
    } catch (ex) {
        res.send(500, ex.toString());
        res.end();
    }
});

app.listen(8000);