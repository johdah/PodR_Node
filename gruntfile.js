'use strict';

module.exports = function(grunt) {
	// Project Configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')
	});

	// Making grunt default to force in order not to break the projects.
	grunt.option('force', true);
};