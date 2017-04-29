angular.module('app')
  .controller('GameCtrl', ['$scope', '$http', '$cookies', function ($scope, $http, $cookies) {

  var socket = io('http://192.168.99.100:8080');
  var gameId = JSON.parse($cookies.get('game'))._id;

  $scope.setAuthHeader = function() {
    $http.defaults.headers.common.Authorization = 'Bearer ' + gameId;
  }

  // Load data
  $scope.loadGame = function() {
    $scope.shortId = JSON.parse($cookies.get('game')).shortId;
    $http.get('/api/game')
    .then(function successCallback(response) {
      console.log(response);
    }, function errorCallback(response) {
      console.log(response);
    });
  };

  $('#startGameError').hide();
  $scope.setAuthHeader();
  $scope.loadGame();

  // Connected to the room
  socket.on('connect', function() {
    socket.emit('room', gameId);
  });

  socket.on('message', function (data) {
    console.log(data);
  });

}]);
