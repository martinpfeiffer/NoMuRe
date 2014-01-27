/*jslint node:true, vars:true, nomen:true*/
'use strict';

var express = require('express');
var app = express();

var renderengine = require('./render');

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

routes['/'] = routes.cat1;

app.use(express.logger());

app.use('/static', express.static(__dirname + '/static'));

app.use('/public', express.static(__dirname + '/public'));

app.get('/:resource?/:view?', function (req, res) {
    var resource = req.params.resource || '/';
    var view = req.params.view || 'view';
    var route = routes[resource];

    if (!route) {
        res.send(404, "no route found for '" + resource + "'.");
        res.end();
        return;
    }

    renderengine.render(route.type, view, [route.id], function (err, stream) {
        if (err) {
            res.send(500, err);
            res.end();
            return;
        }
        stream.pipe(res);
    });
});

var port = 8000;
console.log("listening on port " + port);
app.listen(port);