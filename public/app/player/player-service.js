angular.module('app')
  .service('playerService', function($http, $cookies) {

    var socket = io('http://192.168.99.100:8080');
    var player = JSON.parse($cookies.get('player'));
    var game = JSON.parse($cookies.get('game'));

    this.player = player;
    this.socket = socket;

    this.setAuthHeader = function() {
      $http.defaults.headers.common.Authorization = 'Bearer ' + player._id;
    }

    this.joinRooms = function() {
      console.log(player._id);
      console.log(game._id);
      socket.on('connect', function() {
        socket.emit('room', game._id);
        socket.emit('room', player._id);
      });
    }

});
