votingApp.directive('candidatesDirective',[ "$timeout", "votingModel",
  function ($timeout, votingModel) {
    return {
        restrict: 'EA',
        scope: {
            fields: '='
        },
        templateUrl: 'templates/candidates-directive.html',
        controller: 'candidateDataModelController',
        link: function(scope, $element, $attrs) {
            scope.candidates = votingModel.candidates;
        }//link
    }//return
}]); //directive
