'use strict';

/**
 * @ngdoc service
 * @name hydrantsDashboardApp.agsFactory
 * @description
 * # agsFactory
 * Factory in the hydrantsDashboardApp.
 */
angular.module('hydrantsDashboard')
  .factory('agsFactory', function (Ags) {

    // Add Server Urls
    var mapsServer = new Ags({'host': 'maps.raleighnc.gov' }),
        gisServer = new Ags({'host': 'gis.raleighnc.gov' }),
        mapstest = new Ags({'host': 'mapstest.raleighnc.gov'}),


        services = {

          //Contain Response Districts
          publicSafteyMS: mapsServer.setService({
            folder: 'PublicSafety',
            service: 'PublicSafety',
            server: 'MapServer',
          }),

          //Contains Hydrant data
          publicUtilMS: gisServer.setService({
            folder: 'PublicUtility',
            service: 'WaterDistribution',
            server: 'MapServer',
          }),

          //Add mapstest for geometry services
          mapstest: mapstest
        };

        return (services);
  });
