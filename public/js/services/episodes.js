'use strict';

// Podcasts service used for podcasts REST endpoint
angular.module('podr.episodes').factory('Episodes', ['$resource', function($resource) {
    return $resource('episodes/:episodeId', {
        episodeId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);