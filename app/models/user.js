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

/**
 * Virtuals
 */

/**
 * Validations
 */

/**
 * Pre-save hook
 */

/**
 * Methods
 */
UserSchema.Methods = {
	/**
	 * Authenticate - check if the passwords are the same
	 *
  	 * @param {String} plainText
  	 * @return {Boolean}
  	 * @api public
	 */
	authenticate: function(plainText) {
		return this.encryptPassword(plainText) === this.hashed_password;
	},

	/**
	 * Make salt
	 *
	 * @return {String}
	 * @api public
	 */
	makeSalt: function() {
		return crypto.randomBytes(16).toString('base64');
	},

	/**
	 * Encrypt password
	 *
	 * @param {String} password
	 * @return {String}
	 * @api public
	 */
	encryptPassword: function(password) {
		if(!password || !this.salt) return '';
		var salt = new Buffer(this.salt, 'base64');
		return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
	}
};

mongoose.model('User', UserSchema);