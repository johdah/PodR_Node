'use strict';

// Index routes use index controller
var index = require('../controllers/index');
var authorization = require('./middlewares/authorization');

// Podcast authorization helpers
var hasAuthorization = function(req, res, next) {
	// TODO: everyone signed in is authorized at this time
	next();
};

module.exports = function(app) {
	// Home route
	app.get('/', index.render);
	app.get('/events', authorization.requiresLogin, index.allEvents);
};
