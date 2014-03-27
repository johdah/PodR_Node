'use strict';

angular.module('podr.episodes').controller('EpisodesController', ['$scope', '$stateParams', '$location', '$http', 'Global', 'Episodes', function($scope, $stateParams, $location, $http, Global, Episodes) {

    $scope.global = Global;

    $scope.find = function() {
        Episodes.query(function(episodes) {
            $scope.episodes = episodes;
        });
    };

    $scope.findOne = function() {
        Episodes.get({
            episodeId: $stateParams.episodeId
        }, function(podcast) {
            $scope.episode = episode;
        });
    };
}]);