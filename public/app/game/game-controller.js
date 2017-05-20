angular.module('app')
  .controller('GameCtrl', ['$scope', '$http', '$cookies', 'gameService', '$timeout', function ($scope, $http, $cookies, gameService, $timeout) {

  gameService.setAuthHeader();
  gameService.joinRoom();

  // Load data
  $scope.loadGame = function() {
    $http.get('/api/game')
    .then(function successCallback(response) {
      console.log(response.data);
      $scope.game = response.data;
      if( $scope.game.nextPlayer && $scope.game.nextPlayer.turn ) {
        $scope.status = 1; // turn in progress
        $scope.playerMessage = "Now playing";
      } else if ( $scope.game.nextPlayer ) {
        $scope.status = 0; // turn not in progress
        $scope.playerMessage = "Next up";
      } else {
        $scope.status = -1;
      }
    }, function errorCallback(response) {
      console.log(response);
    });
  };

  $scope.loadGame();

  // Update view when the turn ends
  gameService.socket.on('turn ended', function(data) {
    $scope.$applyAsync(function () {
      $scope.status = 0; // turn not in progress
      $scope.playerMessage = "Next up";
      $scope.game.nextPlayer = data.nextPlayer;
    });
  });

  // Update view when the turn ends
  gameService.socket.on('turn started', function(data) {
    $scope.$applyAsync(function () {
      $scope.status = 1; // turn not in progress
      $scope.timeRemaining = data.turnDuration;
      $scope.timer = $timeout($scope.onTimerTimeout, 1000);
      $scope.playerMessage = "Now playing";
    });
  });

  $scope.onTimerTimeout = function() {
    if( $scope.timeRemaining == 0) {
      $timeout.cancel($scope.timer);
    } else {
      $scope.timeRemaining--;
      timerTimeout = $timeout($scope.onTimerTimeout, 1000);
    }
  }

}]);
