votingApp.directive('candidatemodelDirective',[ "$timeout",
  function ($timeout) {
    return {
        restrict: 'EA',
        scope: {
            fields: '='
        },
        templateUrl: 'templates/candidate-data-model-directive.html',
        controller: 'candidateDataModelController',
        link: function(scope, $element, $attrs) {

        }//link
    }//return
}]); //directive
