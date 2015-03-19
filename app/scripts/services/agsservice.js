'use strict';

/**
 * @ngdoc service
 * @name hydrantsDashboardApp.agsService
 * @description
 * # agsService
 * Service in the hydrantsDashboardApp.
 */
angular.module('hydrantsDashboard')
  .service('agsService', [ 'Ags', function (Ags) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var mapsServer = new Ags({'host': 'http://maps.raleighnc.gov/' }),
        gisServer = new Ags({'host': 'http://gis.raleighnc.gov/' }),
        services = {

          //Contain Response Districts
          publicSafteyMS: {
            folder: 'PublicSafety',
            service: 'PublicSafety',
            server: 'MapServer',
          },

          //Contains Hydrant data
          publicUtilMS: {
            folder: 'PublicUtility',
            service: 'WaterDistribution',
            server: 'MapServer',
          }
        }

        return (services);

  }]);
