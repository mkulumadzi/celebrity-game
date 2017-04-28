angular.module('app')
  .controller('GameCtrl', ['$scope', '$http', '$cookies', function ($scope, $http, $cookies) {

  $scope.setAuthHeader = function() {
    var gameId = JSON.parse($cookies.get('game'))._id;
    $http.defaults.headers.common.Authorization = 'Bearer ' + gameId;
  }

  // Load data
  $scope.loadGame = function() {
    $scope.shortId = JSON.parse($cookies.get('game')).shortId;
    $http.get('/api/game')
    .then(function successCallback(response) {
      console.log(response);
    }, function errorCallback(response) {
      console.log(response);
    });
  };

  // Load data
  $scope.startGame = function() {
    $scope.setAuthHeader();
    $http.put('/api/game/start')
    .then(function successCallback(response) {
      console.log(response);
    }, function errorCallback(response) {
      $scope.errorMessage = response.data.message;
      $('#startGameError').show();
      console.log(response);
    });
  };

  $('#startGameError').hide();
  $scope.setAuthHeader();
  $scope.loadGame();


}]);
