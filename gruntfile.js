'use strict';

module.exports = function(grunt) {
	// Project Configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			js: {
				files: ['gruntfile.js', 'server.js', 'app/**/*.js', 'public/js/**', 'test/**/*.js'],
				tasks: ['jshint'],
				options: {
					livereload: true
				}
			},
			html: {
				files: ['public/views/**', 'app/views/**'],
				options: {
					livereload: true
				}
			},
			css: {
				files: ['public/css/**'],
				options: {
					livereload: true
				}
			}
		},
		jshint: {
			all: {
				src: ['gruntfile.js', 'server.js', 'app/**/*.js', 'public/js/**', 'test/**/*.js', '!test/coverage/**/*.js'],
				options: {
					jshintrc: true
				}
			}
		},
		env: {
			test: {
				NODE_ENV: 'test'
			}
		}
	});

	// Load NPM tasks

	// Making grunt default to force in order not to break the project.
	grunt.option('force', true);

	// Default task(s).
	grunt.registerTask('default', ['jshint', 'concurrent']);

	// Test task.
};