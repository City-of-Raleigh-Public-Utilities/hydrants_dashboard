'use strict';

/**
 * @ngdoc function
 * @name hydrantsDashboardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hydrantsDashboardApp
 */
angular.module('hydrantsDashboard')
  .controller('MainCtrl',['$scope', 'FIREDEPTS', function ($scope, FIREDEPTS) {
    $scope.departments = FIREDEPTS;
  }]);
