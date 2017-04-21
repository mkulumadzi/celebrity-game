angular.module('app')
  .controller('MainCtrl', ['$scope', '$http', '$cookies', function ($scope, $http, $cookies) {

  $scope.createGame = function() {
    $http.post('/api/games', null )
    .then(function successCallback(response) {
      $cookies.put('game', JSON.stringify(response.data));
      var game = JSON.parse($cookies.get('game'));
      console.log(game);
      console.log(game.shortId);
    }, function errorCallback(response) {
      console.log(response);
    });
  }

}]);
