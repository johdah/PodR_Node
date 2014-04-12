'use strict';

angular.module('podr.episodes').controller('EpisodesController', ['$scope', '$stateParams', '$location', '$http', 'Global', 'Episodes', function($scope, $stateParams, $location, $http, Global, Episodes) {

    $scope.global = Global;

    $scope.find = function() {
        Episodes.query(function(episodes) {
            $scope.episodes = episodes;
        });
    };

    $scope.findLiked = function() {
        $http({ method: 'GET', url: 'episodes/liked' })
            .success( function(data) {
                $scope.userEpisodes = data;
            })
            .error( function() {
        });
    };

    $scope.findOne = function() {
        Episodes.get({
            episodeId: $stateParams.episodeId
        }, function(episode) {
            $scope.episode = episode;

            $http({ method: 'GET', url: 'episodes/userepisode/' + episode._id })
                .success( function(data) {
                    $scope.userEpisode = data;
                })
                .error( function() {
                });
        });
    };

    $scope.findStarred = function() {
        $http({ method: 'GET', url: 'episodes/starred' })
            .success( function(data) {
                $scope.userEpisodes = data;
            })
            .error( function() {
        });
    };

    $scope.findUnarchived = function() {
        $http({ method: 'GET', url: 'episodes/unarchived' })
            .success( function(data) {
                $scope.userEpisodes = data;
            })
            .error( function() {
        });
    };

    $scope.archive = function() {
        var episode = $scope.episode;

        $http({ method: 'GET', url: 'episodes/archive/' + episode._id })
            .success( function() {
                $location.path('episodes/' + episode._id);
            })
            .error( function() {
        });
    };

    $scope.dislike = function() {
        var episode = $scope.episode;

        $http({ method: 'GET', url: 'episodes/dislike/' + episode._id })
            .success( function() {
                $location.path('episodes/' + episode._id);
            })
            .error( function() {
        });
    };

    $scope.like = function() {
        var episode = $scope.episode;

        $http({ method: 'GET', url: 'episodes/like/' + episode._id })
            .success( function() {
                $location.path('episodes/' + episode._id);
            })
            .error( function() {
        });
    };

    $scope.restore = function() {
        var episode = $scope.episode;

        $http({ method: 'GET', url: 'episodes/restore/' + episode._id })
            .success( function() {
                $location.path('episodes/' + episode._id);
            })
            .error( function() {
        });
    };

    $scope.star = function() {
        var episode = $scope.episode;

        $http({ method: 'GET', url: 'episodes/star/' + episode._id })
            .success( function() {
                $location.path('episodes/' + episode._id);
            })
            .error( function() {
        });
    };

    $scope.unstar = function() {
        var episode = $scope.episode;

        $http({ method: 'GET', url: 'episodes/unstar/' + episode._id })
            .success( function() {
                $location.path('episodes/' + episode._id);
            })
            .error( function() {
        });
    };
}]);