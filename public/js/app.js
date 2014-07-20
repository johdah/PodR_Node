'use strict';

angular.module('podr', ['ngCookies', 'ngResource', 'ngSanitize', 'ui.bootstrap', 'ui.router', 'podr.system', 'podr.podcasts', 'podr.episodes']);

angular.module('podr.system', []);
angular.module('podr.podcasts', []);
angular.module('podr.episodes', []);
