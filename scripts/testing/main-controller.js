votingApp.controller('mainController', function($scope, $http, $timeout, getTimeFactory) {


    $scope.storedtime = getTimeFactory.sayHello();

    $scope.storeCurrentTime = function() {
        var now = new Date();
        $scope.current_time = {};
        $scope.current_time.minutes_hours_seconds = now.getHours() + ":" + ("0" + now.getMinutes()).slice(-2);
        $scope.current_time.date = now.getFullYear() + "-" + ("0" + (now.getMonth() + 1)).slice(-2) + "-" + ("0" + now.getDate()).slice(-2);

        var timeObject = {
            'minutesHoursSeconds': $scope.current_time.minutes_hours_seconds,
            'date': $scope.current_time.date
        };

        // Put the time object into storage
        localStorage.setItem('storedTime', JSON.stringify(timeObject));

        $scope.storedtime = getTimeFactory.sayHello();
    }

    $scope.clearStoredTime = function() {
        var timeObject = {};
        localStorage.setItem('storedTime', JSON.stringify(timeObject));
        $scope.storedtime = {};
    }

});