'use strict';

/**
 * @ngdoc service
 * @name hydrantsDashboardApp.hydrantEvents
 * @description
 * # hydrantEvents
 * Factory in the hydrantsDashboardApp.
 */
angular.module('hydrantsDashboard')
  .factory('hydrantEvents', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
