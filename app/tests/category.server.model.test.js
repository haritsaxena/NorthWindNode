'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Category = mongoose.model('Category');

/**
 * Globals
 */
var category;

/**
 * Unit tests
 */
describe('Category Model Unit Tests:', function() {

	describe('Saving', function(){
		it('saves new record', function(done){
			category = new Category({
				name: 'Beverages',
				description: 'Soft drinks, coffees, teas, beers, and ales'
			});
			category.save(function (err) {
				should.not.exist(err);
				done();
			});
		});

		it('throws validation error when name is empty', function (done) {
			category = new Category();
			category.name = '';
			category.description = 'Soft drinks, coffees, teas, beers, and ales';

			category.save(function (err) {
				should.exist(err);
				done();
			});
		});

		it('throws validation error when name longer than 15 chars', function (done) {
			category = new Category({
				name: 'Soft drinks, coffees, teas, beers, and ales'
			});

			category.save(function (err) {
				should.exist(err);
				err.errors.name.message.should.equal('name must be less than 15 chars');
				done();
			});
		});

		it('throws validation error for duplicate category name', function (done) {
			var category = new Category({
				name: 'Beverages'
			});

			category.save(function(err) {
				should.not.exist(err);

				var duplicate = new Category({
					name: 'Beverages'
				});

				duplicate.save(function(err) {
					err.err.indexOf('$name').should.not.equal(-1);
					err.err.indexOf('duplicate key error').should.not.equal(-1);
					should.exist(err);
					done();
				});
			});
		});
	});

	afterEach(function(done) { 
		Category.remove().exec();
		done();
	});
});
