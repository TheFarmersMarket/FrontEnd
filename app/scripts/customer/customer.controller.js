;(function (){
  
  'use strict';

  angular.module('FarmersMarket')

  .controller('CustomerCtrl', ['$rootScope', '$scope', 'CustomerFactory', '$location', "SERVER", "$cookieStore", 'UserFactory',

    function ($rootScope, $scope, CustomerFactory, $location, SERVER, $cookieStore, UserFactory) {

      // Define Scopes
      $scope.user = $cookieStore.get('currentUser');
      $scope.email = $scope.user.email;
      $scope.auth_token = $scope.user.authentication_token;
      $scope.id = $scope.user.id;
      $scope.customerID = $scope.user.customer_id;
      $scope.profileType = $scope.user.profile_type;

      sessionStorage.setItem('customerID', $scope.customerID);
      sessionStorage.setItem('auth', $scope.auth_token);

      //Refresh page method on customer factory
      CustomerFactory.refreshPage();


      //Create Profile
      $scope.createProfile = function (obj) {
        var customerObj = {customer: obj};
        CustomerFactory.createProfile(customerObj, $scope.auth_token, $scope.customerID)
          .success( function(res) {
            $location.path('/main/customer/' + $scope.customerID);
          });
      };

      // Get Customer Data
      $scope.getCustomerData = function () {
        CustomerFactory.getCustomer($scope.customerID)
          .success(function (res) {
            $scope.customerProfile = res.customer;
            $scope.avatar = res.avatar.avatar;
            console.log("Customer Profile:");
            console.log($scope.customerProfile);
            sessionStorage.setItem('customerAvatar', res.avatar.avatar);
        });
      };

      $scope.getCustomerData();

      // Get All Following
      $scope.getFollowing = function () {
        $scope.allFollowing = [];   
        CustomerFactory.getFollowing($scope.auth_token, $scope.customerID)
          .success(function (res) {
            $scope.allFollowing = res.all_following;
            console.log($scope.allFollowing);
        });
      };

      $scope.getFollowing();
      

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
        CustomerFactory.changePassword(userObj, $scope.auth_token)
          .success(function () {
            $scope.user.password = null;
            $scope.user.password_confirmation = null;
            $('.prefix').removeClass('active');
            $('.label').removeClass('active');
            $('#changePassword').closeModal();
            alert('Your password has been successfully changed.');
          });
      };

      // Open Customer Profile Modal
      $scope.openProfileModal = function () {
        $('#editProfile').openModal();
      };  

      // Edit Customer Profile Modal
      $scope.editCustomerProfile = function (userObj) {
        var customerObj = {customer: userObj};
        console.log(customerObj);
        CustomerFactory.editProfile(customerObj, $scope.auth_token, $scope.customerID)
          .success(function (res) {
            console.log(res);
            $scope.customer.contact_name = null;
            $scope.customer.business = null;
            $scope.customer.business_phone = null;
            $scope.customer.location = null;
            $scope.customer.business_email = null;
            $('.prefix').removeClass('active');
            $('.label').removeClass('active');
            $('#editCustomerProfile').closeModal();
          });
      };

      // Edit Photo Modal
      $scope.openImageModal = function () {
        $('#editPhoto').openModal();
      };

      // Upload an Image
      $scope.uploadImage = function (files) {
        var img = document.getElementById('uploadImage');
        var imgFile = img.files[0];

        CustomerFactory.editPhoto(imgFile, $scope.auth_token, $scope.customerID)
          .success( function(res) {
            $scope.getCustomerData();
            $('#editPhoto').closeModal();
          }); 
      };

      $scope.allResults = [];

      // Search
      $scope.search = function (query) {
        CustomerFactory.search(query, $scope.auth_token)
          .success( function (res) {
            if (res === []) {
              alert('no search results, try again.');
            } else {
              $scope.allResults = res.search;
              console.log($scope.allResults);
            }

          });
      };

      $scope.myCart = [];

      // Add to Cart
      $scope.addToCart = function (cropObj) {
        $('.collapsible-header').click(function(e) {
          e.stopPropagation();
        });
        
        $scope.myCart.push(cropObj);
        sessionStorage.setItem('myCart', $scope.myCart);
        console.log($scope.myCart);
        setTimeout(function () {
        }, 1500);
      };

      // Get Cart Items
      // sessionStorage.getItem('myCart');


      // Remove from Cart
      $scope.removeFromCart = function (cropID) {
        // console.log(cropID);
        for (var i = 0; i < $scope.myCart.length; i++) {
          if ($scope.myCart[i].crop_id === cropID) {
            $scope.myCart.splice(i, 1);
            return $scope.myCart;
          }
        }
      };

      // Unfollow Farmer
      $scope.unFollow = function (farmerID) {
        CustomerFactory.unFollow($scope.auth_token, $scope.customerID, farmerID)
          .success( function (res) {
            console.log("unfollow farmer");

            setTimeout(function () {
              $scope.getFollowing();
            }, 500);
          });
      };


    }

  ]);

}());