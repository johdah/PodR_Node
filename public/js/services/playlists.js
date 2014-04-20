'use strict';

// Playlists service used for playlists REST endpoint
angular.module('podr.playlists').factory('Playlists', ['$resource', function($resource) {
    return $resource('playlists/:playlistId', {
        playlistId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);