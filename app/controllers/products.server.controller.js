'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Product = mongoose.model('Product'),
	_ = require('lodash');

/**
 * Create a Product
 */
exports.create = function(req, res) {
	var product = new Product(req.body);
	product.user = req.user;

	product.save(function(err) {
		//console.log(err);
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			//console.log(product);
			res.jsonp(product);
		}
	});
};

/**
 * Show the current Product
 */
exports.read = function(req, res) {
	res.jsonp(req.product);
};

/**
 * Update a Product
 */
exports.update = function(req, res) {
	var product = req.product ;

	product = _.extend(product , req.body);

	product.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(product);
		}
	});
};

/**
 * Delete an Product
 */
exports.delete = function(req, res) {
	var product = req.product ;

	product.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(product);
		}
	});
};

/**
 * List of Products
 */
exports.list = function(req, res) {
	// population with full oject and specific fields
	Product.find().sort('-created').populate('user', 'displayName').exec(function(err, products) {
	//Product.find().sort('-created').populate('user').exec(function(err, products) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(products);
		}
	});
};

/**
 * Product middleware
 */
exports.productByID = function(req, res, next, id) { 
	Product.findById(id).populate('user', 'displayName').exec(function(err, product) {
		if (err) return next(err);
		if (! product) return next(new Error('Failed to load Product ' + id));
		req.product = product ;
		next();
	});
};

/**
 * Product authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.product.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
