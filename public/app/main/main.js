angular.module('app')
  .config(['$stateProvider', function ($stateProvider) {
    'use strict';

    $stateProvider.state('main', { // this is a name for our route
      url: '/', // the actual url path of the route
      templateUrl: 'app/main/main.html', // the template that will load
      controller: 'MainCtrl' // the name of the controller to use
    });

    $stateProvider.state('start', { // this is a name for our route
      url: '/start', // the actual url path of the route
      templateUrl: 'app/game/start.html', // the template that will load
      controller: 'StartCtrl' // the name of the controller to use
    });

    $stateProvider.state('game', { // this is a name for our route
      url: '/game', // the actual url path of the route
      templateUrl: 'app/game/game.html', // the template that will load
      controller: 'GameCtrl' // the name of the controller to use
    });

    $stateProvider.state('join', { // this is a name for our route
      url: '/join/:id', // the actual url path of the route
      templateUrl: 'app/player/join.html', // the template that will load
      controller: 'JoinGameCtrl' // the name of the controller to use
    });

    $stateProvider.state('add-celebrity', { // this is a name for our route
      url: '/celebrity', // the actual url path of the route
      templateUrl: 'app/player/add-celebrity.html', // the template that will load
      controller: 'AddCelebrityCtrl' // the name of the controller to use
    });

  }]);
