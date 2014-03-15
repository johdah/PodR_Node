'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto');

/**
 * User Schema
 */
var UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: String,
	username: {
		type: String,
		unique: true
	},
	hashed_password: String,
	provider: String,
	salt: String,
	facebook: {},
	github: {},
	google: {},
	linkedin: {},
	twitter: {}
});