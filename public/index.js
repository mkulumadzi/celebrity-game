angular.module('celebrity', ['app'])
.run([function () {
}])
.controller('IndexCtrl', ['$scope', '$location', function ($scope, $location) {

  $scope.rulesUrl = window.location.protocol + "//" + window.location.host + "/rules";

  $scope.redirectToRules = function () {
    window.open($scope.rulesUrl, '_blank');
  };

}]);
