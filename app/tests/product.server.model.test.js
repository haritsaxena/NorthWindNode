'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Product = mongoose.model('Product'),
	Category = mongoose.model('Category');
	User = mongoose.model('User');

/**
 * Globals
 */
var user, product, category;

/**
 * Unit tests
 */
describe('Product Model Unit Tests:', function() {
	before(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password',
			provider: 'local'
		});

		category = new Category({
			name: 'Beverages',
			description: 'Soft drinks, coffees, teas, beers, and ales'
		});
		done();
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			user.save(function(err){
				should.not.exist(err);

				category.save(function(err){
					should.not.exist(err);

					product = new Product({
						name:'elephant',
						quantityPerUnit: 'one',
						unitsInStock: 24,
						unitsOnOrder: 12,
						category: category.id,
						user:user.id
					});

					return product.save(function(err) {
						should.not.exist(err);
						done();
					});
				});
			});
		});

		it('should be able to show an error when try to save without name', function(done) {
			product = new Product({
				quantityPerUnit: 'one',
				unitsInStock: 24,
				unitsOnOrder: 12,
				category: new Category({
					name: 'Beverages',
					description: 'Soft drinks, coffees, teas, beers, and ales'
				})
			});
			return product.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('throws validation error when name longer than 40 chars', function (done) {
			product = new Product({
				name: 'Soft drinks, coffees, teas, beers, and ales Soft drinks, coffees, teas, beers, and alesSoft drinks, coffees, teas, beers, and alesSoft drinks, coffees, teas, beers, and ales Soft drinks, coffees, teas, beers, and ales'
			});

			product.save(function (err) {
				should.exist(err);
				err.errors.name.message.should.equal('name must be 40 chars in length or less');
				done();
			});
		});
	});

	afterEach(function(done) {
		Product.remove().exec();
		Category.remove().exec();
		User.remove().exec();
		done();
	});
});
