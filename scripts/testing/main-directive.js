votingApp.directive('testDirective',[ "$timeout",
  function ($timeout) {
    return {
        restrict: 'EA',
        scope: {
            myname: '='
        },
        template: '<h1>template{{myname}}</h1>',
        link: function(scope, $element, $attrs) {
            // console.log("scope.myname",scope.myname);
        }//link
    }//return
}]); //directive
