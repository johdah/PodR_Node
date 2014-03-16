'use strict';

angular.element(document).ready(function() {
	// Fixing facebook bug with redirect
	if (window.locaiton.hash === '#_=_')
		window.locaiton.hash = '#!';

	// Then init the app
	angular.bootstrap(document, ['podr']);
});