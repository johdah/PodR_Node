'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    mongoose = require('mongoose'),
    Episode = mongoose.model('Episode'),
    UserEpisode = mongoose.model('UserEpisode');

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
 * List of episodes.
 */
exports.allByPodcast = function(req, res) {
    Episode.find({podcast: req.podcast}).sort('-published').exec(function(err, episodes) {
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
 * Archive episode
 */
exports.archiveEpisode = function(req, res) {
    UserEpisode.findOne({
        episode: req.episode,
        user: req.user
    }).exec(function(err, ue) {
        if(err || ue === null)
            ue = new UserEpisode();

        ue.episode = req.episode;
        ue.user = req.user;
        ue.archived = true;
        ue.save(function(err) {
            if(err)
                res.jsonp(err);
            else
                res.jsonp(ue);
        });
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
 * Get an UserEpisode
 */
exports.getUserEpisode = function(req, res) {
    UserEpisode.findOne({
        episode: req.episode,
        user: req.user
    }).exec(function(err, ue) {
        if(err)
            res.jsonp(err);
        else
            res.jsonp(ue);
    });
};

/**
 * Restore episode
 */
exports.restoreEpisode = function(req, res) {
    UserEpisode.findOne({
        episode: req.episode,
        user: req.user
    }).exec(function(err, ue) {
        if(err || ue === null)
            ue = new UserEpisode();

        ue.episode = req.episode;
        ue.user = req.user;
        ue.archived = false;
        ue.save(function(err) {
            if(err)
                res.jsonp(err);
            else
                res.jsonp(ue);
        });
    });
};

/**
 * Show an episode
 */
exports.show = function(req, res) {
    res.jsonp(req.episode);
};

/**
 * Star episode
 */
exports.starEpisode = function(req, res) {
    UserEpisode.findOne({
        episode: req.episode,
        user: req.user
    }).exec(function(err, ue) {
        if(err || ue === null)
            ue = new UserEpisode();

        ue.episode = req.episode;
        ue.user = req.user;
        ue.starred = true;
        ue.save(function(err) {
            if(err)
                res.jsonp(err);
            else
                res.jsonp(ue);
        });
    });
};

/**
 * Unstar episode
 */
exports.unstarEpisode = function(req, res) {
    UserEpisode.findOne({
        episode: req.episode,
        user: req.user
    }).exec(function(err, ue) {
        if(err || ue === null)
            ue = new UserEpisode();

        ue.episode = req.episode;
        ue.user = req.user;
        ue.starred = false;
        ue.save(function(err) {
            if(err)
                res.jsonp(err);
            else
                res.jsonp(ue);
        });
    });
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