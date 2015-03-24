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
    'agsserver',
    'leaflet-directive',
    'cgBusy'
  ])
  .constant("FIREDEPTS", [
     {
      "name": "City of Raleigh Fire Department",
      "title": "Raleigh",
      "icon": "images/Raleigh_Fire_Department_Logo.png"
    },
    {
      "name": "Town of Garner Fire Department",
      "title": "Garner",
      "icon": "images/garner_fire_logo.jpg"
    },
     {
      "name": "Town of Wake Forest Fire Department",
      "title": "Wake Forest",
      "icon": "images/wakeforest_logo.jpg"
    },
     {
      "name": "Town of Zebulon Fire Department",
      "title": "Zebulon",
      "icon": "images/zeb_seal.png"
    },
    {
      "name": "Town of Knightdale Fire Department",
      "title": "Knightdale",
      "icon": "images/kdaleseal.png"
    },
    {
      "name": "Town of Wendell Fire Department",
      "title": "Wendell",
      "icon": "images/wendellfire6.jpg"
    },
    {
      "name": "Town of Rolesville Fire Department",
      "title": "Rolesville",
      "icon": ""
    },
    {
      "name": "Wake New Hope",
      "title": "Wake New Hope",
      "icon": "images/WakeNewHopePatch.png"
    },
     {
      "name": "Eastern Wake Fire Department",
      "title": "Eastern Wake",
      "icon": ""
    }
  ])
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/responseZone/:zone', {
        templateUrl: 'views/responsezone.html',
        controller: 'ResponsezoneCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  });
