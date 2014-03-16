'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Podcast Schema
 */
var PodcastSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: '',
		trim: true
	},
	url: {
		type: String,
		default: '',
		trim: true
	}
});

/**
 * Validations
 */
PodcastSchema.path('url').validate(function(url) {
	return url.length;
}, 'Url cannot be blank');

mongoose.model('Podcast', PodcastSchema);