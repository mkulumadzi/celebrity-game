angular.module('app')
  .controller('StartCtrl', ['$scope', '$http', '$cookies', '$location', function ($scope, $http, $cookies, $location) {

  var socket = io('http://192.168.99.100:8080');
  var gameId = JSON.parse($cookies.get('game'))._id;
  $scope.gamePlayers = [];
  $scope.gameCelebrities = [];
  $scope.shortId = JSON.parse($cookies.get('game')).shortId;

  $scope.setAuthHeader = function() {
    $http.defaults.headers.common.Authorization = 'Bearer ' + gameId;
  }

  // Load data
  $scope.startGame = function() {
    $scope.setAuthHeader();
    $http.put('/api/game/start')
    .then(function successCallback(response) {
      $location.path( '/game' );
    }, function errorCallback(response) {
      $scope.errorMessage = response.data.message;
      $('#startGameError').show();
      console.log(response);
    });
  };

  $('#startGameError').hide();
  $scope.setAuthHeader();

  // Connected to the room
  socket.on('connect', function() {
    socket.emit('room', gameId);
  });

  socket.on('player joined', function(data) {
    $scope.$applyAsync(function () {
      $scope.gamePlayers.push(data);
    });
  });

  socket.on('celebrity added', function(data) {
    // console.log(data);
    $scope.$applyAsync(function () {
      $scope.gameCelebrities.push(data);
    });
  });

  socket.on('message', function (data) {
    console.log(data);
  });

}]);
