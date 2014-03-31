'use strict';

// Episodes routes use episodes controller
var episodes = require('../controllers/episodes');
var authorization = require('./middlewares/authorization');

// Episode authorization helpers
var hasAuthorization = function(req, res, next) {
    // TODO: everyone signed in is authorized at this time
    next();
};

module.exports = function(app) {
    app.get('/episodes', episodes.all);
    app.get('/episodes/podcast/:podcastId', episodes.allByPodcast);
    app.get('/episodes/:episodeId', episodes.show);

    // Finish with setting up the episodeId param
    app.param('episodeId', episodes.episode);
};