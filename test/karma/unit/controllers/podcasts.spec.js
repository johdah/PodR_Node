'use strict';

(function() {
	// Podcasts Controller Spec
	describe('PodR controllers', function() {
		describe('PodcastsController', function() {
			// The $resource service augments the response object with methods for updating and deleting the resource.
			// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match the responses exactly.
			// To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
			// When the toEqualData matcher compares two objects, it takes ony object properties into account and ignores methods.
			beforeEach(function() {
				this.addMatcher({
					toEqualData: function(expected) {
						return angular.equals(this.actual, expected);
					}
				});
			});

			// Load the controllers module
			beforeEach(module('podr'));

			// Initialize the controller and a mock scope
			var PodcastsController,
				scope,
				$httpBackend,
				$stateParams,
				$location;

			// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
			// This allows us to inject a service but then attach it to a variable with the same name as the service.
			beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
				scope = $rootScope.$new();

				PodcastsController = $controller('PodcastsController', {
					$scope: scope
				});

				$stateParams = _$stateParams_;
				$httpBackend = _$httpBackend_;
				$location = _$location_;
			}));

			it('$scope.find() should create an array with at least one podcast per object fetched from XHR', function() {
				// test expected GET request
				$httpBackend.expectGET('podcasts').respond([{
					title: 'A Podcast about Node.js',
					url: 'http://www.noderocks.com'
				}]);

				// run controller
				scope.find();
				$httpBackend.flush();

				// test scope value
				expect(scope.podcasts).toEqualData([{
					title: 'A Podcast about Node.js',
					url: 'http://www.noderocks.com'
				}]);
			});

			it('$scope.findOne() should create an array with one podcast object fetched from XHR using a podcastId URL parameter', function() {
				// fixture URL parament
				$stateParams.podcastId = '34923n23n32k23240ec9382323mf33';

				// fixture response object
				var testPodcastData = function() {
					return {
						title: 'A Podcast about Node.js',
						url: 'http://www.noderocks.com'
					};
				};

				// test expected GET request with a response object
				$httpBackend.expectGET(/podcasts\/([0-9a-fA-F]{24})$/).respond(testPodcastData());

				// run controller
				scope.findOne();
				$httpBackend.flush();

				// test scope vlaue
				expect(scope.podcast).toEqualData(testPodcastData());
			});

			it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', function() {
				// fixture expected POST data
				var postPodcastData = function() {
					return {
						title: 'A Podcast about Node.js',
						url: 'http://www.noderocks.com'
					};
				};

				// fixture expected response data
				var responsePodcastData = function() {
					return {
						_id: '34923n23n32k23240ec9382323mf33',
						title: 'A Podcast about Node.js',
						url: 'http://www.noderocks.com'
					};
				};

				// fixture mock form input values
				scope.title = 'A Podcast about Node.js';
				scope.url = 'http://www.noderocks.com';

				// test post request is sent
				$httpBackend.expectPOST('podcasts', postPodcastData()).respond(responsePodcastData());

				// Run controller
				scope.create();
				$httpBackend.flush();

				// test form input(s) are reset
				expect(scope.title).toEqual('');
				expect(scope.url).toEqual('');

				// test URL location to new object
				expect($location.path()).toBe('/podcasts/' + responsePodcastData()._id);
			});

			it('$scope.update() should update a valid podcast', inject(function(Podcasts) {
				// fixture rideshare
				var putPodcastData = function() {
					return {
						_id: '34923n23n32k23240ec9382323mf33',
						title: 'A Podcast about Node.js',
						url: 'http://www.noderocks.com'
					};
				};

				// mock podcast object from form
				var podcast = new Podcasts(putPodcastData());

				// mock podcast in scope
				scope.podcast = podcast;

				// test PUT happens correctly
				$httpBackend.expectPUT(/podcasts\/([0-9a-fA-F]{24})$/).respond();

				// run controller
				scope.update();
				$httpBackend.flush();

				// test URL location to new object
				expect($location.path()).toBe('/podcasts/' + putPodcastData()._id);
			}));
			it('$scope.remove() should be send a DELETE request with a valid podcastId and remove the podcast from the scope', inject(function(Podcasts) {
				// fixture rideshare
				var podcast = new Podcasts({
					_id: '34923n23n32k23240ec9382323mf33'
				});

				// mock rideshares in scope
				scope.podcasts = [];
				scope.podcasts.push(podcast);

				// test expected rideshare DELETE request
				$httpBackend.expectDELETE(/podcasts\/([0-9a-fA-F]{24})$/).respond(204);

				// run controller
				scope.remove(podcast);
				$httpBackend.flush();

				// test after succesful delete URL location podcasts list
				expect(scope.podcasts.length).toBe(0);
			}));
		});
	});
}());