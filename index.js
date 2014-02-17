/*jslint node:true, vars:true, nomen:true*/
'use strict';

var express = require('express');
var app = express();

var templatecache = false;

var router = require('./router');
var renderengine = require('./render');

app.use('/static', express.static(__dirname + '/static'));

app.use('/public', express.static(__dirname + '/public'));

app.use(express.logger());

app.configure('production', function () {
    templatecache = true;
});

app.get('/:resource?/:view?.:mode?', function (req, res) {
    var resource = req.params.resource;
    var view = req.params.view || 'view';
    var mode = req.params.mode || 'html';

    router.route(resource, function (err, route) {
        if (err) {
            res.send(500, err);
            return res.end();
        }

        if (!templatecache) {
            renderengine.clearCache();
        }

        renderengine.render(route.type, view, mode, [route.id], function (err, result) {
            if (err) {
                res.send(500, err);
                return res.end();
            }
            res.send(200, result);
            return res.end();
        });
    });
});

var port = 8000;
console.log('listening on port ' + port);
app.listen(port);
