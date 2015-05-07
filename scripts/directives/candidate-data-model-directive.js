votingApp.directive('candidatemodelDirective',[ "$timeout", "votingModel",
  function ($timeout, votingModel) {
    return {
        restrict: 'EA',
        templateUrl: 'templates/candidate-data-model-directive.html',
        controller: 'candidateDataModelController',
        link: function(scope, $element, $attrs) {
            scope.fields = votingModel.fields;
        }//link
    }//return
}]); //directive
