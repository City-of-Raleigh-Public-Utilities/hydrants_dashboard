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

          login: function (user, password) {
            return mapsServer.requestToken(user, password, 60);
          },

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
          pt_ms: mapstest.setService({
            folder:'PublicUtility',
            service: 'ProjectTracking',
            server: 'MapServer'
          }),

          //Contains Hydrant data
          publicUtilFS: mapsServer.setService({
            folder: 'PublicUtility',
            service: 'FireHydrants',
            server: 'FeatureServer',
          }),

          //Add mapstest for geometry services
          mapstest: mapstest
        };

        return (services);
  });
