'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	Podcast = mongoose.model('Podcast');

// Globals
var podcast;

// The tests
describe('<Unit Test>', function() {
	describe('Model Podcast:', function() {
		beforeEach(function(done) {
			podcast = new Podcast({
				title: 'Podcast Title',
				url: 'Podcast Url'
			});

			done();
		});

		describe('Method Save', function() {
			it('should be able to save without problems', function(done) {
				return podcast.save(function(err) {
					should.not.exist(err);
					done();
				});
			});

			it('should be able to show an error when try to save without url', function(done) {
				podcast.url = '';

				return podcast.save(function(err) {
					should.exist(err);
					done();
				});
			});
		});

		afterEach(function(done) {
			podcast.remove();
			done();
		});
	});
});