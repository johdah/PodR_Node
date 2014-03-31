'use strict';

// Episodes service used for episodes REST endpoint
angular.module('podr.episodes').factory('Episodes', ['$resource', function($resource) {
    return $resource('episodes/:episodeId', {
        episodeId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);