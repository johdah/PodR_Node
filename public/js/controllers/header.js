'use strict';

angular.module('podr.system').controllers('HeaderController', ['$scope', 'Global', function($scope, Global) {
	$scope.global = Global;

	$scope.menu = [
		{
			'title': 'Podcasts',
			'link': 'podcasts'
		}
	];

	$scope.isCollapsed = false;
}]);