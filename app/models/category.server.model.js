'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

function validateLength(v){
	return v.length <= 15;
}
/**
 * Category Schema
 */
var CategorySchema = new Schema({
	// Category model fields
	// ...
	created : {
		type : Date,
		default : Date.now
	},
	name : {
		type: String,
		default : '',
		trim : true,
		unique : true,
		required : 'name is mandatory',
		validate : [validateLength, 'name must be less than 15 chars']
	},
	description : {
		type : String,
		default  : '',
		trim : true
	}
});

mongoose.model('Category', CategorySchema);
