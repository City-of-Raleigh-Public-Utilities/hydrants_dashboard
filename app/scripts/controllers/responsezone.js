'use strict';

/**
 * @ngdoc function
 * @name hydrantsDashboardApp.controller:ResponsezoneCtrl
 * @description
 * # ResponsezoneCtrl
 * Controller of the hydrantsDashboardApp
 */
angular.module('hydrantsDashboard')
  .controller('ResponsezoneCtrl', ['$scope', '$route', '$routeParams', '$location', 'FIREDEPTS', 'agsFactory', 'leafletData',
    function ($scope, $route, $routeParams, $location, FIREDEPTS, agsFactory, leafletData) {

    //Get Route Details
    //  $scope.$route = $route;
    //  $scope.$location = $location;
     $scope.$routeParams = $routeParams;

     $scope.responseZone = $routeParams.zone;

     FIREDEPTS.forEach(function(dept){
       if (dept.title === $scope.responseZone){
         $scope.badge = dept.icon;
       }
     });

     //Set options for query
     var options = {
       serviceArea: {
        layer: 'County Fire Response Districts',
        geojson: true,
        actions: 'query',
        params: {
          f: 'json',
          text: $scope.responseZone,
          outSR: 4326
        }
      },
      hydrants: {
        layer: 'Water Hydrants',
        geojson: true,
        actions: 'query',
        params: {
          f: 'json',
          geometryType: 'esriGeometryPolygon',
          inSR: 4326,
          outSR: 4326,
          spatialRel: 'esriSpatialRelContains'
        }
      }
    };

      var mapBounds =  new L.FeatureGroup();
      $scope.serviceAreas;

      agsFactory.publicSafteyMS.request(options.serviceArea)
        .then(function(res){
          console.log(res);

          $scope.serviceAreas = turf.combine(res);
          var enveloped = turf.envelope($scope.serviceAreas);
          var districts = Terraformer.ArcGIS.convert(enveloped.geometry);
          console.log(enveloped);


          //Empties exisiting feature group
          mapBounds.clearLayers();


        leafletData.getMap().then(function(map) {
          //Sets geojson object and adds each layer to featureGroup as a layer, so it can be edited
          L.geoJson(res, {
            style: {
                fillColor: "green",
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
            },
            onEachFeature: function (feature, layer) {
              mapBounds.addLayer(layer);
            }
          }).addTo(map);
          //Get bounds from geojson and fits to map
          map.fitBounds(mapBounds.getBounds());
      });

          return districts;
        }, function(err){
          console.log('Error: Cannot retrieve response zones');
        })
        .then(function(districts){

          //Set bounds for query
          options.hydrants.params.geometry = districts;

          // Make request to hydrants
          agsFactory.publicUtilMS.request(options.hydrants)
            .then(function(res){

              console.log($scope.serviceAreas);
              var fc = turf.featurecollection($scope.serviceAreas);
              function addPoints(point, poly, callback){

                callback(turf.within(point, poly));
              }


              addPoints(res, fc, function(data){
                console.log(data);

              })

              angular.extend($scope, {
                geojson: {
                    data: res
                }
            });


            }, function(err){
              console.log('Error: Cannot retrieve hydrants');
            });

        }, function(err){
          console.log('Error: Cannot retrieve districts');
        });



  }]);
