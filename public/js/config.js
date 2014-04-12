'use strict';

// Setting up route
angular.module('podr').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	// For unmatched routes:
	$urlRouterProvider.otherwise('/');

	// states for my app
	$stateProvider
        // Podcasts
		.state('all podcasts', {
			url: '/podcasts',
			templateUrl: 'views/podcasts/list.html'
		})
		.state('all followed podcasts', {
			url: '/podcasts/followed',
			templateUrl: 'views/podcasts/followed.html'
		})
		.state('all liked podcasts', {
			url: '/podcasts/liked',
			templateUrl: 'views/podcasts/liked.html'
		})
		.state('all starred podcasts', {
			url: '/podcasts/starred',
			templateUrl: 'views/podcasts/starred.html'
		})
		.state('create podcast', {
			url: '/podcasts/add',
			templateUrl: 'views/podcasts/create.html'
		})
		.state('edit podcast', {
			url: '/podcasts/:podcastId/edit',
			templateUrl: '/views/podcasts/edit.html'
		})
		.state('podcast by id', {
			url: '/podcasts/:podcastId',
			templateUrl: 'views/podcasts/view.html'
		})
        // Episodes
		.state('all episodes', {
			url: '/episodes',
			templateUrl: 'views/episodes/list.html'
		})
		.state('all liked episodes', {
			url: '/episodes/liked',
			templateUrl: 'views/episodes/liked.html'
		})
		.state('all starred episodes', {
			url: '/episodes/starred',
			templateUrl: 'views/episodes/starred.html'
		})
		.state('all unarchived episodes', {
			url: '/episodes/unarchived',
			templateUrl: 'views/episodes/unarchived.html'
		})
		.state('episode by id', {
			url: '/episodes/:episodeId',
			templateUrl: 'views/episodes/view.html'
		})
        // Home
		.state('home', {
			url: '/',
			templateUrl: 'views/index.html'
		});
}]);

// Setting HTML5 Location Mode
angular.module('podr').config(['$locationProvider', function($locationProvider) {
	$locationProvider.hashPrefix('!');
}]);