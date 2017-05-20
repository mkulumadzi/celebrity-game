angular.module('app')
.directive('scoreboard', ['gameService', function(gameService) {

  function link(scope, element, attrs) {

    gameService.joinRoom();
    // Increment score when an attempt is added
    gameService.socket.on('attempt added', function(data) {
      console.log("SCOREBOARDDDD");
      scope.$applyAsync(function() {
        console.log(data);
        if ( data.correct ) {
          if ( data.team === 'teamA' ) {
            scope.game.teamA.score += 1;
            if (data.round === "roundOne" ) {
              scope.game.teamA.scoreSummary.roundOne += 1;
            } else if (data.round === "roundTwo" ) {
              scope.game.teamA.scoreSummary.roundTwo += 1;
            } else {
              scope.game.teamA.scoreSummary.roundThree += 1;
            }
          } else {
            scope.game.teamB.score += 1;
            if (data.round === "roundOne" ) {
              scope.game.teamB.scoreSummary.roundOne += 1;
            } else if (data.round === "roundTwo" ) {
              scope.game.teamB.scoreSummary.roundTwo += 1;
            } else {
              scope.game.teamB.scoreSummary.roundThree += 1;
            }
          }
        }
      });
    });

  }

  return {
    restrict: 'E',
    scope: {
      game: '=game'
    },
    link: link,
    templateUrl: 'app/game/scoreboard.html'
  };
}]);
