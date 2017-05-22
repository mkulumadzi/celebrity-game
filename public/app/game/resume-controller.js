angular.module('app')
  .controller('ResumeGameCtrl', ['$scope', '$http', '$cookies', '$stateParams', '$location', '$timeout', function ($scope, $http, $cookies, $stateParams, $location, $timeout) {

  $scope.findGame = function() {
    var shortId = $scope.formData.shortId.toUpperCase();
    $http.get('/api/game?shortId=' + shortId)
    .then(function successCallback(response) {
      var game = response.data
      $cookies.put('game', JSON.stringify({_id: game._id, shortId: game.shortId}));
      if ( game.phase === "new" ) {
        $location.path( '/start' );
      } else {
        $location.path( '/game' );
      }
    }, function errorCallback(response) {
      $scope.errorMessage = response.data.message;
      $scope.form.$setUntouched();
      $timeout(function() {
        $scope.errorMessage = '';
      }, 2000);
    });
  }

}]);
