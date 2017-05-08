angular.module('app')
  .config(['$stateProvider', function ($stateProvider) {
    'use strict';

    $stateProvider.state('main', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainCtrl'
    });

    $stateProvider.state('start', {
      url: '/start',
      templateUrl: 'app/game/start.html',
      controller: 'StartCtrl'
    });

    $stateProvider.state('game', {
      url: '/game',
      templateUrl: 'app/game/game.html',
      controller: 'GameCtrl'
    });

    $stateProvider.state('join', {
      url: '/join/:id',
      templateUrl: 'app/player/join.html',
      controller: 'JoinGameCtrl'
    });

    $stateProvider.state('add-celebrity', {
      url: '/celebrity',
      templateUrl: 'app/player/add-celebrity.html',
      controller: 'AddCelebrityCtrl'
    });

    $stateProvider.state('play', {
      url: '/play',
      templateUrl: 'app/player/play.html',
      controller: 'PlayCtrl'
    });

  }]);
