angular.module('app')
  .controller('StartCtrl', ['$scope', '$http', '$cookies', '$location', 'gameService', '$timeout', function ($scope, $http, $cookies, $location, gameService, $timeout) {

  gameService.setAuthHeader();
  gameService.joinRoom();

  $scope.shortId = JSON.parse($cookies.get('game')).shortId;

  // Load data
  $scope.loadGame = function() {
    $http.get('/api/game')
    .then(function successCallback(response) {
      $scope.game = response.data;
      console.log(response.data);
    }, function errorCallback(response) {
      console.log(response);
    });
  };

  // Start the game
  $scope.startGame = function() {
    $http.put('/api/game/start')
    .then(function successCallback(response) {
      $location.path( '/game' );
    }, function errorCallback(response) {
      $scope.errorMessage = response.data.message;
      $timeout(function() {
        $scope.errorMessage = '';
      }, 2000);
    });
  };

  gameService.socket.on('player joined', function(data) {
    $scope.$applyAsync(function () {
      $scope.game.players.push(data);
    });
  });

  gameService.socket.on('celebrity added', function(data) {
    $scope.$applyAsync(function () {
      $scope.game.celebrities.push(data);
    });
  });

  gameService.socket.on('message', function (data) {
    console.log(data);
  });

  $scope.loadGame();

}]);
