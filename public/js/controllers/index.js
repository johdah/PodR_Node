'use strict';

angular.module('podr.system').controller('IndexController', ['$scope', '$http', 'Global', function($scope, $http, Global) {
	$scope.global = Global;

	$scope.findEvents = function() {
			$http({ method: 'GET', url: 'events' })
					.success( function(data) {
							$scope.events = data;
					})
					.error( function() {
			});
	};
}]);
