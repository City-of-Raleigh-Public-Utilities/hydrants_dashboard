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
    'ngTouch',
    'agsserver'
  ])
  .constant("FIREDEPTS", {
    "raleigh": {
      "name": "City of Raleigh Fire Department",
      "title": "Raleigh",
      "icon": "images/Raleigh_Fire_Department_Logo.png"
    },
    "garner": {
      "name": "Town of Garner Fire Department",
      "title": "Garner",
      "icon": "images/garner_fire_logo.jpg"
    },
    "wakeforest": {
      "name": "Town of Wake Forest Fire Department",
      "title": "Wake Forest",
      "icon": "images/wakeforest_logo.jpg"
    },
    "zebulon": {
      "name": "Town of Zebulon Fire Department",
      "title": "Zebulon",
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
