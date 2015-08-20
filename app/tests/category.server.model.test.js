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
var user, category;

/**
 * Unit tests
 */
describe('Category Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			category = new Category({
				// Add model fields
				// ...
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('saves new record');

		it('throws validation error when name is empty');

		it('throws validation error when name longer than 15 chars');

		it('throws validation error for duplicate category name');
		//it('should be able to save without problems', function(done) {
		//	return category.save(function(err) {
		//		should.not.exist(err);
		//		done();
		//	});
		//});
	});

	afterEach(function(done) { 
		Category.remove().exec();
		User.remove().exec();

		done();
	});
});
