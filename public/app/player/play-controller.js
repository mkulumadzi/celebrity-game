angular.module('app')
  .controller('PlayCtrl', ['$scope', '$http', '$cookies', '$stateParams', '$location', 'playerService', '$timeout', function ($scope, $http, $cookies, $stateParams, $location, playerService, $timeout) {

  $scope.player = playerService.player;
  $scope.status = 0;

  playerService.setAuthHeader();
  playerService.joinRooms();

  $scope.startTurn = function() {
    $http.post('/api/turns')
    .then(function successCallback(response) {
      console.log(response.data);
      $scope.turn = response.data;
      $scope.status = 2;
      $scope.timeRemaining = $scope.turnDuration();
      $scope.timer = $timeout($scope.onTimerTimeout, 1000);
    }, function errorCallback(response) {
      console.log(response);
    });
  };

  $scope.turnDuration = function() {
    return Math.ceil(
      moment.duration(moment($scope.turn.expiresAt)
      .diff($scope.turn.createdAt)).asSeconds()
    );
  }

  $scope.onTimerTimeout = function() {
    if( $scope.timeRemaining == 0) {
      $timeout.cancel($scope.timer);
      $scope.status = 3;
    } else {
      $scope.timeRemaining--;
      timerTimeout = $timeout($scope.onTimerTimeout, 1000);
    }
  }

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

  $scope.finishTurn = function() {
    $scope.status = 0;
  };

  // Let the user know when it's their turn
  playerService.socket.on('your turn', function() {
    $scope.$applyAsync(function () {
      $scope.status = 1;
    });
  });

  // Update view when the turn ends, if it is now your turn.
  playerService.socket.on('turn ended', function(data) {
    console.log(data);
    console.log($scope.player._id);
    $scope.$applyAsync(function () {
      var nextPlayer = data;
      if ( nextPlayer._id == $scope.player._id ) {
        $scope.status = 1;
      }
    });
  });

}]);
