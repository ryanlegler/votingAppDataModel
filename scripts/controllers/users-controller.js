votingApp.controller("usersController", ["$rootScope", "$scope", "$http", "$timeout", "$firebaseObject",
    function($rootScope, $scope, $http, $timeout, $firebaseObject) {

        $scope.user = {};
        $scope.user.email = '';
        $scope.user.password = '';
        $scope.create_error = {}
        $scope.loggedInUser = {};
        $scope.daily_goal = 2;
        var currentDate = moment().format("YYYY-MM-DD");
        $scope.offset = 0;

        $scope.calculatePickerDate = function() {

            var today_day = moment().format("DD");
            var today_month = moment().format("MM");
            var today_year = moment().format("YYYY");
            var today_calculated = moment([today_year, today_month, today_day]);

            console.log("$scope.picker_date",$scope.picker_date);

            var picker_day = moment($scope.picker_date).format("DD");
            var picker_month = moment($scope.picker_date).format("MM");
            var picker_year = moment($scope.picker_date).format("YYYY");
            var picker_calculated = moment([picker_year, picker_month, picker_day]);

            $scope.offset = today_calculated.diff(picker_calculated, 'days', true) // 1
            $scope.day_view  = $scope.picker_date

            // console.log("$scope.day_view",$scope.day_view);

            var authData = ref.getAuth();
            if (authData) {
                $firebaseObject(ref).$loaded(
                    function(data) {
                        $firebaseObject(ref.child(authData.uid)).$bindTo($scope, "profile").then(function() {
                            calculateWeekData($scope.profile);
                        });
                    }
                );
            }
        }


        // console.log("offset",moment().diff('2015-08-16', 'days'));

        function calculateWeek (offset) {
            var daysOfTheWeek = ["S","S","F","T","W","T","M"];
            var days = []
            var day = 0
            for (var i = daysOfTheWeek.length - 1; i >= 0; i--) {
                days.push({
                    'date':moment().subtract(Math.abs($scope.count + offset),'days').startOf('isoWeek').add(day,'days').format("YYYY-MM-DD"),
                    'day':daysOfTheWeek[i]
                })
                day ++
            };
            return days;
        }



        $scope.count = 0;
        $scope.day_view = currentDate;

        var ref = new Firebase("https://burning-torch-1875.firebaseio.com/profiles");


        function calculateWeekData (profile){

            $scope.currentWeek = calculateWeek($scope.offset);

            console.log("$scope.currentWeek",$scope.currentWeek);

            for (var i = $scope.currentWeek.length - 1; i >= 0; i--) {

                if(profile.drinklog[$scope.currentWeek[i].date]){
                    console.log("has drink log data");
                } else {
                    console.log("set drink log data");
                    $scope.profile.drinklog[$scope.currentWeek[i].date] = {'drinks': 0}
                }

                $scope.currentWeek[i].drinks = profile.drinklog[$scope.currentWeek[i].date].drinks;


                if($scope.currentWeek[i].date == $scope.day_view){
                    $scope.currentWeek[i].is_current_day = true;
                }

            };
            //console.log("$scope.currentWeek",$scope.currentWeek);
        }


        $scope.logDrink = function(){
            var authData = ref.getAuth();
            if (authData) {
                $firebaseObject(ref).$loaded(
                    function(data) {
                        $firebaseObject(ref.child(authData.uid)).$bindTo($scope, "profile").then(function() {
                            $scope.profile.drinklog[$scope.day_view].drinks ++;
                            calculateWeekData($scope.profile);

                        });
                    }
                );
            }
        }

        $scope.previousDay = function() {
            $scope.count --;
            $scope.day_view = moment().subtract(Math.abs($scope.count),'days').format("YYYY-MM-DD");
            if($scope.profile.drinklog[$scope.day_view] == undefined){
                $scope.profile.drinklog[$scope.day_view] = {'drinks' : 0}
            }
            calculateWeekData($scope.profile);
        }

        $scope.nextDay = function() {
            if($scope.day_view != currentDate){
               $scope.count ++;
               $scope.day_view = moment().add($scope.count,'days').format("YYYY-MM-DD");
               if($scope.profile.drinklog[$scope.day_view] == undefined){
                   $scope.profile.drinklog[$scope.day_view] = {'drinks' : 0}
               }
            }
            calculateWeekData($scope.profile)
        }




        //user crud
        //user crud
        //user crud

        //create
        $scope.userSignup = function(){

            if($scope.user.password != $scope.user.password_repeat){
                alert("error");
                return;
            }

            if($scope.user.email == ''){
                alert("error no email");
                return;
            }
            ref.createUser({
                email: $scope.user.email,
                password: $scope.user.password
            }, function(error, userData) {
                if (error) {
                console.log("error.code",error.code);
                   switch (error.code) {
                     case "EMAIL_TAKEN":
                       $scope.create_error.email = true;
                       $scope.create_error.email_message = 'The new user account cannot be created because the email is already in use.';
                       console.log("The new user account cannot be created because the email is already in use.");
                       break;
                     case "INVALID_EMAIL":

                         $timeout(function(){
                             $scope.create_error.email = true;
                             $scope.create_error.email_message = 'The specified email is not a valid email.';
                             console.log("The specified email is not a valid email.");
                         });

                       break;
                     default:
                       console.log("Error creating user:", error);
                   }
                } else {
                    console.log("Successfully created user account with uid:", userData.uid);
                    ref.authWithPassword({
                        email: $scope.user.email,
                        password: $scope.user.password
                    }, function(error, authData) {
                        if (error) {
                            console.log("error.code",error.code);
                        } else {
                            console.log("Authenticated successfully with payload:", authData);
                            generateProfileData(authData);
                        }
                    });
                }
            });
        }

        function generateProfileData (authData) {
            $scope.profiles = $firebaseObject(ref);
            $scope.profiles[authData.uid] = {};
            $scope.profiles[authData.uid].email = authData.password.email;
            $scope.profiles[authData.uid].avatar = authData.password.profileImageURL;
            $scope.profiles[authData.uid].created_date = currentDate;
            $scope.profiles[authData.uid].drinklog = {};
            $scope.profiles[authData.uid].drinklog[currentDate] = {'drinks': 0}
            $scope.profiles.$save();
            getAccount();
        }

        //retreive
        function getAccount (){

            var authData = ref.getAuth();
            if (authData) {
                $scope.logged_in = true;
                console.log("User " + authData.uid );

                $firebaseObject(ref).$loaded(
                    function(data) {
                        $firebaseObject(ref.child(authData.uid)).$bindTo($scope, "profile").then(function() {
                            calculateWeekData($scope.profile)
                        });
                    }
                );
            } else {
              console.log("User is logged out");

            }
        }


        //update email
        $scope.updateEmail = function(){
            ref.changeEmail({
              oldEmail : $scope.user.old_email,
              newEmail : $scope.user.new_email,
              password : $scope.user.password,
            }, function(error) {
              if (error === null) {
                console.log("Email changed successfully");
              } else {
                console.log("Error changing email:", error);
              }
            });
        }

        //update password
        $scope.updatePassword = function(){
            ref.changePassword({
              email       : $scope.user.email,
              oldPassword : $scope.user.old_password,
              newPassword : $scope.user.new_password
            }, function(error) {
              if (error === null) {
                console.log("Password changed successfully");
              } else {
                console.log("Error changing password:", error);
              }
            });
        }


        //delete
        $scope.deleteUser = function(){
            ref.removeUser({
                email: $scope.user.email,
                password: $scope.user.password
            }, function(error) {
              if (error === null) {
                console.log("User removed successfully");
              } else {
                console.log("Error removing user:", error);
              }
            });
        }

        //signout
        $scope.signOut = function(){
            ref.unauth();
            $scope.logged_in = false;
            $scope.user = {};
        }

        $scope.signIn = function(){
            ref.authWithPassword({
                email: $scope.user.email,
                password: $scope.user.password
            }, function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                    generateProfileData(authData);
                }
            });
        }

        //reset Password
        $scope.resetPassword = function(){
            ref.resetPassword({
                email : $scope.user.email
              }, function(error) {
              if (error === null) {
                console.log("Password reset email sent successfully");
              } else {
                console.log("Error sending password reset email:", error);
              }
            });
        }


        getAccount();

    }
]);
