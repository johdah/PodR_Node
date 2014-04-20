'use strict';

angular.module('podr.playlists').controller('PlaylistsController', ['$scope', '$stateParams', '$location', '$http', 'Global', 'Playlists', function($scope, $stateParams, $location, $http, Global, Playlists) {
    $scope.global = Global;

    $scope.create = function() {
        var playlist = new Playlists({
            title: this.title,
            url: this.url
        });
        playlist.$save(function(err, playlist) {
            if(!err)
                $location.path('playlists/' + playlist._id);

            $scope.err = err;
        });

        this.title = '';
        this.url = '';
    };

    $scope.find = function() {
        console.log("test");
        Playlists.query(function(playlists) {
            console.log(playlists);
            $scope.playlists = playlists;
        });
    };

    $scope.findOne = function() {
        Playlists.get({
            playlistId: $stateParams.playlistId
        }, function(playlist) {
            $scope.playlist = playlist;
        });
    };

    $scope.remove = function(playlist) {
        if(playlist) {
            playlist.$remove();

            for(var i in $scope.playlists) {
                if($scope.playlists[i] === playlist) {
                    $scope.playlists.splice(i, 1);
                }
            }
        } else {
            $scope.playlist.$remove();
            $location.path('playlists');
        }
    };

    $scope.update = function() {
        var playlist = $scope.playlist;
        if(!playlist.updated) {
            playlist.updated = [];
        }
        playlist.updated.push(new Date().getTime());

        playlist.$update(function() {
            $location.path('playlists/' + playlist._id);
        });
    };
}]);