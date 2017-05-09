angular.module('app')
  .service('gameService', function($http, $cookies) {

    var socket = io('http://192.168.99.100:8080');
    var gameId = JSON.parse($cookies.get('game'))._id;

    this.socket = socket;

    this.setAuthHeader = function() {
      $http.defaults.headers.common.Authorization = 'Bearer ' + gameId;
    }

    this.joinRoom = function() {
      socket.on('connect', function() {
        socket.emit('room', gameId);
      });
    }

});
