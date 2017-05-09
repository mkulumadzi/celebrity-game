angular.module('app')
  .controller('AddCelebrityCtrl', ['$scope', '$http', '$cookies', '$stateParams', '$location', 'playerService', function ($scope, $http, $cookies, $stateParams, $location, playerService) {

  $scope.celebritiesAdded = []
  $scope.player = playerService.player;

  playerService.setAuthHeader();
  playerService.joinRooms();

  $scope.addCelebrity = function() {
    $http.post('/api/celebrity', $scope.formData)
    .then(function successCallback(response) {
      $scope.celebritiesAdded.push(response.data);
      console.log($scope.celebritiesAdded);
    }, function errorCallback(response) {
      console.log(response);
    });
  }

  playerService.socket.on('game started', function(data) {
    $scope.$applyAsync(function () {
      $location.path( '/play' );
    });
  });

}]);
