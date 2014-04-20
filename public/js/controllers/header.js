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
		}
	];

	$scope.isCollapsed = false;
}]);