'use strict';

angular.module('podr.system').controllers('IndexController', ['$scope', 'Global', function($scope, Global) {
	$scope.global = Global;
}]);