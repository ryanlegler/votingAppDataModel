votingApp.directive('candidatesDirective',[ "$timeout",
  function ($timeout) {
    return {
        restrict: 'EA',
        scope: {
            fields: '=',
            candidates: '='
        },
        templateUrl: 'templates/candidates-directive.html',
        controller: 'candidateDataModelController',
        link: function(scope, $element, $attrs) {
            // console.log("helllo");
        }//link
    }//return
}]); //directive
