'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    mongoose = require('mongoose'),
    Episode = mongoose.model('Episode');

/**
 * Find episode by id
 */
exports.episode = function(req, res, next, id) {
    Episode.load(id, function(err, episode) {
        if(err) return next(err);
        if(!episode) return next(new Error('Failed to load episode ' + id));
        req.episode = episode;
        next();
    });
};

/**
 * List of episodes.
 */
exports.all = function(req, res) {
    Episode.find().sort('-published').exec(function(err, episodes) {
        if(err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(episodes);
        }
    });
};

/**
 * Add an episode
 */
exports.create = function(req, res) {
    var episode = new Episode(req.body);

    episode.save(function(err) {
        if(err) {
            return res.send('users/signup', {
                errors: err.errors,
                episode: episode
            });
        } else {
            res.jsonp(episode);
        }
    });
};

/**
 * Delete a podcast
 */
exports.destroy = function(req, res) {
    var episode = req.episode;

    episode.remove(function(err) {
        if(err) {
            return res.send('users/signup', {
                errors: err.errors,
                episode: episode
            });
        } else {
            res.jsonp(episode);
        }
    });
};

/**
 * Show an episode
 */
exports.show = function(req, res) {
    res.jsonp(req.episode);
};

/**
 * Update an episode
 */
exports.update = function(req, res) {
    var episode = req.episode;

    episode = _.extend(episode, req.body);

    episode.save(function(err) {
        if(err) {
            return res.send('users/signup', {
                errors: err.errors,
                episode: episode
            });
        } else {
            res.jsonp(episode);
        }
    });
};