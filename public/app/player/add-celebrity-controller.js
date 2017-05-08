angular.module('app')
  .controller('AddCelebrityCtrl', ['$scope', '$http', '$cookies', '$stateParams', '$location', function ($scope, $http, $cookies, $stateParams, $location) {

  var socket = io('http://192.168.99.100:8080');

  $scope.celebritiesAdded = []

  $scope.player = JSON.parse($cookies.get('player'));

  $scope.setAuthHeader = function() {
    $http.defaults.headers.common.Authorization = 'Bearer ' + $scope.player._id;
  }

  $scope.addCelebrity = function() {
    $http.post('/api/celebrity', $scope.formData)
    .then(function successCallback(response) {
      $scope.celebritiesAdded.push(response.data);
      console.log($scope.celebritiesAdded);
    }, function errorCallback(response) {
      console.log(response);
    });
  }

  $scope.setAuthHeader();

  // Connected to the game room
  socket.on('connect', function() {
    socket.emit('room', $scope.player.game);
  });

  socket.on('game started', function(data) {
    $scope.$applyAsync(function () {
      $location.path( '/play' );
    });
  });

}]);
