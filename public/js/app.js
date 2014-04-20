'use strict';

angular.module('podr', ['ngCookies', 'ngResource', 'ui.bootstrap', 'ui.router', 'podr.system', 'podr.podcasts', 'podr.episodes', 'podr.playlists']);

angular.module('podr.system', []);
angular.module('podr.podcasts', []);
angular.module('podr.episodes', []);
angular.module('podr.playlists', []);