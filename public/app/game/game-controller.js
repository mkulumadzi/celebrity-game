angular.module('app')
  .controller('GameCtrl', ['$scope', '$http', '$cookies', function ($scope, $http, $cookies) {

  $scope.setAuthHeader = function() {
    var gameId = JSON.parse($cookies.get('game'))._id;
    $http.defaults.headers.common.Authorization = 'Bearer ' + gameId;
  }

  // Load data
  $scope.loadGame = function() {
    $scope.shortId = JSON.parse($cookies.get('game')).shortId;
    console.log($scope.shortId);
    $scope.setAuthHeader();
    $http.get('/api/game')
    .then(function successCallback(response) {
      console.log(response);
    }, function errorCallback(response) {
      console.log(response);
    });
  };

  $scope.loadGame();


}]);
