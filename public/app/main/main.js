angular.module('app')
  .config(['$stateProvider', function ($stateProvider) {
    'use strict';

    $stateProvider.state('main', { // this is a name for our route
      url: '/', // the actual url path of the route
      templateUrl: 'app/main/main.html', // the template that will load
      controller: 'MainCtrl' // the name of the controller to use
    });

    $stateProvider.state('game', { // this is a name for our route
      url: '/game', // the actual url path of the route
      templateUrl: 'app/game/game.html', // the template that will load
      controller: 'GameCtrl' // the name of the controller to use
    });

  }]);
