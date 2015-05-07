votingApp.directive('ospreyDirective',[ "$timeout",
  function ($timeout) {
    return {
        restrict: 'EA',
        scope: {
            ngModel: '='
        },
        templateUrl: 'templates/osprey-directive.html',
        controller: 'ospreyController',
        link: function(scope, $element, $attrs) {

            var ospry = new Ospry('pk-test-r3919l2wgnqxbqruu5ylnclm');

            $element.find('#up-form').submit(function(e) {
              e.preventDefault();
              ospry.up({
                form: this,
                imageReady: function(err, metadata) {
                    scope.ngModel = metadata.url;
                    scope.$apply();
                }
              });

            });

        }//link
    }//return
}]); //directive
