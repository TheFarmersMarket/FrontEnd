;(function (){
  
  'use strict';

  angular.module('FarmersMarket')

  .controller('FarmerCtrl', ['$scope', 'FarmerFactory', '$location', "SERVER", "$cookieStore", 'UserFactory',

    function ($scope, FarmerFactory, $location, SERVER, $cookieStore, UserFactory) {

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

      $('.unit-type').material_select();
      $('.currency-type').material_select();

      //Dropdowns
      $scope.unitTypes = [
        "per bushel", "per lb", "per sq ft"
      ];

      $scope.currencyTypes = [
        "USD", "EUR", "CAD", "GBP", "JPY", "AUD", "MXN" 
      ];

    
      // Define Scopes
      $scope.user = $cookieStore.get('currentUser');
      console.log($scope.user);
      $scope.email = $scope.user.email;
      $scope.auth_token = $scope.user.authentication_token;
      $scope.id = $scope.user.id;

      
      // Delete Account
      $scope.deleteAccount = function () {
        var person  = window.prompt('Please type in "delete" if you are certain about deleting this account?');
        if (person === 'delete') {
          var userObj = {user: {}};
          UserFactory.deleteAccount()
          .success( function() {
            console.log('account successfully deleted');
            $cookieStore.remove('auth_token');
            $cookieStore.remove('currentUser');
            $location.path('/login');
          });
        } else {
          alert("Your account was not deleted because you did not type 'delete' correctly.");
        }
      };

      // Logout
      $scope.logoutUser = function () {
        UserFactory.logout();
      };


      //Modals

      // Define Load Modal
      $scope.loadModal = function() {
        $('.modal-trigger').leanModal();
      };
      // Launch Load Modal 
      $scope.loadModal();
 
      // Open Password Modal
      $scope.openPasswordModal = function () {
        $('#changePassword').openModal();
      };

      // Change Password Modal
      $scope.changePassword = function (userObj) {
        userObj = {user: {password_confirmation: userObj.password_confirmation, password: userObj.password}};
        console.log(userObj);
        FarmerFactory.changePassword(userObj, $scope.auth_token)
          .success(function () {
            $scope.user.password = null;
            $scope.user.password_confirmation = null;
            $('.prefix').removeClass('active');
            $('.label').removeClass('active');
            $('#changePassword').closeModal();
          });
      };

      // Open Profile Modal
      $scope.openProfileModal = function () {
        $('#editProfile').openModal();
      };  

      // Edit Profile Modal
      $scope.editFarmerProfile = function (userObj) {
        var farmerObj = {farmer: userObj};
        console.log(farmerObj);
        FarmerFactory.editProfile(farmerObj, $scope.auth_token, $scope.id)
          .success(function () {
            $scope.farmer.farm = null;
            $scope.farmer.location = null;
            $scope.farmer.business_phone = null;
            $scope.farmer.crop_names = null;
            $('.prefix').removeClass('active');
            $('.label').removeClass('active');
            $('#editProfile').closeModal();
          });
      };

      // Open Add Crop Modal
      $scope.openAddCropModal = function () {
        $('#addCrop').openModal();
      };

      // Add Crop
      $scope.addCrop = function (cropObj) {
        var cropObject = {crop: cropObj};
        console.log(cropObject);
        FarmerFactory.addCrop(cropObject, $scope.auth_token, $scope.id)
          .success(function (res) {
            console.log(res);
        //     $scope.farmer.farm = null;
        //     $scope.farmer.location = null;
        //     $scope.farmer.business_phone = null;
        //     $scope.farmer.crop_names = null;
        //     $('.prefix').removeClass('active');
        //     $('.label').removeClass('active');
        //     $('#editProfile').closeModal();
          });
      };


    }

  ]);

}());