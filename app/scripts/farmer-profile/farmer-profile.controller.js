;(function (){
  
  'use strict';

  angular.module('FarmersMarket')

  .controller('FarmerProfileCtrl', 

    ['$routeParams', '$scope', 'CustomerFactory', 'FarmerFactory', '$cookieStore',

    function ($routeParams, $scope, CustomerFactory, FarmerFactory, $cookieStore) {

      var farmerID = $routeParams.id;


      CustomerFactory.farmerProfile(farmerID)
        .success( function(res) {            
          $scope.farmerProfile = res.farmer;
          console.log($scope.farmerProfile);
          $scope.farmerAvatar = res.avatar.avatar;
          console.log($scope.farmerAvatar);
        });

      FarmerFactory.getCrops(farmerID)
        .success( function (res) {
          $scope.allCrops = res.crops;
          console.log($scope.allCrops);
          
          setTimeout(function () {
            $('.collapsible').collapsible({
              accordion : false
            }); 
          }, 0);

        });

    }

  ]);

}());