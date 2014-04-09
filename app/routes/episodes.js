'use strict';

// Episodes routes use episodes controller
var episodes = require('../controllers/episodes');
var authorization = require('./middlewares/authorization');

module.exports = function(app) {
    app.get('/episodes', authorization.requiresLogin, episodes.all);
    app.get('/episodes/:episodeId', authorization.requiresLogin, episodes.show);
    app.get('/episodes/archive/:episodeId', authorization.requiresLogin, episodes.archiveEpisode);
    app.get('/episodes/podcast/:podcastId', authorization.requiresLogin, episodes.allByPodcast);
    app.get('/episodes/restore/:episodeId', authorization.requiresLogin, episodes.restoreEpisode);
    app.get('/episodes/star/:episodeId', authorization.requiresLogin, episodes.starEpisode);
    app.get('/episodes/unstar/:episodeId', authorization.requiresLogin, episodes.unstarEpisode);
    app.get('/episodes/userepisode/:episodeId', authorization.requiresLogin, episodes.getUserEpisode);

    // Finish with setting up the episodeId param
    app.param('episodeId', episodes.episode);
};