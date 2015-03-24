'use strict';

/**
 * @ngdoc service
 * @name hydrantsDashboardApp.hydrantEvents
 * @description
 * # hydrantEvents
 * Factory in the hydrantsDashboardApp.
 */
angular.module('hydrantsDashboard')
  .factory('hydrantEvents', ['leafletData', function (leafletData) {
    var MapEvents = {

      //Sets hydrant styles
      setHydrantStyle: function (feature){
        switch (feature.properties.REPAIRNEED) {
          case 0: return {
            fillColor: "#0008ff",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8,
            radius: 4
          };
          case 1: return {
              fillColor: "#ff0000",
              color: "#000",
              weight: 1,
              opacity: 1,
              fillOpacity: 0.8,
              radius: 4
            };
          }
        },

        // Mouse over function, called from the Leaflet Map Events
        hydrantMouseover: function (feature, leafletEvent) {
            var layer = leafletEvent.target;
            layer.setStyle({
              radius: 6,
              fillColor: "#00ffe6",
              color: "#000",
              weight: 1,
              opacity: 1,
              fillOpacity: 0.8
            });
            layer.bringToFront();
            return feature;
        },

        //Zoom to feature on click
        zoomToFeature: function (featureSelected){
          leafletData.getMap().then(function(map) {
            var coords = [featureSelected.geometry.coordinates[1], featureSelected.geometry.coordinates[0]]
            map.setView(coords, 18);
          });
        },



      };

    return (MapEvents);

  }]);