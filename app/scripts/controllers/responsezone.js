'use strict';

/**
 * @ngdoc function
 * @name hydrantsDashboardApp.controller:ResponsezoneCtrl
 * @description
 * # ResponsezoneCtrl
 * Controller of the hydrantsDashboardApp
 */
angular.module('hydrantsDashboard')
  .controller('ResponsezoneCtrl', ['$scope', '$route', '$routeParams', '$location', 'FIREDEPTS', 'agsFactory', 'leafletData', '$filter', '$interval', 'hydrantStats', 'hydrantEvents', '$timeout',
    function ($scope, $route, $routeParams, $location, FIREDEPTS, agsFactory, leafletData, $filter, $interval, hydrantStats, hydrantEvents, $timeout) {

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

     //Placeholder for hydrant selection
     $scope.selectedHydrant = {};

     //Hydrants reference used in search
     $scope.hydrantRef = {};

     //Set current date
     $interval(function(){
       $scope.today = $filter('date')(new Date(), 'short');
     }, 1000);

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
          outFields: 'STNUM, STENUM,STPREFIX, STNAME, STTYPE, STSUFFIX, OWNEDBY, MANUFACTURER, HYDRANTYEAR, VALVESIZE, PUMPERNOZZLETYPE, SIDENOZZLETYPE, OPERABLE, REPAIRNEED, NOTES, RFD_NOTES, FACILITYID, CHECKED, JURISID, RFDSTATION, EDITEDON, CREATEDON',
          inSR: 4326,
          outSR: 4326,
          spatialRel: 'esriSpatialRelContains'
        }
      }
    };

    //Map Events
    leafletData.getMap().then(function(map) {
      $scope.$on("leafletDirectiveMap.geojsonMouseover", function(ev, feature, leafletEvent) {
        $scope.selectedHydrant = hydrantEvents.hydrantMouseover(feature, leafletEvent);
      });

      $scope.$on("leafletDirectiveMap.geojsonClick", function(ev, featureSelected, leafletEvent) {
          hydrantEvents.zoomToFeature(featureSelected);
      });

      //Controls hover events on needs repairs table
      $scope.zoomToFeature = function(feature){
        if ($scope.selectedHydrant.properties){
          $scope.selectedHydrant.properties = feature.attributes;
        }
        else{
          $scope.selectedHydrant = {};
          $scope.selectedHydrant.properties = feature.attributes;
        }

        map.setView([feature.geom.coordinates[1], feature.geom.coordinates[0]], 18);
      };

      //Controls search bar above map
      $scope.searchMap = function(event, textFilter, geojson){
        //Set timeout to return promise
        $scope.searchPromise = $timeout(function(){
          //Filter geometry base on search text
          geojson.data.features = $filter('filter')($scope.hydrantRef.features, {$:textFilter});
          //Add new geojson scope
          angular.extend($scope, {
            geojson: {
                data: geojson.data,
                pointToLayer: function (feature, latlng) {
                  return L.circleMarker(latlng, hydrantEvents.setHydrantStyle);
                },
                style: hydrantEvents.setHydrantStyle,
                resetStyleOnMouseout: true
            }
          });
        }, 500);


          // map.setView([$scope.geojson.features[1], feature.geom.coordinates[0]], 18);
        // }
      };

     });

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
                fillColor: 'rgba(50, 173, 2, 0.74)',
                weight: 2,
                opacity: 1,
                color: '#fff',
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
              // hydrantStats.addDomains(res.features, function(features){
              //   res.features = features
              // });
              angular.copy(res, $scope.hydrantRef);

          //Add hydrants to map
              angular.extend($scope, {
                geojson: {
                    data: res,
                    pointToLayer: function (feature, latlng) {
                      return L.circleMarker(latlng, hydrantEvents.setHydrantStyle);
                    },
                    style: hydrantEvents.setHydrantStyle,
                    resetStyleOnMouseout: true
                },
                legend: {
                  position: 'bottomleft',
                  colors: [ '#ff0000', '#0008ff'],
                  labels: [ 'Repair Needed', 'No Repair Needed']
                }
            });

            //Generate map reports
            hydrantStats.getReport(res.features, function(report){
              $scope.reportTotals = report;
              $scope.needsRepair = [
                {
                  status: true,
                  data: report.needsRepairPublic,
                  name: 'Needs Repair Public'
                },
                {
                  status: false,
                  data: report.needsRepairPrivate,
                  name: 'Needs Repair Private'
                }
              ];
              $scope.selected = $scope.needsRepair[0];

              $scope.headers = Object.keys($scope.needsRepair[0].data[0].attributes);

              //Prepares data to print
              $scope.printCSV = function(data){
                var csv = [];
                data.forEach(function(feature){
                  csv.push(feature.attributes);
                });
                return csv;
              };

            });


            }, function(err){
              console.log('Error: Cannot retrieve hydrants');
            });

        }, function(err){
          console.log('Error: Cannot retrieve districts');
        });

        $scope.$watch('reportTotals', function(){});
        $scope.$watch('needsRepair', function(){});


  }]);
