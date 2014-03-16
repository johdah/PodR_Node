'use strict';

(function() {
	describe('PodR controllers', function() {
		describe('HeaderController', function() {
			// Load the controllers module
			beforeEach(module('podr'));

			var scope, HeaderController;

			beforeEach(inject(function($controller, $rootScope) {
				scope = $rootScope.$new();

				HeaderController = $controller('HeaderController', {
					$scope: scope
				});
			}));

			it('should expose some glocal scope', function() {
				expect(scope.global).toBeTruthy();
			});
		});
	});
})();