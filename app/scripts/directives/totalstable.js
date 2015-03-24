'use strict';

/**
 * @ngdoc directive
 * @name hydrantsDashboardApp.directive:totalsTable
 * @description
 * # totalsTable
 */
angular.module('hydrantsDashboard')
  .directive('totalsTable', function () {
    return {
      templateUrl: 'views/totals-table.html',
      restrict: 'E',
      transclude: true,
      scope: {
        data: '=',
        title: '='
      },
      link: function postLink(scope, element, attrs) {
        console.log(scope.data);
        console.log(scope.title);
      }
    };
  });
