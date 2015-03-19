'use strict';

/**
 * @ngdoc overview
 * @name hydrantsDashboardApp
 * @description
 * # hydrantsDashboardApp
 *
 * Main module of the application.
 */
angular
  .module('hydrantsDashboard', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .constant("FireDepartments", {
    "raleigh": {
      "name": "City of Raleigh Fire Department",
      "icon": "images/Raleigh_Fire_Department_Logo.png"
    },
    "garner": {
      "name": "Town of Garner Fire Department",
      "icon": "images/garner_fire_logo.png"
    },
    "wakeforest": {
      "name": "Town of Wake Forest Fire Department",
      "icon": "images/wakeforest_logo.jpg"
    },
    "zebulon": {
      "name": "Town of Zebulon Fire Department",
      "icon": "images/zebulon_logo.png"
    }
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
