'use strict';

// Playlists routes use playlists controller
var playlists = require('../controllers/playlists');
var authorization = require('./middlewares/authorization');

// Playlist authorization helpers
var hasAuthorization = function(req, res, next) {
    // TODO: everyone signed in is authorized at this time
    next();
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