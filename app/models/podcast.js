'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	uniqueValidator = require('mongoose-unique-validator'),
	Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

/**
 * Podcast Schema
 */
var PodcastSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	updated: {
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
		required: true,
		trim: true,
		unique: true
	},
	description: {
		type: String,
		default: ''
	},
	subtitle: {
		type: String
	},
	link: {
		type: String
	},
	author: {
		type: String
	},
	language: {
		type: String
	},
	imageTitle: {
		type: String
	},
	imageUrl: {
		type: String
	},
	copyright: {
		type: String
	},
	ownerEmail: {
		type: String
	},
	ownerName: {
		type: String
	},
	block: Boolean,
	explicit: Boolean,
	complete: Boolean,
    userPodcasts: [{
        type: ObjectId,
        ref: 'UserPodcast'
    }]
});

/**
 * Validations
 */
PodcastSchema.path('url').validate(function(url) {
	return url.length;
}, 'Url cannot be blank');

PodcastSchema.plugin(uniqueValidator, { message: 'Expected {PATH} to be unique.' });

/**
 * Statics
 */
PodcastSchema.statics.load = function(id, cb) {
	this.findOne({
		_id: id
	}).exec(cb);
};

mongoose.model('Podcast', PodcastSchema);