angular.module('app')
  .controller('PlayCtrl', ['$scope', '$http', '$cookies', '$stateParams', '$location', 'playerService', '$timeout', function ($scope, $http, $cookies, $stateParams, $location, playerService, $timeout) {

  playerService.setAuthHeader();
  playerService.joinRooms();

  var gameC = $cookies.get('gameStatusesShown');
  if ( gameC) {
    $scope.gameStatusesShown = JSON.parse(gameC);
  } else {
    $scope.gameStatusesShown = [];
  }

  $scope.continue = function() {
    $scope.gameStatus = 0; //Show gameplay controls.
    $scope.getPlayerDetails();
  }

  $scope.getPlayerDetails = function() {
    $http.get('/api/player')
    .then(function successCallback(response) {
      $scope.player = response.data;
      $scope.status = response.data.status;

      var gameStatus = response.data.game.status;

      console.log(gameStatus);
      console.log($scope.gameStatusesShown)
      console.log($scope.gameStatusesShown.indexOf(gameStatus) == -1);

      if( gameStatus == 1 || gameStatus == 2 || gameStatus == 3 ) {
        if($scope.gameStatusesShown.indexOf(gameStatus) == -1) {
          $scope.gameStatus = gameStatus;
          $scope.gameStatusesShown.push(gameStatus);
          $cookies.put('gameStatusesShown', JSON.stringify($scope.gameStatusesShown));
        } else {
          $scope.gameStatus = 0; // Show normal gameplay mode if the round instructions have already been shown.
        }
      } else {
        $scope.gameStatus = gameStatus;
      }

      if ( response.data.turn ) {
        $scope.turn = response.data.turn;
        $scope.timeRemaining = $scope.turn.timeRemaining;
        $scope.timer = $timeout($scope.onTimerTimeout, 1000);
      }
      console.log(response.data);
    }, function errorCallback(response) {
      console.log(response);
    });
  }

  $scope.startTurn = function() {
    $http.post('/api/turns')
    .then(function successCallback(response) {
      $scope.turn = response.data;
      $scope.status = 2;
      $scope.timeRemaining = $scope.turn.turnDuration;
      $scope.timer = $timeout($scope.onTimerTimeout, 1000);
    }, function errorCallback(response) {
      console.log(response);
    });
  };

  $scope.onTimerTimeout = function() {
    if( $scope.timeRemaining == 0) {
      $timeout.cancel($scope.timer);
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
    $scope.turnResults = null;
  };

  // Let the user know when it's their turn
  playerService.socket.on('your turn', function() {
    $scope.$applyAsync(function () {
      $scope.status = 1;
    });
  });

  // Monitor when a turn starts - mainly needed to know whether the 'turn ended' notification should be ignored.
  playerService.socket.on('turn started', function(data) {
    $scope.$applyAsync(function() {
      $scope.currentTurn = data;
    });
  });

  // Update view when the turn ends, if it is now your turn.
  playerService.socket.on('turn ended', function(data) {
    console.log(data);

    // Check whether this notification corresponds to an active turn - it may be fired off after the round ends.
    if ( $scope.currentTurn && $scope.currentTurn._id === data.lastTurn._id ) {
      $scope.$applyAsync(function () {
        if ( $scope.turn ) {
          $scope.status = 3;
          $scope.turnResults = data.lastTurn.results;
          $scope.turn = null;

          // Reset to status 0 if the player's view is still in the 'finished' state.
          $timeout(function() {
            if ( $scope.status == 3 ) {
              $scope.finishTurn();
            }
          }, 5000);

        } else if ( data.nextPlayer._id === $scope.player._id ) {
          $scope.status = 1;
        }
      });
    }
  });

  // Update view when the turn ends, if it is now your turn.
  playerService.socket.on('round ended', function(data) {
    console.log(data);
    $scope.$applyAsync(function () {
      // Clear out the current turn so that a subsequent notification for that turn doesn't have an effect.
      $scope.currentTurn = null;

      if( $scope.turn ) {
        // Clear out the current player's turn.
        $scope.turn = null;
        $scope.status = 3;
      }

      if( data === "roundOne" ) {
        $scope.gameStatus = 2; // Show round 2 instructions

      } else if ( data === "roundTwo" ) {
        $scope.gameStatus = 3; // Show round 3 instructions
      } else {
        $scope.gameStatus = 4; // Show end of game summary
        $scope.getPlayerDetails();
      }

      $scope.gameStatusesShown.push($scope.gameStatus);
      $cookies.put('gameStatusesShown', JSON.stringify($scope.gameStatusesShown));

    });
  });

  $scope.getPlayerDetails();

  $scope.currentRound = function() {
    if($scope.player) {
      if($scope.player.game.currentRound == "roundOne") {
        return "Round 1";
      } else if ($scope.player.game.currentRound == "roundTwo") {
        return "Round 2";
      } else if ($scope.player.game.currentRound == "roundThree") {
        return "Round 3";
      } else if ($scope.player.game.currentRound == "gameOver") {
        return "Game Over";
      } else {
        "Error";
      }
    }
  }

}]);
