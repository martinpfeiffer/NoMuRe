// Load required modules
var MustacheEngine = require('mu2'); // mu2 is a fast mustache engine

MustacheEngine.root = 'templates';

var template = 'product.html';
var productcontroller = require('./controller/product');

var express = require('express');
var app = express();

app.get('/', function (req, res) {
    var stream = MustacheEngine.compileAndRender(template, productcontroller.getData());
    stream.pipe(res);
});

app.listen(8000);