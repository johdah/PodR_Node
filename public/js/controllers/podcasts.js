'use strict';

angular.module('podr.podcasts').controller('PodcastsController', ['$scope', '$stateParams', '$location', '$http', 'Global', 'Podcasts', function($scope, $stateParams, $location, $http, Global, Podcasts) {
	
	$scope.global = Global;

	$scope.create = function() {
		var podcast = new Podcasts({
			title: this.title,
			url: this.url
		});
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
			.success( function() {
				$location.path('podcasts/' + podcast._id);
			})
			.error( function() {
				console.log('Failed to update the podcast');
			});
	};

	$scope.find = function() {
		Podcasts.query(function(podcasts) {
			$scope.podcasts = podcasts;
		});
	};

	$scope.findFollowed = function() {
        $http({ method: 'GET', url: 'podcasts/followed' })
            .success( function(data) {
                $scope.userPodcasts = data;
            })
            .error( function() {
        });
	};

	$scope.findLiked = function() {
        $http({ method: 'GET', url: 'podcasts/liked' })
            .success( function(data) {
                $scope.userPodcasts = data;
            })
            .error( function() {
        });
	};

	$scope.findStarred = function() {
        $http({ method: 'GET', url: 'podcasts/starred' })
            .success( function(data) {
                $scope.userPodcasts = data;
            })
            .error( function() {
        });
	};

	$scope.findOne = function() {
		Podcasts.get({
			podcastId: $stateParams.podcastId
		}, function(podcast) {
			$scope.podcast = podcast;

            $http({ method: 'GET', url: 'episodes/podcast/' + podcast._id })
                .success( function(data) {
                    $scope.episodes = data;
                })
                .error( function() {
                    console.log('Failed to update the podcast');
                });

            $http({ method: 'GET', url: 'podcasts/userpodcast/' + podcast._id })
                .success( function(data) {
                    $scope.userPodcast = data;
                })
                .error( function() {
                    //console.log("Failed to fetch the userpodcast");
            });
		});
	};

    $scope.dislike = function() {
        var podcast = $scope.podcast;

        $http({ method: 'GET', url: 'podcasts/dislike/' + podcast._id })
            .success( function() {
                $location.path('podcasts/' + podcast._id);
            })
            .error( function() {
        });
    };

    $scope.follow = function() {
        var podcast = $scope.podcast;

        $http({ method: 'GET', url: 'podcasts/follow/' + podcast._id })
            .success( function() {
                $location.path('podcasts/' + podcast._id);
            })
            .error( function() {
        });
    };

    $scope.like = function() {
        var podcast = $scope.podcast;

        $http({ method: 'GET', url: 'podcasts/like/' + podcast._id })
            .success( function() {
                $location.path('podcasts/' + podcast._id);
            })
            .error( function() {
        });
    };

    $scope.star = function() {
        var podcast = $scope.podcast;

        $http({ method: 'GET', url: 'podcasts/star/' + podcast._id })
            .success(function () {
                $location.path('podcasts/' + podcast._id);
            })
            .error( function() {
        });
    };

    $scope.unfollow = function() {
        var podcast = $scope.podcast;

        $http({ method: 'GET', url: 'podcasts/unfollow/' + podcast._id })
            .success( function() {
                $location.path('podcasts/' + podcast._id);
            })
            .error( function() {
        });
    };

    $scope.unstar = function() {
        var podcast = $scope.podcast;

        $http({ method: 'GET', url: 'podcasts/unstar/' + podcast._id })
            .success( function() {
                $location.path('podcasts/' + podcast._id);
            })
            .error( function() {
        });
    };
}]);