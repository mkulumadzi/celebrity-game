angular.module('app')
.directive('teamSummary', function() {
  return {
    restrict: 'E',
    scope: {
      team: '=info'
    },
    templateUrl: 'app/game/team-summary.html'
  };
});
