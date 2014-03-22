'use strict';

angular.module('podr.system').controller('IndexController', ['$scope', 'Global', function($scope, Global) {
	$scope.global = Global;
}]);