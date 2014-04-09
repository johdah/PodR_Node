'use strict';

angular.module('podr.episodes').controller('EpisodesController', ['$scope', '$stateParams', '$location', '$http', 'Global', 'Episodes', function($scope, $stateParams, $location, $http, Global, Episodes) {

    $scope.global = Global;

    $scope.find = function() {
        Episodes.query(function(episodes) {
            $scope.episodes = episodes;
        });
    };

    $scope.findOne = function() {
        console.log('test');
        Episodes.get({
            episodeId: $stateParams.episodeId
        }, function(episode) {
            $scope.episode = episode;

            $http({ method: 'GET', url: 'episodes/userepisode/' + episode._id })
                .success( function(data) {
                    $scope.userEpisode = data;
                })
                .error( function() {
                    //console.log("Failed to fetch the userepisode");
            });
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