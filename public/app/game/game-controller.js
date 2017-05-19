angular.module('app')
  .controller('GameCtrl', ['$scope', '$http', '$cookies', 'gameService', function ($scope, $http, $cookies, gameService) {

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

  // Increment score when an attempt is added
  gameService.socket.on('attempt added', function(data) {
    $scope.$applyAsync(function() {
      console.log(data);
      if ( data.correct ) {
        if ( data.team === 'teamA' ) {
          $scope.game.teamA.score += 1;
        } else {
          $scope.game.teamB.score += 1;
        }
      }
    });
  });

  // Update view when the turn ends
  gameService.socket.on('turn ended', function(data) {
    $scope.$applyAsync(function () {
      $scope.status = 0; // turn not in progress
      $scope.playerMessage = "Next up";
      $scope.nextPlayer = data;
    });
  });

  // Update view when the turn ends
  gameService.socket.on('turn started', function(data) {
    $scope.$applyAsync(function () {
      $scope.status = 1; // turn not in progress
      $scope.playerMessage = "Now playing";
    });
  });

}]);
