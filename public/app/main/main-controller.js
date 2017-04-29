angular.module('app')
  .controller('MainCtrl', ['$scope', '$http', '$cookies', '$location', function ($scope, $http, $cookies, $location) {

  $scope.createGame = function() {
    $http.post('/api/games', null )
    .then(function successCallback(response) {
      var game = response.data
      $cookies.put('game', JSON.stringify(game));
      $location.path( '/start' );
    }, function errorCallback(response) {
      console.log(response);
    });
  }

}]);
