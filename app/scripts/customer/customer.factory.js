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

      // Edit Photo
      var editPhoto = function (userObj, auth, customerID) {
        SERVER.CONFIG.headers['auth-token'] = auth;
        SERVER.CONFIG.headers['Content-Type'] = undefined;
        var formData = new FormData();
        formData.append('customer[avatar]', userObj); 

        return $http.put(SERVER.URL + 'customers/' + customerID + '/pic', formData, SERVER.CONFIG);           
      };

      // Search
      var search = function (query, auth) {
        SERVER.CONFIG.headers['auth-token'] = auth;
        return $http.get(SERVER.URL + 'searches/search/?query=' + query, SERVER.CONFIG);
      };

      //Refresh Page
      var refreshPage = function () {
        
        //Load Materialize Collapsible
        $('.collapsible').collapsible({
          accordion : false
        });

        // Navigation Icon Dropdown
        $('.dropdown-button').dropdown({
          inDuration: 500,
          outDuration: 300,
          constrain_width: false, // Does not change width of dropdown to that of the activator
          hover: false, // Activate on click
          alignment: 'left', // Aligns dropdown to left or right edge (works with constrain_width)
          gutter: 0, // Spacing from edge
          belowOrigin: true // Displays dropdown below the button
        });

        //Load Materialize Select Boxes
        $('.unit-type').material_select();
        $('.currency-type').material_select();

      };

  
      return {
        getCustomer : getCustomer,
        changePassword : changePassword,
        createProfile: createProfile,
        editProfile: editProfile,
        editPhoto: editPhoto,
        refreshPage : refreshPage, 
        search: search,       
      };

    }

  ]);

}());