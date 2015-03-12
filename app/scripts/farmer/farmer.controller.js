;(function (){
  
  'use strict';

  angular.module('FarmersMarket')

  .controller('FarmerCtrl', ['$scope', 'UserFactory', '$location', "SERVER", "$cookieStore",

    function ($scope, UserFactory, $location, SERVER, $cookieStore) {

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

      // Edit Profile Modal
      $scope.editProfileModal = function () {
        $('#editProfile').openModal();
      };   

    }

  ]);

}());