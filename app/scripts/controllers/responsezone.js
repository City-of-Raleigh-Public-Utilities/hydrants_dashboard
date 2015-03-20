'use strict';

/**
 * @ngdoc function
 * @name hydrantsDashboardApp.controller:ResponsezoneCtrl
 * @description
 * # ResponsezoneCtrl
 * Controller of the hydrantsDashboardApp
 */
angular.module('hydrantsDashboard')
  .controller('ResponsezoneCtrl', ['$scope', '$route', '$routeParams', '$location', 'agsFactory', '$http', function ($scope, $route, $routeParams, $location, agsFactory, $http) {

    //Get Route Details
    //  $scope.$route = $route;
    //  $scope.$location = $location;
     $scope.$routeParams = $routeParams;

     $scope.responseZone = $routeParams.zone;

     //Set options for query
     var options = {
       serviceArea: {
        layer: 'County Fire Response Districts',
        actions: 'query',
        params: {
          f: 'json',
          text: $scope.responseZone
        }
      },
      hydrants: {
        layer: 'Water Hydrants',
        geojosn: true,
        actions: 'query',
        params: {
          f: 'json',
          geometryType: 'esriGeometryPolygon'
        }
      }
    };



      agsFactory.publicSafteyMS.request(options.serviceArea)
        .then(function(res){
          var districts = res.features;

          return districts;
        }, function(err){
          console.log('Error: Cannot retrieve response zones');
        })
        .then(function(districts){
          console.log(districts)
          var bounds = {
            'spatialReference': {wkid : 2264}
          };

          var unionOptions = {
            method: 'GET',
            url: 'http://mapstest.raleighnc.gov/arcgis/rest/services/Utilities/Geometry/GeometryServer/union',
            headers: {'Content-Type': 'text/plain'},
            data: {
                f: 'html',
                geometries: {
                  geometryType: 'esriGeometryPolygon',
                  geometries: []
                },
                sr: 2264
              }
              }

              unionOptions.data.geometries.geometries.push(districts[0].geometry);
          districts.forEach(function(district){
            // bounds.rings = district.geometry.rings;
            // console.log(district.geometry.rings);
            // unionOptions.params.geometries.geometries.push(district.geometry);
          });

          var url = 'http://maps.raleighnc.gov/arcgis/rest/services/Utilities/Geometry/GeometryServer/union'
          $http(unionOptions)
          // agsFactory.mapstest.utilsGeom('union', unionOptions)
            .then(function(res){
              console.log(res);
            },
            function(err){
              console.log('Error: Preforming Union');
            })


          // console.log(test);
          // console.log(test[0]);
          //Set bounds for query
          options.hydrants.params.geometry = bounds;

          //Make request to hydrants
          agsFactory.publicUtilMS.request(options.hydrants)
            .then(function(res){
              console.log(res);

            }, function(err){
              console.log('Error: Cannot retrieve hydrants');
            });

        }, function(err){
          console.log('Error: Cannot retrieve districts');
        });



  }]);
