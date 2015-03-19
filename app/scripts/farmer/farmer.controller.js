;(function (){
  
  'use strict';

  angular.module('FarmersMarket')

  .controller('FarmerCtrl', ['$scope', 'FarmerFactory', '$location', "SERVER", "$cookieStore", 'UserFactory',

    function ($scope, FarmerFactory, $location, SERVER, $cookieStore, UserFactory) {

      // Define Scopes
      $scope.user = $cookieStore.get('currentUser');
      console.log($scope.user);
      $scope.email = $scope.user.email;
      $scope.auth_token = $scope.user.authentication_token;
      $scope.id = $scope.user.id;
      $scope.farmerID = $scope.user.farmer_id;

      FarmerFactory.refreshPage();

      // Get Farmer Data
      $scope.getFarmerData = function () {
        FarmerFactory.getFarmer($scope.farmerID)
          .success(function (res) {
            $scope.farmerProfile = res.farmer;
            $scope.avatar = res.avatar.avatar;
            console.log($scope.farmerProfile);
            console.log($scope.avatar);
        });
      };

      $scope.getFarmerData();

      // All Crops
      $scope.allCrops = [];

      //Dropdown Items
      $scope.unitTypes = [
        "per bushel", "per lb", "per sq ft"
      ];

      $scope.currencyTypes = [
        "USD", "EUR", "CAD", "GBP", "JPY", "AUD", "MXN" 
      ];

      // Create Profile
      $scope.createProfile = function (obj) {
        var farmerObj = {farmer: obj};
        FarmerFactory.createProfile(farmerObj, $scope.auth_token, $scope.farmer_id)
          .success(function (res) {
            console.log(res + " success!");
            $location.path('/main/farmer/' + $scope.farmer_id);
          });
      };
      
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

      // Edit Photo Modal
      $scope.openImageModal = function () {
        $('#editPhoto').openModal();
      };

      $scope.uploadImage = function (files) {
        var img = document.getElementById('uploadImage');
        var imgFile = img.files[0];

        FarmerFactory.editPhoto(imgFile, $scope.auth_token, $scope.id)
          .success( function(res) {
            $scope.getFarmerData();
          }); 
      };

      // Open Add Crop Modal
      $scope.openAddCropModal = function () {
        $('#addCrop').openModal();
      };

      // Add Crop
      $scope.addCrop = function (cropObj) {
        var cropObject = {crop: cropObj};
        FarmerFactory.addCrop(cropObject, $scope.auth_token, $scope.id)
          .success(function (res) {
            console.log(res);
            //close modal
            $('.label').removeClass('active');
            $scope.cropIn.crop_name = null;
            $scope.cropIn.quantity = null;
            $scope.cropIn.price = null;
            $scope.cropIn.type = null;
            $scope.cropIn.currency = null;
            $('#addCrop').closeModal();

            $scope.allCrops.push(res.crop);

            setTimeout(function () {
              $('.collapsible').collapsible({
                accordion : false
              }); 
            }, 0);
            
          });
      };



    }

  ]);

}());