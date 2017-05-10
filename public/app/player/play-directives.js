angular.module('app')
.directive('notYourTurn', function() {
  return {
    restrict: 'E',
    scope: {
      player: '=player'
    },
    templateUrl: 'app/player/play-not-your-turn.html'
  };
});

angular.module('playYourTurnDirective', [])
.controller('Controller', ['$scope', '$http', function($scope, $http) {
  $scope.startTurn = function() {
    console.log("I'm trying");
    $http.post('/api/turns')
    .then(function successCallback(response) {
      console.log(response.data);
      $scope.turn = response.data;
      $scope.status = 2;
    }, function errorCallback(response) {
      console.log(response);
    });
  };
}])
.directive('yourTurn', function() {
  return {
    restrict: 'E',
    scope: {
      player: '=player'
    },
    templateUrl: 'app/player/play-your-turn.html'
  };
})

angular.module('app')
.directive('playing', function() {
    return {
    restrict: 'E',
    scope: {
      turn: '=turn'
    },
    templateUrl: 'app/player/play-playing.html'
  };
});

angular.module('app')
.directive('finishedTurn', function() {
  return {
    restrict: 'E',
    scope: {
      player: '=player'
    },
    templateUrl: 'app/player/play-finished-turn.html'
  };
});
