/*jslint node:true*/
'use strict';

var resources = {
    '/products/1': '{"ListPrice": 123.45,"Name": "Fancy Product", "ImageLarge": "/public/eg.jpg", "Text": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet","instock": true}',
    '/products/2': '{"ListPrice": 12.45,"Name": "Fancy Product II", "ImageLarge": "/public/ho.jpg", "Text": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet","instock": false}',
    '/products/3': '{"ListPrice": 13.37,"Name": "Fancy Product III", "ImageLarge": "/public/lt.jpg", "Text": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet","instock": true}',

    '/shop': '{"ShopName": "Milestones", "Slogan": "d.i.y. or die", "ShopLogo": "/public/logo.gif", "Categories": [{\"Name\": \"Category I\", \"Link\": \"/cat1\"}]}',

    '/category/1': '{"Name": "Category I", "Products": [{\"Name\": \"Fancy Product\", \"Image\": \"/public/eg.jpg\", \"Link\": \"/test1\"}, {\"Name\": \"Fancy Product II\", \"Image\": \"/public/ho.jpg\", \"Link\": \"/test2\"}, {\"Name\": \"Fancy Product III\", \"Image\": \"/public/lt.jpg\", \"Link\": \"/test3\"}]}'
};

exports.get = function (url) {
    var data = resources[url];
    if (!data) {
        throw "resource " + url + " not found";
    }

    return JSON.parse(data);
};