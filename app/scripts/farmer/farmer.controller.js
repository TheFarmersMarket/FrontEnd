;(function (){
  
  'use strict';

  angular.module('FarmersMarket')

  .controller('FarmerCtrl', ['$scope', 'FarmerFactory', '$location', "SERVER", "$cookieStore", 'UserFactory',

    function ($scope, FarmerFactory, $location, SERVER, $cookieStore, UserFactory) {

      // Define Scopes
      $scope.user = $cookieStore.get('currentUser');
      $scope.email = $scope.user.email;
      $scope.auth_token = $scope.user.authentication_token;
      $scope.id = $scope.user.id;
      $scope.farmerID = $scope.user.farmer_id;
      $scope.profileType = $scope.user.profile_type;

      // Refresh page method on farmer factory
      FarmerFactory.refreshPage();


     // Create Profile
      $scope.createProfile = function (obj) {
        var farmerObj = {farmer: obj};
        FarmerFactory.createProfile(farmerObj, $scope.auth_token, $scope.farmerID)
          .success(function (res) {
            console.log(res + " success!");
            $location.path('/main/farmer/' + $scope.farmerID);
          });
      };


      // Get Farmer Data
      $scope.getFarmerData = function () {
        FarmerFactory.getFarmer($scope.farmerID)
          .success(function (res) {
            $scope.farmerProfile = res.farmer;
            console.log("Farmer Profile");
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
        "unit", "bushel", "lb"
      ];

      //Filter Items
      $scope.filterTypes = [
        "harvest date", "price ascending", "price descending"
      ];

      $scope.currencyTypes = [
        "USD", "EUR", "CAD"
      ];
      
      // Delete User
      $scope.deleteUser = function () {
        var person  = window.prompt('Please type in "delete" if you are certain about deleting this account?');
        if (person === 'delete') {
          // var userObj = {user: {}};
          UserFactory.deleteUser($scope.auth_token)
          .success( function() {
            console.log('account successfully deleted');
            $cookieStore.remove('auth_token');
            $cookieStore.remove('currentUser');
            $('#editProfile').closeModal();
            alert('Your account has been successfully deleted.');
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
            alert('Your password has been successfully changed.');
          });
      };

      
      // Open Farmer Profile Modal
      $scope.openProfileModal = function () {
        $('#editProfile').openModal();
      };  

      // Edit Farmer Profile
      $scope.editFarmerProfile = function (userObj) {
        var farmerObj = {farmer: userObj};
        console.log(farmerObj);
        FarmerFactory.editProfile(farmerObj, $scope.auth_token, $scope.farmerID)
          .success(function () {
            setTimeout(function () {
              $scope.getFarmerData();
            }, 100);

            setTimeout(function () {
              $scope.farmer.farm = null;
              $scope.farmer.location = null;
              $scope.farmer.business_phone = null;
              $scope.farmer.crop_names = null;
              $('.prefix').removeClass('active');
              $('.label').removeClass('active');
              $('#editProfile').closeModal();
            }, 500);

          });
      };


      // Open EditCrop Modal
      $scope.openEditCropModal = function (cropID) {
        $scope.currentCropID = cropID;
        $('#editCropModal').openModal();
      };  

      

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
        FarmerFactory.getCrops($scope.farmerID)
          .success( function (res) {
            $scope.allCrops = res.crops;
            console.log($scope.allCrops);
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
        var img = document.getElementById('addCropImage');
        var cropImg = img.files[0];
        console.log(cropObj);

        FarmerFactory.addCrop(cropObj, cropImg, $scope.auth_token, $scope.farmerID)
          .success(function (res) {
            console.log("add crop");
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
            toast('<span>The crop was successfully added.</span>', 3000);

            setTimeout(function () {
              $scope.getCrops();
            }, 100);            
          
          });
      };

      // Edit Crop
      $scope.editCrop = function (cropObj) {
        if (cropObj === undefined) {
          cropObj = {};
        }
        var img = document.getElementById('editCropImage');
        var cropImg = img.files[0];
        console.log(cropObj);
        console.log(cropImg);

        FarmerFactory.edit(cropObj, cropImg, $scope.auth_token, $scope.currentCropID)
          .success(function (res) {
            console.log("edited crop");
            console.log(res);
            //close modal
            $('.label').removeClass('active');
            $scope.cropIn.crop_name = null;
            $scope.cropIn.quantity = null;
            $scope.cropIn.price = null;
            $scope.cropIn.type = null;
            $scope.cropIn.currency = null;
            $('#editCropModal').closeModal();
            toast('<span>The crop was successfully edited.</span>', 3000);

            setTimeout(function () {
              $scope.getCrops();
            }, 100);

          });
      };

      // Delete Crop
      $scope.deleteCrop = function (cropID) {
        var deleteThis = confirm("Are you certain you want to delete this crop?");
        
        if (deleteThis === true) {
          FarmerFactory.deleteCrop(cropID, $scope.auth_token, $scope.farmerID)
            .success(function () {
              setTimeout(function () {
                $scope.getCrops();
              }, 100);

              toast('<span>The crop was successfully deleted.</span>', 3000);
            });
        }

      };


    }

  ]);

}());