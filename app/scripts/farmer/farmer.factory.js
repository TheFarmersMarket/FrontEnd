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

      // Create Profile
      var createProfile = function (farmerObj, auth, farmerID) {
        console.log(farmerObj);
        SERVER.CONFIG.headers['auth-token'] = auth;
        return $http.put(SERVER.URL + 'farmers/' + farmerID, farmerObj, SERVER.CONFIG);
      };

      // Edit Profile
      var editProfile = function (farmerObj, auth, farmerID) {
        console.log(farmerObj);
        SERVER.CONFIG.headers['auth-token'] = auth;
        console.log(SERVER.CONFIG.headers);
        return $http.put(SERVER.URL + 'farmers/' + farmerID, farmerObj, SERVER.CONFIG);           
      };

      // Edit Photo
      var editPhoto = function (userObj, auth, farmerID) {
        SERVER.CONFIG.headers['auth-token'] = auth;
        SERVER.CONFIG.headers['Content-Type'] = undefined;
        var formData = new FormData();
        formData.append('farmer[avatar]', userObj);
        return $http.put(SERVER.URL + 'farmers/' + farmerID + '/pic', formData, SERVER.CONFIG);           
      };

      // Get Crops
      var getCrops = function (farmerID) {
        return $http.get(SERVER.URL + 'farmers/' + farmerID + '/crops');
      };

      // Add Crop
      var addCrop = function (cropObj, cropImg, auth, farmerID) {
        SERVER.CONFIG.headers['auth-token'] = auth;
        SERVER.CONFIG.headers['Content-Type'] = undefined;
        
        var formData = new FormData();
        formData.append('crop[avatar]', cropImg);
        formData.append('crop[crop_name]', cropObj.crop_name);
        formData.append('crop[quantity]', cropObj.quantity);
        formData.append('crop[price]', cropObj.price);
        formData.append('crop[currency]', cropObj.currency);
        formData.append('crop[unit]', cropObj.unit);

        return $http.post(SERVER.URL + 'crops', formData, SERVER.CONFIG);           
      };

      // Edit Crop
      var editCrop = function (cropObj, cropImg, auth, cropID) {
        SERVER.CONFIG.headers['auth-token'] = auth;
        SERVER.CONFIG.headers['Content-Type'] = undefined;

        var formData = new FormData();
        formData.append('crop[avatar]', cropImg);
        formData.append('crop[crop_name]', cropObj.crop_name);
        formData.append('crop[quantity]', cropObj.quantity);
        formData.append('crop[price]', cropObj.price);
        formData.append('crop[currency]', cropObj.currency);
        formData.append('crop[unit]', cropObj.unit);

        return $http.put(SERVER.URL + 'crops/' + cropID, formData, SERVER.CONFIG);
      };

      // Delete Crop
      var deleteCrop = function (cropID, auth, farmerID) {
        SERVER.CONFIG.headers['auth-token'] = auth;        
        return $http.delete(SERVER.URL + 'crops/' + cropID, SERVER.CONFIG);
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
        createProfile: createProfile,
        editProfile: editProfile,
        getCrops: getCrops,
        addCrop : addCrop,
        refreshPage : refreshPage,
        editPhoto: editPhoto,
        deleteCrop: deleteCrop,
        edit: editCrop,
      };

    }

  ]);

}());