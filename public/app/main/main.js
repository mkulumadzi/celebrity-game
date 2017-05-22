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
      url: '/join',
      templateUrl: 'app/player/join.html',
      controller: 'JoinGameCtrl'
    });

    $stateProvider.state('join with id', {
      url: '/join/:id',
      templateUrl: 'app/player/join-id.html',
      controller: 'JoinGameIdCtrl'
    });

    $stateProvider.state('resume', {
      url: '/resume',
      templateUrl: 'app/game/resume.html',
      controller: 'ResumeGameCtrl'
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

    $stateProvider.state('rules', {
      url: '/rules',
      templateUrl: 'app/static/rules.html'
    });

  }]);
