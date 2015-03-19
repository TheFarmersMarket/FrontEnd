;(function () {
 
 'use strict';

 angular.module('FarmersMarket', ['ngRoute', 'ngCookies'])

 .constant('SERVER', {

   URL: 'https://tiy-farmers-market.herokuapp.com/',
   
   CONFIG: {
     
     headers : {
       'Content-Type' : 'application/json'
     }
   } 
 })

 .config([ '$routeProvider', function ($routeProvider) {

   $routeProvider

   // Home Page
   .when('/', {
     templateUrl: '/scripts/users/homepage.tpl.html',
     controller: 'UserCtrl'
   })

   // Login Page
   .when('/login', {
     templateUrl: '/scripts/users/login.tpl.html',
     controller: 'UserCtrl'
   })

   // Register Page 
   .when('/register', {
     templateUrl: '/scripts/users/register.tpl.html',
     controller: 'UserCtrl'
   })

   // Create Farmer Profile
   .when('/farmer/create-profile', {
     templateUrl: '/scripts/farmer/create-farmer.tpl.html',
     controller: 'FarmerCtrl'
   })

   // Create Customer Profile
   .when('/customer/create-profile', {
     templateUrl: '/scripts/customer/create-customer.tpl.html',
     controller: 'CustomerCtrl'
   })

   // Farmer Home Page 
   .when('/main/farmer/:id', {
     templateUrl: '/scripts/farmer/farmer.tpl.html',
     controller: 'FarmerCtrl'
   })

   // Customer Home Page 
   .when('/main/customer/:id', {
     templateUrl: '/scripts/customer/customer.tpl.html',
     controller: 'CustomerCtrl'
   });

   // Go Home ET
   // .otherwise('/');
   
 }]);


	//Materialize JS
	$('.parallax').parallax();

	$(".button-collapse").sideNav();

	$('.modal-trigger').leanModal();	

}());




