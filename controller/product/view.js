/*jslint node:true,nomen:true, vars:true*/
'use strict';

var REST = require('../../rest');

exports.base = {
	'controller': 'base',
	'view': 'view',
	'extensions': {
		'content': 'view'
	}
};

exports.getData = function (id) {
	var product = REST.get('/products/' + id);

	product.ListPrice = product.ListPrice + ' €';

	return product;
};