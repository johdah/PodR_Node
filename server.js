'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
 	fs = require('fs'),
 	passport = require('passport'),
 	logger = require('mean-logger');

// Load configurations
// Set the node environment variable if not set before
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Initializing system variables
var config = require('./config/config'),
 	mongoose = require('mongoose');

// Bootstrap db connection
var db = mongoose.connect(config.db);

// Bootstrap models

// Bootstrap passport config

// Express settings

// Bootstrap routes

// Start the app by listening on <port>
var port = process.env.PORT || config.port;
app.listen(port);
console.log('Express app started on port ' + port);

// Initializing logger
logger.init(app, passport, mongoose);

// Expose app
exports = module.exports = app;