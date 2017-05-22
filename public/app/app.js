// create an angular module named 'app'
angular.module('app', [
    'ui.bootstrap' // load angular-ui.bootstrap
    ,'ui.router' // load angular-ui-router
    ,'ngCookies'
  ])
  // router options
  .config(['$urlRouterProvider', '$locationProvider',
    function ($urlRouterProvider, $locationProvider) {
    'use strict';

    $locationProvider.html5Mode(true); // allow html5mode routes (no #)
    $urlRouterProvider.otherwise('/'); // if route not found redirect to /
  }])
  .run(['$rootScope', '$state', function ($rootScope, $state) {
    'use strict';
    // this is available from all across the app
    $rootScope.appName = 'app';

    // make $state available from templates
    $rootScope.$state = $state;

}])
.controller('AppCtrl', ['$scope', '$location', '$rootScope', '$cookies', function( $scope, $location, $rootScope, $cookies) {
  $scope.hideHeader = $location.path() === "/";

  $rootScope.$watch(function() {
      return $location.path();
    },
    function(a){
      // Hide header on the home page
      $scope.onHomeScreen = $location.path() === "/";

      // Check for game, to display short code
      if( $cookies.get('game')) {
        $scope.game = JSON.parse($cookies.get('game'));
        $scope.shortId = $scope.game.shortId;
      }
  });

  $scope.goHome = function() {
    $location.path( '/' );
  }

}]);
