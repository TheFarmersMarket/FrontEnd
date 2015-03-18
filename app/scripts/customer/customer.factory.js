;(function (){
  
  'use strict';

  angular.module('FarmersMarket')

  .factory('CustomerFactory', ['$http', 'SERVER', '$cookieStore', '$location',

    function ($http, SERVER, $cookieStore, $location) {

      // Change Password
      var changePassword = function (userObj, auth) {
        SERVER.CONFIG.headers['auth-token'] = auth;
        console.log(SERVER.CONFIG.headers);
        return $http.put(SERVER.URL + 'users/password', userObj, SERVER.CONFIG);
           
      };

      // Edit Profile
      var editProfile = function (userObj, auth, customerID) {
        SERVER.CONFIG.headers['auth-token'] = auth;
        console.log(SERVER.CONFIG.headers);
        return $http.put(SERVER.URL + 'customers/' + customerID, userObj, SERVER.CONFIG);
           
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
        changePassword : changePassword,
        editProfile: editProfile,
        // getTeams : getAllTeams
      };

    }

  ]);

}());