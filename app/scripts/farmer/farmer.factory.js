;(function (){
  
  'use strict';

  angular.module('FarmersMarket')

  .factory('FarmerFactory', ['$http', 'SERVER', '$cookieStore', '$location',

    function ($http, SERVER, $cookieStore, $location) {

      // Get Farmer
      var getFarmer = function (farmerID) { 
        return $http.get(SERVER.URL + 'farmers/' + farmerID);
      };

      // Change Password
      var changePassword = function (userObj, auth) {
        SERVER.CONFIG.headers['auth-token'] = auth;
        console.log(SERVER.CONFIG.headers);
        return $http.put(SERVER.URL + 'users/password', userObj, SERVER.CONFIG);           
      };

      // Edit Profile
      var editProfile = function (userObj, auth, farmerID) {
        SERVER.CONFIG.headers['auth-token'] = auth;
        console.log(SERVER.CONFIG.headers);
        return $http.put(SERVER.URL + 'farmers/' + farmerID, userObj, SERVER.CONFIG);           
      };

      // Edit Photo
      var editPhoto = function (userObj, auth, farmerID) {
        SERVER.CONFIG.headers['auth-token'] = auth;
        SERVER.CONFIG.headers['Content-Type'] = undefined;
        var formData = new FormData();
        formData.append('farmer[avatar]', userObj);

        // var formData = {farmer: {avatar: userObj}};

        return $http.put(SERVER.URL + 'farmers/' + farmerID, formData, SERVER.CONFIG);           
      };

      // Add Crop
      var addCrop = function (cropObj, auth, farmerID) {
        SERVER.CONFIG.headers['auth-token'] = auth;
        return $http.post(SERVER.URL + 'crops', cropObj, SERVER.CONFIG);           
      };

      
      var refreshPage = function () {
        
        // Load Materialize Collapsible
        $('.collapsible').collapsible({
          accordion : false
        });

        // Load Navigation Icon
        $('.dropdown-button').dropdown({
          inDuration: 500,
          outDuration: 300,
          constrain_width: false, // Does not change width of dropdown to that of the activator
          hover: false, // Activate on click
          alignment: 'left', // Aligns dropdown to left or right edge (works with constrain_width)
          gutter: 0, // Spacing from edge
          belowOrigin: true // Displays dropdown below the button
        });

        // Load Materialize Select Boxes
        $('.unit-type').material_select();
        $('.currency-type').material_select();



      };
  
      return {
        getFarmer : getFarmer,
        changePassword : changePassword,
        editProfile: editProfile,
        addCrop : addCrop,
        refreshPage : refreshPage,
        editPhoto: editPhoto
      };

    }

  ]);

}());