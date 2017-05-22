angular.module('app')
.directive('gameDirections', function() {

  return {
    restrict: 'E',
    scope: {
      game: '=game'
    },
    templateUrl: 'app/game/game-directions.html'
  };
});
