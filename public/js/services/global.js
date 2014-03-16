'use strict';

// Global service for global variables
angular.module('podr.system').factory('Global', [
	function() {
		var _this = this;
		_this.data = {
			user: window.user,
			authenticated: !! window.user
		};

		return _this._data;
	}
]);