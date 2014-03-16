'use strict';

// Setting up route
angular.module('podr').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	// For unmatched routes:
	$urlRouterProvider.otherwise('/');

	// states for my app
	$stateProvider
		.state('all podcasts', {
			url: '/podcasts',
			templateUrl: 'views/podcasts/list.html'
		})
		.state('podcast by id', {
			url: '/podcasts/:podcastId',
			templateUrl: 'views/podcasts/view.html'
		})
		.state('home', {
			url: '/',
			templateUrl: 'views/index.html'
		});
}]);

// Setting HTML5 Location Mode
angular.module('podr').config(['$locationProvider', function($locationProvider) {
	$locationProvider.hashPrefix('!');
}]);