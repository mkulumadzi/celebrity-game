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
      if( $scope.game.nextPlayer.turn ) {
        $scope.status = 1; // turn in progress
        $scope.playerMessage = "Now playing";
      } else {
        $scope.status = 0; // turn not in progress
        $scope.playerMessage = "Next up";
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
