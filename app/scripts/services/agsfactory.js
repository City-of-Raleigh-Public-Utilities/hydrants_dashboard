'use strict';

/**
 * @ngdoc service
 * @name hydrantsDashboardApp.agsFactory
 * @description
 * # agsFactory
 * Factory in the hydrantsDashboardApp.
 */
angular.module('hydrantsDashboard')
  .factory('agsFactory', ['Ags', '$http', '$q', '$localStorage', '$location', function (Ags, $http, $q, $localStorage, $location) {

    // Add Server Urls
    var mapsServer = new Ags({'host': 'maps.raleighnc.gov', protocol: 'https'}),
        mapstest = new Ags({'host': 'mapstest.raleighnc.gov'}),


        // baseUrl = 'https://maps.raleighnc.gov/arcgis/rest/services/PublicUtility/FireHydrants/FeatureServer';
        // function getHydrants (options) {
        //    var deferred = $q.defer();
        //   $http({
        //     method: 'GET',
        //     url: baseUrl+'/0/query',
        //     params: options,
        //     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        //   }).success(function (data) {
        //     deferred.resolve(data);
        //   });
        //   return deferred.promise;
        // };





      services = {

          login: function (user, password) {
            return mapsServer.requestToken(user, password, 60);
          },

          isTokenValid: function (exp){
            var today = new Date();
            if (today < exp){
              return true;
            }
            else {
              $location.path('/');
              return false;
            }

          },

          //Contain Response Districts
          publicUtilMS: mapsServer.setService({
            folder: 'PublicUtility',
            service: 'FireHydrants',
            server: 'MapServer',
          }),


          fi_ms: mapstest.setService({
            folder:'PublicUtility',
            service: 'HydrantInspection',
            server: 'MapServer'
          }),

          //Contains Hydrant data
          publicUtilFS: mapsServer.setService({
            folder: 'PublicUtility',
            service: 'FireHydrants',
            server: 'FeatureServer',
          }),

          //Add mapstest for geometry services
          // mapstest: mapstest,

          // getHydrants: getHydrants,


        };

        return (services);
  }]);
