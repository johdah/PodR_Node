'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Podcast = mongoose.modul('Podcast'),
	_ = require('lodash');

/**
 * Find podcast by id
 */
exports.podcast = function(req, res, next, id) {
	Podcast.load(id, function(err, podcast) {
		if(err) return next(err);
		if(!podcast) return next(new Error('Failed to load podcast ' + id));
		req.podcast = podcast;
		next();
	});
};

/**
 * Create a podcast
 */

/**
 * Update a podcast
 */


/**
 * Delete a podcast
 */
exports.destroy = function(req, res) {
	var podcast = req.podcast;

	podcast.remove(function(err) {
		if(err) {
			return res.send('users/signup', {
				errors: err.errors,
				podcast: podcast
			});
		} else {
			res.jsonp(podcast);
		}
	});
};

/**
 * Show a podcast
 */
exports.show = function(req, res) {
	res.jsonp(req.podcast);
};

/**
 * List of podcasts
 */
exports.all = function(req, res) {
	Podcast.find().sort('-title').exec(function(err, podcasts) {
		if(err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(podcasts);
		}
	});
};