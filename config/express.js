'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
	bodyParser = require('body-parser'), // express.bodyParser, express.json and express.urlencoded before Express 4
	cookieParser = require('cookie-parser'), // express.cookieParser before Express 4
	compression = require('compression'), // express.compress before Express 4
	favicon = require('serve-favicon'), // express.favicon before Express 4
	methodOverride = require('method-override'), // express.methodOverride before Express 4
	morganLogger = require('morgan'), // express.logger before Express 4
	session = require('express-session'), // express.session before Express 4
	consolidate = require('consolidate'),
	fs = require('fs'),
	mongoStore = require('connect-mongo')(session),
	flash = require('connect-flash'),
	helpers = require('view-helpers'),
	config = require('./config');

module.exports = function(app, passport, db) {
	app.set('showStackError', true);

	// Pretitfy HTML
	app.locals.pretty = true;
	// cache=memory or swig dies in NODE_ENV=production
	app.locals.cache = 'memory';

	// Should be placed before express.static
	// To ensure that all assets and data are compressed (utilize bandwidth)
	app.use(compression( {
		filter: function(req, res) {
			return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
		},
		// Levels are specified in a range of 0 to 9, where-as 0 is no compression and 9 is best compression, but slowest
		level: 9
	}));

	// Only use logger for development environment
	if(process.env.NODE_ENV === 'development') {
		app.use(morganLogger('dev'));
	}

	// Assign the template engine to .html files
	app.engine('html', consolidate[config.templateEngine]);

	// Set .html as the default extension
	app.set('view engine', 'html');

	// Set views path, template engine and default layout
	app.set('views', config.root + '/app/views');

	// Enable jsonp
	app.enable('jsonp callback');

	//app.configure(function() { // Removed in express 4
	// The cookieParser should be above session
	app.use(cookieParser());

	// Request body parsing middleware should be above methodOverride
	app.use(bodyParser.urlencoded({
	  extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	// Express/Mongo session storage
	app.use(session({
		resave: true,
		saveUninitialized: true,
		secret: config.sessionSecret,
		store: new mongoStore({
			db: db.connection.db,
			collection: config.sessionCollection
		})
	}));

	// Dynamic helpers
	app.use(helpers(config.app.name));

	// Use passport session
	app.use(passport.initialize());
	app.use(passport.session());

	// Connect flash for flash messages
	app.use(flash());

	// Routes should be at the last
	//app.use(app.router); // Deprecated in Express 4

	// Bootstrap routes
	var routes_path = config.root + '/app/routes';
	var walk = function(path) {
		fs.readdirSync(path).forEach(function(file) {
			var newPath = path + '/' + file;
			var stat = fs.statSync(newPath);
			if(stat.isFile()) {
				if(/(.*)\.(js$|coffee$)/.test(file)) {
					require(newPath)(app, passport);
				}
			// Skip app/routes/middlewares directory is skiped since it is meant
			// to be used and shared by routes and is not a route by itself
			} else if (stat.isDirectory() && file !== 'middlewares') {
				walk(newPath);
			}
		});
	};
	walk(routes_path);

	// Setting the fav icon and static folder
	app.use(favicon(config.root + '/public/favicon.ico'));
	app.use(express.static(config.root + '/public'));

	// Assume "not found" in the error msgs is a 404.
	// This is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
	app.use(function(err, req, res, next) {
		// Treat as 404
		if(~err.message.indexOf('not found')) return next();

		// Log it
		console.error(err.stack);

		// Error page
		res.status(500).render('500', {
			error: err.stack
		});
	});

	// Assume 404 since no middleware responded
	app.use(function(req, res) {
		res.status(404).render('404', {
			url: req.originalUrl,
			error: 'Not found'
		});
	});
	//});
};
