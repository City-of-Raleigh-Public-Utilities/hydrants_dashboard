'use strict';

/**
 * @ngdoc directive
 * @name hydrantsDashboardApp.directive:totalsTable
 * @description
 * # totalsTable
 */
angular.module('hydrantsDashboard')
  .directive('totalsTable', function ($filter) {
    return {
      templateUrl: 'views/totals-table.html',
      restrict: 'E',
      transclude: true,
      scope: {
        data: '=',
        title: '=',
        view: '='
      },
      link: function postLink(scope, element, attrs) {

        scope.defaultTitle = scope.view ? 'FACILITYID: ' : 'Hydrant Totals for ';

      }
    };
  });
