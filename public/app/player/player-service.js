angular.module('app')
  .service('playerService', function($http, $cookies) {

    var socket = io('http://192.168.99.100:8080');
    var player = JSON.parse($cookies.get('player'));

    this.player = player;
    this.socket = socket;

    this.setAuthHeader = function() {
      $http.defaults.headers.common.Authorization = 'Bearer ' + player._id;
    }

    this.joinRooms = function() {
      socket.on('connect', function() {
        socket.emit('room', player.game);
        socket.emit('room', player._id);
      });
    }

});
