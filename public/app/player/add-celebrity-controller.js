angular.module('app')
  .controller('AddCelebrityCtrl', ['$scope', '$http', '$cookies', '$stateParams', '$location', 'playerService', '$timeout', function ($scope, $http, $cookies, $stateParams, $location, playerService, $timeout) {

  $scope.celebritiesAdded = []
  $scope.player = playerService.player;

  playerService.setAuthHeader();
  playerService.joinRooms();

  $scope.addCelebrity = function() {
    $http.post('/api/celebrity', $scope.formData)
    .then(function successCallback(response) {
      $scope.celebritiesAdded.push(response.data);
      $scope.resetForm(form);
    }, function errorCallback(response) {
      $scope.errorMessage = response.data.message;
      $scope.form.$setUntouched();
      $timeout(function() {
        $scope.errorMessage = '';
      }, 2000);
    });
  }

  $scope.resetForm = function() {
    $scope.form.$setPristine();
    $scope.formData = {};
  }

  playerService.socket.on('game started', function(data) {
    $scope.$applyAsync(function () {
      $location.path( '/play' );
    });
  });

}]);
