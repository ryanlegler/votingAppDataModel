var votingApp = angular.module('votingApp', ['ngRoute', 'ngAnimate', 'firebase']);

// configure our routes
votingApp.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'templates/users.html',
            controller  : 'usersController'
        }).when('/createuser', {
            templateUrl : 'templates/createuser.html',
            controller  : 'usersController'
        })
        .otherwise({ redirectTo: '/' });
});
