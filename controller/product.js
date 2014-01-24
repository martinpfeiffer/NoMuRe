var REST = require('../rest');

exports.getData = function (id) {
	var product = REST.get('/products/' + id);

	product.price = product.price + ' €';
	return product;
};