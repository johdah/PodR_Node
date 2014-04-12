'use strict';

angular.module('podr.system').controller('HeaderController', ['$scope', 'Global', function($scope, Global) {
	$scope.global = Global;

	$scope.menu = [
		{
			'title': 'Podcasts',
			'link': 'podcasts'
		}, {
			'title': 'Episodes',
			'link': 'episodes'
		}, {
			'title': 'Add New Podcast',
			'link': 'podcasts/add'
		}
	];

	$scope.isCollapsed = false;
}]);