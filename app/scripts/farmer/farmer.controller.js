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

      // Refresh page method on farmer factory
     FarmerFactory.refreshPage();


      // Get Farmer Data
      $scope.getFarmerData = function () {
        FarmerFactory.getFarmer($scope.farmerID)
          .success(function (res) {
            $scope.farmerProfile = res.farmer;
            console.log($scope.farmerProfile);
            $scope.avatar = res.avatar.avatar;
        });
      };

      //Get Farmer Data from Server
      $scope.getFarmerData();

      // All Crops
      $scope.allCrops = [];

      //Dropdown Items
      $scope.unitTypes = [
        "per bushel", "per lb", "per sq ft"
      ];

      //Filter Items
      $scope.filterTypes = [
        "harvest date", "price ascending", "price descending"
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

      // Edit Farmer Profile Modal
      $scope.editFarmerProfile = function (userObj) {
        var farmerObj = {farmer: userObj};
        console.log(farmerObj);
        FarmerFactory.editProfile(farmerObj, $scope.auth_token, $scope.farmerID)
          .success(function () {
            $('.prefix').removeClass('active');
            $('.label').removeClass('active');
            $('#editProfile').closeModal();
          });
      };

      // Open EditCrop Modal
      $scope.openEditCropModal = function (cropID) {
        $scope.currentCropID = cropID;
        $('#editCropModal').openModal();
      };  

      // // Edit Crop Modal
      // $scope.editCropModal = function (userObj) {
      //   var farmerObj = {farmer: userObj};
      //   console.log(farmerObj);
      //   FarmerFactory.editProfile(farmerObj, $scope.auth_token, $scope.id)
      //     .success(function () {
      //       $('.prefix').removeClass('active');
      //       $('.label').removeClass('active');
      //       $('#editProfile').closeModal();
      //     });
      // };

      // Edit Photo Modal
      $scope.openImageModal = function () {
        $('#editPhoto').openModal();
      };

      // Upload an Image
      $scope.uploadImage = function (files) {
        var img = document.getElementById('uploadImage');
        var imgFile = img.files[0];

        FarmerFactory.editPhoto(imgFile, $scope.auth_token, $scope.farmerID)
          .success( function(res) {
            $scope.getFarmerData();
            $('#editPhoto').closeModal();
          }); 
      };

      // Open Add Crop Modal
      $scope.openAddCropModal = function () {
        $('#addCrop').openModal();
      };

      // Get Crops
      $scope.getCrops = function () {
        FarmerFactory.getCrops($scope.id)
          .success( function (res) {
            $scope.allCrops = res.crops;

            setTimeout(function () {
              $('.collapsible').collapsible({
                accordion : false
              }); 
            }, 0);

          });
      };

      $scope.getCrops();


      // Add Crop
      $scope.addCrop = function (cropObj) {
        var cropObject = {crop: cropObj};
        console.log(cropObj.avatar);
        console.log(cropObj.price);

        FarmerFactory.addCrop(cropObject, $scope.auth_token, $scope.farmerID)
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
            $scope.cropAvatar = res.crop.avatar;

            $scope.allCrops.push(res.crop);

            setTimeout(function () {
              $('.collapsible').collapsible({
                accordion : false
              }); 
            }, 0);
            
          });
      };

      // Delete Crop
      $scope.deleteCrop = function (cropID) {
        var deleteThis = confirm("Are you certain you want to delete this crop?");
        
        if (deleteThis === true) {
          FarmerFactory.deleteCrop(cropID, $scope.auth_token, $scope.farmerID)
            .success(function () {
              console.log('crop deleted from server!');
            });
        }

        $scope.getCrops();

      };

      // Edit Crop
      $scope.editCrop = function (cropObj) {
        FarmerFactory.edit(cropObj, $scope.auth_token, $scope.currentCropID)
          .success(function () {
            console.log('crop edited on server');
          });

        $scope.getCrops();

      };





    }

  ]);

}());