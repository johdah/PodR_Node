'use strict';

angular.module('podr.podcasts').controller('PodcastsController', ['$scope', '$stateParams', '$location', '$http', 'Global', 'Podcasts', function($scope, $stateParams, $location, $http, Global, Podcasts) {
	
	$scope.global = Global;

	$scope.create = function() {
		var podcast = new Podcasts({
			title: this.title,
			url: this.url
		});
		console.log(podcast);
		podcast.$save(function(err, podcast) {
			if(!err)
				$location.path('podcasts/' + podcast._id);
			
			$scope.err = err;
		});

		this.title = '';
		this.url = '';
	};

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

	$scope.update = function() {
		var podcast = $scope.podcast;
		if(!podcast.updated) {
			podcast.updated = [];
		}
		podcast.updated.push(new Date().getTime());

		podcast.$update(function() {
			$location.path('podcasts/' + podcast._id);
		});
	};

	$scope.fetch = function() {
		var podcast = $scope.podcast;

		$http({ method: 'GET', url: 'podcasts/update/' + podcast._id })
			.success( function(data, status, headers, config) {
				console.log(data);
				$location.path('podcasts/' + podcast._id);
			})
			.error( function(data, status, headers, config) {
				console.log("Failed to update the podcast");
			});
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