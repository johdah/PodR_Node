'use strict';

// Playlists routes use playlists controller
var playlists = require('../controllers/playlists');
var authorization = require('./middlewares/authorization');

// Playlist authorization helpers
var hasAuthorization = function(req, res, next) {
    // TODO: everyone signed in is authorized at this time
    next();
};