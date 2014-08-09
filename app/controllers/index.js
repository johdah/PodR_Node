'use strict';

/**
* Module dependencies.
*/
var _ = require('lodash'),
	mongoose = require('mongoose'),
	Event = mongoose.model('Event'),
	Podcast = mongoose.model('Podcast');

exports.render = function(req, res) {
	res.render('index', {
		user: req.user ? JSON.stringify(req.user) : 'null'
	});
};

exports.allEvents = function(req, res) {
	Event.find().sort('-occurred').exec(function(err, events) {
		console.log(events[1]);
		if(err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(events);
		}
	});
}
