angular.module('app')
  .controller('PlayCtrl', ['$scope', '$http', '$cookies', '$stateParams', '$location', 'playerService', function ($scope, $http, $cookies, $stateParams, $location, playerService) {

  $scope.player = playerService.player;
  $scope.status = 0;
  $scope.timeRemaining = 0;

  playerService.setAuthHeader();
  playerService.joinRooms();

  $scope.updateView = function() {
    if( $scope.status == 0 ) {
      $scope.statusMessage = "It's gametime";
      $('#start-turn').hide();
      $('#game-play').hide();
    } else if ( $scope.status == 1 ) {
      $scope.statusMessage = "It's your turn";
      $('#start-turn').show();
      $('#game-play').hide();
    } else {
      $scope.statusMessage = "Good luck!";
      $('#start-turn').hide();
      $scope.timeRemaining = 60;
      $scope.$broadcast('timer-reset');
      $scope.$broadcast('timer-start');
      $('#game-play').show();
    }
  }

  $scope.startTurn = function() {
    $http.post('/api/turns')
    .then(function successCallback(response) {
      console.log(response.data);
      $scope.turn = response.data;
      $scope.status = 2;
      $scope.updateView();
    }, function errorCallback(response) {
      console.log(response);
    });
  };

  $scope.addAttempt = function(correct) {
    var attempt = { celebrity: $scope.turn.celebrity._id, correct: correct };
    console.log( attempt );
    $http.put('/api/turns/' + $scope.turn._id, attempt)
    .then(function successCallback(response) {
      console.log(response.data);
      $scope.turn = response.data;
    }, function errorCallback(response) {
      console.log(response);
    });
  };

  $scope.updateView();

  // Let the user know when it's their turn
  playerService.socket.on('your turn', function() {
    $scope.$applyAsync(function () {
      $scope.status = 1;
      $scope.updateView();
    });
  });

}]);
