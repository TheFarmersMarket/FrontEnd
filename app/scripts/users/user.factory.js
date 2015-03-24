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

      // Delete User
      var deleteUser = function (auth) {
        SERVER.CONFIG.headers['auth-token'] = auth;
        return $http.delete(SERVER.URL + 'users', SERVER.CONFIG); 
      };
  
      return {
        register : registerUser,
        login : loginUser,
        logout : logoutUser,
        setCookies: setCookies,
        deleteUser: deleteUser
      };

    }

  ]);

}());