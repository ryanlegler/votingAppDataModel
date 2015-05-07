// votingApp.factory('getTimeFactory', function () {


// }); //factory



//Factory style, more involved but more sophisticated
votingApp.factory('getTimeFactory', function() {
    return {
        sayHello: function() {
            if (localStorage.getItem('storedTime')) {
                var time = {};
                var rawtime = JSON.parse(localStorage.getItem('storedTime'));
                time.minutesHoursSeconds = rawtime.minutesHoursSeconds;
                time.date = rawtime.date;
            } else {
                var time = "no stored time"
            }

            return time;
        }
    };
});




// var getTimeRange = function () {

//     if (localStorage.getItem('storedTime')) {
//         console.log("FOUND STORED DATA");
//         var retrievedObject = JSON.parse(localStorage.getItem('storedTime'));

//         $scope.starttime.minutesHoursSeconds = retrievedObject.minutesHoursSeconds;
//         $scope.starttime.date = retrievedObject.date;

//     } else {
//         console.log("NO STORED DATA");

//         //grab time to set initial "now" state
//         var now = new Date();
//         $scope.starttime.minutesHoursSeconds = now.getHours() + ":" + ("0" + now.getMinutes()).slice(-2);
//         $scope.starttime.date = now.getFullYear() + "-" + ("0" + (now.getMonth() + 1)).slice(-2) + "-" + ("0" + now.getDate()).slice(-2);
//     }
// }


// $scope.setCustomStart = function () {

//     //setup time object
//     var timeObject = {
//         'minutesHoursSeconds': $scope.starttime.minutesHoursSeconds,
//         'date': $scope.starttime.date
//     };

//     // Put the object into storage
//     localStorage.setItem('storedTime', JSON.stringify(timeObject));

//     // Retrieve the object from storage
//     var retrievedObject = localStorage.getItem('storedTime');

//     $scope.getCountsData();
//     setRefreshRate();
// }



// angular.module('votingApp', [])
//   .factory('githubService', ['$http', function($http) {

//     var doRequest = function(username, path) {
//       return $http({
//         method: 'JSONP',
//         url: 'https://api.github.com/users/' + username + '/' + path + '?callback=JSON_CALLBACK'
//       });
//     }
//     return {
//       events: function(username) { return doRequest(username, 'events'); },
//     };
//   }]);