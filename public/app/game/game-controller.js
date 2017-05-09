angular.module('app')
  .controller('GameCtrl', ['$scope', '$http', '$cookies', 'gameService', function ($scope, $http, $cookies, gameService) {

  gameService.setAuthHeader();
  gameService.joinRoom();

  // Load data
  $scope.loadGame = function() {
    $http.get('/api/game')
    .then(function successCallback(response) {
      $scope.game = response.data;
    }, function errorCallback(response) {
      console.log(response);
    });
  };

  // Get the next player
  $scope.getNextPlayer = function() {
    $http.get('/api/game/next')
    .then(function successCallback(response) {
      $scope.nextPlayer = response.data;
      console.log(response.data);
    }, function errorCallback(response) {
      console.log(response);
    })
  }

  $('#startGameError').hide();
  $scope.loadGame();
  $scope.getNextPlayer();

  gameService.socket.on('message', function (data) {
    console.log(data);
  });

}]);
