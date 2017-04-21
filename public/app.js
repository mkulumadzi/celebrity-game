var celebrityGame = angular.module('celebrityGame', []);

function gameController($scope, $http) {

  $scope.startGame = function() {
    $http.post('/api/games', null )
    .success(function(data) {
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data );
    })
  }

}
