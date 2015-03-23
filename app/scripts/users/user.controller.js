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
            UserFactory.setCookies(res);
            $location.path('/' + res.user.profile_type + '/create-profile');
            $scope.user = $cookieStore.get('currentUser');
            //RETURNS id, email, authentication_token, profile_type, farmer_id
          });
      };

      // Login Method
      $scope.loginUser = function (userObj) {
        UserFactory.login({user: userObj})  
          .success( function (res) {
            console.log(res);
            UserFactory.setCookies(res);
            $location.path('/main/' + res.user.profile_type + '/' + (res.user.farmer_id || res.user.customer_id));
          })
          .error( function (res) {
            console.log("FAILED");
            toast('<span>Oops... wrong password?</span>', 4000);
          });
      };

      
    
    }

  ]);

}());