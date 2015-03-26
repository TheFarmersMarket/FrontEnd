;(function (){
  
  'use strict';

  angular.module('FarmersMarket')

  .controller('FarmerProfileCtrl', 

    ['$routeParams', '$scope', 'CustomerFactory', 'FarmerFactory', '$cookieStore',

    function ($routeParams, $scope, CustomerFactory, FarmerFactory, $cookieStore) {

      var farmerID = $routeParams.id;
      $scope.customerID = sessionStorage.getItem('customerID');
      $scope.auth = sessionStorage.getItem('auth');

      CustomerFactory.refreshPage();

      CustomerFactory.farmerProfile(farmerID)
        .success( function(res) {
          $scope.customerAvatar = sessionStorage.getItem('customerAvatar');           
          $scope.farmerProfile = res.farmer;
          $scope.farmerAvatar = res.avatar.avatar;
          if ($scope.farmerAvatar === "/images/medium/missing.png") {
            $scope.farmerAvatar = "/images/farmers-market-logo.png";
          }
        });

      FarmerFactory.getCrops(farmerID)
        .success( function (res) {
          $scope.allCrops = res.crops;
          // console.log($scope.allCrops);

          for (var i = 0; i < $scope.allCrops.length; i++) {
            if ($scope.allCrops[i].avatar === "/images/medium/missing.png");
              $scope.allCrops[i].avatar = "/images/farmers-market-logo.png";
              // console.log($scope.allCrops);
          }


          setTimeout(function () {
            $('.collapsible').collapsible({
              accordion : false
            }); 
          }, 0);

        });

      $scope.followFarmer = function () {
        CustomerFactory.followFarmer($scope.auth, $scope.customerID, farmerID)
          .success( function (res) {
            $scope.followerCount = res.follow.farmers_followers_count;
            toast("<span>You're following this farmer.</span>", 3000);

            setTimeout(function () {
              $scope.getFollowerCount(farmerID);
            }, 500);

          });
      };

      $scope.getFollowerCount = function (farmerID) {
        CustomerFactory.getFollowerCount($scope.auth, farmerID)
          .success( function (res) {
            $scope.follower_count = res.follower_count.follower_count;
          });
      };

      $scope.getFollowerCount(farmerID);

    }

  ]);

}());