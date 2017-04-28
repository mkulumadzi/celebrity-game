angular.module('app')
  .controller('AddCelebrityCtrl', ['$scope', '$http', '$cookies', '$stateParams', function ($scope, $http, $cookies, $stateParams) {

  $scope.celebritiesAdded = []

  $scope.playerName = JSON.parse($cookies.get('player')).name;

  $scope.setAuthHeader = function() {
    var playerId = JSON.parse($cookies.get('player'))._id;
    $http.defaults.headers.common.Authorization = 'Bearer ' + playerId;
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

}]);
