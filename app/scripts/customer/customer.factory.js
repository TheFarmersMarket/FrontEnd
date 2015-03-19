;(function (){
  
  'use strict';

  angular.module('FarmersMarket')

  .factory('CustomerFactory', ['$http', 'SERVER', '$cookieStore', '$location',

    function ($http, SERVER, $cookieStore, $location) {

      // Get Customer
      var getCustomer = function (customerID) { 
        return $http.get(SERVER.URL + 'customers/' + customerID);
      };

      // Change Password
      var changePassword = function (userObj, auth) {
        SERVER.CONFIG.headers['auth-token'] = auth;
        console.log(SERVER.CONFIG.headers);
        return $http.put(SERVER.URL + 'users/password', userObj, SERVER.CONFIG);           
      };

      // Create Profile
      var createProfile = function (customerObj, auth, customerID) {
        console.log(customerObj);
        SERVER.CONFIG.headers['auth-token'] = auth;
        return $http.put(SERVER.URL + 'customers/' + customerID, customerObj, SERVER.CONFIG);
      };

      // Edit Profile
      var editProfile = function (userObj, auth, customerID) {
        SERVER.CONFIG.headers['auth-token'] = auth;
        return $http.put(SERVER.URL + 'customers/' + customerID, userObj, SERVER.CONFIG);
           
      };

  
      return {
        getCustomer : getCustomer,
        changePassword : changePassword,
        createProfile: createProfile,
        editProfile: editProfile        
      };

    }

  ]);

}());