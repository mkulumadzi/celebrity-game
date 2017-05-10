angular.module('app')
  .controller('StartCtrl', ['$scope', '$http', '$cookies', '$location', 'gameService', '$timeout', function ($scope, $http, $cookies, $location, gameService, $timeout) {

  gameService.setAuthHeader();
  gameService.joinRoom();

  $scope.gamePlayers = [];
  $scope.gameCelebrities = [];
  $scope.shortId = JSON.parse($cookies.get('game')).shortId;

  // Load data
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
      $scope.gamePlayers.push(data);
    });
  });

  gameService.socket.on('celebrity added', function(data) {
    $scope.$applyAsync(function () {
      $scope.gameCelebrities.push(data);
    });
  });

  gameService.socket.on('message', function (data) {
    console.log(data);
  });

}]);
