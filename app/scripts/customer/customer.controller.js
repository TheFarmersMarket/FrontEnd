;(function (){
  
  'use strict';

  angular.module('FarmersMarket')

  .controller('CustomerCtrl', ['$scope', 'CustomerFactory', '$location', "SERVER", "$cookieStore", 'UserFactory',

    function ($scope, CustomerFactory, $location, SERVER, $cookieStore, UserFactory) {

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
        });
      };

      $scope.getCustomerData();

      

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


    }

  ]);

}());