// Load required modules
var MustacheEngine = require('mu2'); // mu2 is a fast mustache engine

MustacheEngine.root = 'templates';

var staticFile = 'product.html';
var productMock = {
    'price': '123,45 €',
    'name': 'Fancy Product',
    'description': 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet',
    'instock': true
};

var express = require('express');
var app = express();

app.get('/', function (req, res) {
    var stream = MustacheEngine.compileAndRender(staticFile, productMock);
    stream.pipe(res);
});

app.listen(8000);