;(function (){
  
  'use strict';

  angular.module('FarmersMarket')

  .controller('UserCtrl', ['$scope', 'UserFactory', '$location', "SERVER", "$cookieStore",

    function ($scope, UserFactory, $location, SERVER, $cookieStore) {

      $scope.user = {};

     
      // Register Method
      $scope.registerUser = function (userObj) {
        UserFactory.register({user: userObj})
          .success( function (res) {
            // console.log(res);
            $scope.user = res.user;
            $cookieStore.put('auth_token', res.user.authentication_token);
            $cookieStore.put('currentUser', res.user);
            $location.path('/main/' + res.user.profile_type + '/' + res.user.id);
            }
          );
      };

      // Login Method
      $scope.loginUser = function (userObj) {
        UserFactory.login({user: userObj})  
          .success( function (res) {
            $scope.user = res.user;
            $cookieStore.put('auth_token', res.user.authentication_token);
            $cookieStore.put('currentUser', res.user);
            $location.path('/main/' + res.user.profile_type + '/' + res.user.id);
              // $scope.user = res.user;
              // $cookieStore.put('auth_token', res.user.authentication_token);
              // $cookieStore.put('currentUser', res.user);
              // $location.path('/yourteams/' + res.user.id);
              // $scope.allTeams = res.teams;
              // console.log($scope.allTeams);
            }
          );  

      };

      // // Add Crop Method
      // $scope.addCrop = function (cropObj) {
      //   // console.log(userObj);
      //   UserFactory.addTeam({crop: cropObj})
      //     .success( function (res) {
      //       console.log(res);
      //       var user = $cookieStore.get('currentUser');
      //       $location.path('/yourteams/' + user.id);
      //       }
      //     ); 

      // };


      // UserFactory.getTeams()
      //   .success( function (res) {
      //     $scope.allTeams = res.teams;
      //   });
    
    }

  ]);

}());