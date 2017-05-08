angular.module('app')
  .controller('PlayCtrl', ['$scope', '$http', '$cookies', '$stateParams', '$location', function ($scope, $http, $cookies, $stateParams, $location) {

  var socket = io('http://192.168.99.100:8080');

  $scope.player = JSON.parse($cookies.get('player'));
  $scope.status = 0;
  $scope.timeRemaining = 0;

  $scope.setAuthHeader = function() {
    $http.defaults.headers.common.Authorization = 'Bearer ' + $scope.player._id;
  }

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
  $scope.setAuthHeader();

  // Connected to the game room and the player room
  socket.on('connect', function() {
    socket.emit('room', $scope.player.game);
    socket.emit('room', $scope.player._id);
  });

  // Let the user know when it's their turn
  socket.on('your turn', function() {
    $scope.$applyAsync(function () {
      $scope.status = 1;
      $scope.updateView();
    });
  });

}]);
