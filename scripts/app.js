var votingApp = angular.module('votingApp', ['ngRoute']);

// configure our routes
votingApp.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'templates/candidates.html',
            controller  : 'candidateDataModelController'
        })
        .otherwise({ redirectTo: '/' });
});