;(function (){
  
  'use strict';

  angular.module('FarmersMarket')

  .factory('UserFactory', ['$http', 'SERVER', '$cookieStore', '$location',

    function ($http, SERVER, $cookieStore, $location) {

      // Register a User
      var registerUser = function (userObj) {
        return $http.post(SERVER.URL + 'users', userObj, SERVER.CONFIG);           
      };

      // Login a User
      var loginUser = function (userObj) {        
        return $http.post(SERVER.URL + 'users/sign_in', userObj);                       
      };

      // Set Cookies
      var setCookies = function (res) {
        $cookieStore.put('auth_token', res.user.authentication_token);
        $cookieStore.put('currentUser', res.user);
        console.log('set cookies');
      };

      // Logout a User
      var logoutUser = function () { 
        $cookieStore.remove('auth_token');
        $cookieStore.remove('currentUser');
        $location.path('/login');        
      };

      // // Add a Crop
      // var addACrop = function (teamObj) {

      //   return $http.post(SERVER.URL + 'teams/', teamObj, {
      //     params: {
      //       auth_token: $cookieStore.get('auth_token')
      //     }
      //   });              
      // };

      // var getAllTeams = function () {
      //   return $http.get(SERVER.URL + 'user', {
      //     params: {
      //       auth_token: $cookieStore.get('auth_token')
      //     }
      //   });
      // };
  
      return {
        register : registerUser,
        login : loginUser,
        logout : logoutUser,
        setCookies: setCookies,
        // getTeams : getAllTeams
      };

    }

  ]);

}());