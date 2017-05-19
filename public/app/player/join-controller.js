angular.module('app')
  .controller('JoinGameCtrl', ['$scope', '$http', '$cookies', '$stateParams', '$location', function ($scope, $http, $cookies, $stateParams, $location) {

  $scope.joinGame = function() {
    $scope.formData.shortId = $stateParams.id;
    $http.post('/api/join', $scope.formData)
    .then(function successCallback(response) {
      var player = response.data
      $cookies.put('player', JSON.stringify(player));
      $cookies.put('game', JSON.stringify(player.game));
      $location.path("/celebrity");
    }, function errorCallback(response) {
      $scope.errorMessage = response.data.message;
      $scope.form.$setUntouched();
    });
  }

}]);
