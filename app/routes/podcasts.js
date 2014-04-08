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
	app.get('/podcasts', podcasts.all);
	app.post('/podcasts', authorization.requiresLogin, podcasts.create);
	app.get('/podcasts/:podcastId', podcasts.show);
	app.put('/podcasts/:podcastId', authorization.requiresLogin, hasAuthorization, podcasts.update);
	app.del('/podcasts/:podcastId', authorization.requiresLogin, hasAuthorization, podcasts.destroy);
	app.get('/podcasts/update/:podcastId', authorization.requiresLogin, podcasts.fetch);
    app.get('/podcasts/userpodcast/:podcastId', authorization.requiresLogin, podcasts.getUserPodcast);

	// Finish with setting up the podcastId param
	app.param('podcastId', podcasts.podcast);
};