'use strict';

// Podcasts service used for podcasts REST endpoint
angular.module('podr.podcasts').factory('Podcasts', ['$resource', function($resource) {
	return $resource('podcasts/:podcastId', {
		podcastId: '@_id'
	}, {
		update: {
			method: 'PUT'
		}
	});
}]);