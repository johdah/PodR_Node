'use strict';

angular.module('podr.podcasts').controller('PodcastsController', ['$scope', '$stateParams', '$location', 'Global', 'Podcasts', function($scope, $stateParams, $location, Global, Podcasts) {
	$scope.global = Global;

	$scope.remove = function(podcast) {
		if(podcast) {
			podcast.$remove();

			for(var i in $scope.podcasts) {
				if($scope.podcasts[i] === podcast) {
					$scope.podcasts.splice(i, 1);
				}
			}
		} else {
			$scope.podcast.$remove();
			$location.path('podcasts');
		}
	};

	$scope.find = function() {
		Podcasts.query(function(podcasts) {
			$scope.podcasts = podcasts;
		});
	};

	$scope.findOne = function() {
		Podcasts.get({
			podcastId: $stateParams.podcastId
		}, function(podcast) {
			$scope.podcast = podcast;
		});
	};
}]);