'use strict';

/**
 * @ngdoc function
 * @name hydrantsDashboardApp.controller:ResponsezoneCtrl
 * @description
 * # ResponsezoneCtrl
 * Controller of the hydrantsDashboardApp
 */
angular.module('hydrantsDashboard')
  .controller('ResponsezoneCtrl', ['$scope', '$route', '$routeParams', '$location', 'agsService', function ($scope, $route, $routeParams, $location, agsService) {
     $scope.$route = $route;
     $scope.$location = $location;
     $scope.$routeParams = $routeParams;

  }]);
