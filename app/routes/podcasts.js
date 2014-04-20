'use strict';

// Podcasts routes use podcasts controller
var podcasts = require('../controllers/podcasts');
var authorization = require('./middlewares/authorization');

// Podcast authorization helpers
var hasAuthorization = function(req, res, next) {
	// TODO: everyone signed in is authorized at this time
	next();
};


// Defining routes
module.exports = function(app) {
    // Lists
	app.get('/podcasts', authorization.requiresLogin, podcasts.all);
	app.get('/podcasts/followed', authorization.requiresLogin, podcasts.allFollowed);
	app.get('/podcasts/liked', authorization.requiresLogin, podcasts.allLiked);
	app.get('/podcasts/starred', authorization.requiresLogin, podcasts.allStarred);

    // Actions
	app.post('/podcasts', authorization.requiresLogin, podcasts.create);
	app.get('/podcasts/:podcastId', authorization.requiresLogin, podcasts.show);
	app.put('/podcasts/:podcastId', authorization.requiresLogin, hasAuthorization, podcasts.update);
	app.del('/podcasts/:podcastId', authorization.requiresLogin, hasAuthorization, podcasts.destroy);
	app.get('/podcasts/update/:podcastId', authorization.requiresLogin, podcasts.fetch);
    app.get('/podcasts/userpodcast/:podcastId', authorization.requiresLogin, podcasts.getUserPodcast);
    app.get('/podcasts/dislike/:podcastId', authorization.requiresLogin, podcasts.dislikePodcast);
    app.get('/podcasts/follow/:podcastId', authorization.requiresLogin, podcasts.followPodcast);
    app.get('/podcasts/like/:podcastId', authorization.requiresLogin, podcasts.likePodcast);
    app.get('/podcasts/star/:podcastId', authorization.requiresLogin, podcasts.starPodcast);
    app.get('/podcasts/unfollow/:podcastId', authorization.requiresLogin, podcasts.unfollowPodcast);
    app.get('/podcasts/unrate/:podcastId', authorization.requiresLogin, podcasts.unratePodcast);
    app.get('/podcasts/unstar/:podcastId', authorization.requiresLogin, podcasts.unstarPodcast);

	// Finish with setting up the podcastId param
	app.param('podcastId', podcasts.podcast);
};