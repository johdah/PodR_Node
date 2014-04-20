'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    mongoose = require('mongoose'),
    Playlist = mongoose.model('Playlist');

/**
 * Find playlist by id
 */
exports.playlist = function(req, res, next, id) {
    Playlist.load(id, function(err, playlist) {
        if(err) return next(err);
        if(!playlist) return next(new Error('Failed to load playlist ' + id));
        req.playlist = playlist;
        next();
    });
};

/**
 * List of playlists
 */
exports.all = function(req, res) {
    Playlist.find().sort('title').exec(function(err, playlists) {
        if(err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(playlists);
        }
    });
};

/**
 * Add a playlist
 */
exports.create = function(req, res) {
    var playlist = new Playlist(req.body);

    playlist.save(function(err) {
        if(err) {
            return res.send('users/signup', {
                errors: err.errors,
                playlist: playlist
            });
        } else {
            res.jsonp(playlist);
        }
    });
};

/**
 * Delete a playlist
 */
exports.destroy = function(req, res) {
    var playlist = req.playlist;

    playlist.remove(function(err) {
        if(err) {
            return res.send('users/signup', {
                errors: err.errors,
                playlist: playlist
            });
        } else {
            res.jsonp(playlist);
        }
    });
};

/**
 * Show a playlist
 */
exports.show = function(req, res) {
    res.jsonp(req.playlist);
};

/**
 * Update a playlist
 */
exports.update = function(req, res) {
    var playlist = req.playlist;

    playlist = _.extend(playlist, req.body);

    playlist.save(function(err) {
        if(err) {
            return res.send('users/signup', {
                errors: err.errors,
                playlist: playlist
            });
        } else {
            res.jsonp(playlist);
        }
    });
};

// Defining routes
module.exports = function(app) {
    // Lists
    app.get('/playlists', authorization.requiresLogin, playlists.all);

    // View
    app.get('/playlists/:playlistId', authorization.requiresLogin, playlists.show);

    // Actions
    app.post('/playlists', authorization.requiresLogin, playlists.create);
    app.del('/playlists/:playlistId', authorization.requiresLogin, hasAuthorization, playlists.destroy);
    app.put('/playlists/:playlistId', authorization.requiresLogin, hasAuthorization, playlists.update);

    // Finish with setting up the playlistId param
    app.param('playlistId', playlists.playlist);
};