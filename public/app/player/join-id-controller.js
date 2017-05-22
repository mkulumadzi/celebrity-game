angular.module('app')
  .controller('JoinGameIdCtrl', ['$scope', '$http', '$cookies', '$stateParams', '$location', function ($scope, $http, $cookies, $stateParams, $location) {

  if ($cookies.get('game')) {
    $http.get('/api/game?shortId=' + $stateParams.id)
    .then(function successCallback(response) {
      $scope.game = response.data;
      console.log($scope.game);
      if ( $scope.game.phase === "started" ) {
        $scope.gameStarted = true;
      }
    }, function errorCallback(response) {
      console.log(resopnse);
    });
  }

  $scope.resumeGame = function(player) {
    $http.defaults.headers.common.Authorization = 'Bearer ' + player._id;
    $http.get('/api/player')
    .then(function successCallback(response) {
      $scope.player = response.data;
      setCookies();
      $location.path("/play");
    }, function errorCallback(response) {
      console.log(response);
    });
  }

  $scope.joinGame = function() {
    $scope.formData.shortId = $stateParams.id;
    $http.post('/api/join', $scope.formData)
    .then(function successCallback(response) {
      $scope.player = response.data
      setCookies($scope.player);
      $location.path("/celebrity");
    }, function errorCallback(response) {
      $scope.errorMessage = response.data.message;
      $scope.form.$setUntouched();
      $timeout(function() {
        $scope.errorMessage = '';
      }, 2000);
    });
  }

  var setCookies = function() {
    $cookies.put('player', JSON.stringify({_id: $scope.player._id, name: $scope.player.name}));
    $cookies.put('game', JSON.stringify({_id: $scope.player.game._id, shortId: $scope.player.game.shortId}));
    $cookies.put('gameStatusesShown', JSON.stringify([]));
  }

}]);
