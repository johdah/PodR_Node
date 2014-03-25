'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	mongoose = require('mongoose'),
	http = require('http'),
	Podcast = mongoose.model('Podcast'),
	FeedParser = require('feedparser');

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

/**
 * Add a podcast
 */
exports.create = function(req, res) {
	var podcast = new Podcast(req.body);

	podcast.save(function(err) {
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
 * Fetch updates from the podcast feed
 */
exports.fetch = function(req, response) {
	var podcast = req.podcast;
	var feedMeta;
	var episodes = [];

	http.get(podcast.url, function(res) {
		res.pipe(new FeedParser({}))
			.on('error', function(error) {
				// TODO: We had a melt-down
			})
			.on('meta', function(meta) {
				podcast.copyright = meta.copyright;
				podcast.description = meta.description;
				podcast.title = meta.title;
			})
			.on('readable', function() {
				var stream = this, item;
				while (item = stream.read()) {
					// Each 'readable' event will contain one episode
					var episode = {
						'title': item.title,
						'mediaUrl': item.link,
						'pubDate': item.pubDate
					};
					episodes.push(episode);
				}
			})
			.on('end', function() {
				podcast.save(function(err) {
					if(err) {
						response.jsonp({
							success: false
						})
					} else {
						response.jsonp({
							success: true,
							newEpisodesCount: episodes.length,
							episodes: episodes,
							podcast: podcast
						});
					}
				});

			});
	});
};

/**
 * Show a podcast
 */
exports.show = function(req, res) {
	res.jsonp(req.podcast);
};

/**
 * Update a podcast
 */
exports.update = function(req, res) {
	var podcast = req.podcast;

	podcast = _.extend(podcast, req.body);

	podcast.save(function(err) {
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