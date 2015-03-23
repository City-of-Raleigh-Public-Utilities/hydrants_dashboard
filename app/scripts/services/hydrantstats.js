'use strict';

/**
 * @ngdoc service
 * @name hydrantsDashboardApp.hydrantStats
 * @description
 * # hydrantStats
 * Factory in the hydrantsDashboardApp.
 */
angular.module('hydrantsDashboard')
  .factory('hydrantStats', ['$filter', function ($filter) {

    //Private
    var today = new Date();
        console.log(today.getTime());
        today.setHours(0);
        today.setMinutes(0);
        today.setMilliseconds(0);
        console.log(today.getTime());

    var Stats = {

      report: {
        daily: {
          Checked: 0,
          Inoperable: 0,
          Need_Repair: 0,
          New_Hydrants: 0
        },
        total: {
          Checked_Public: 0,
          Checked_Private: 0,
          Inoperable_Public: 0,
          Inoperable_Private: 0,
          Need_Repair_Public: 0,
          Need_Repair_Private: 0,
          New_Hydrant_Public: 0,
          New_Hydrant_Private: 0
        }
      },

      getTotalsReport: function (feature){
        var prop = feature.properties;
        if (feature.properties.EDITEDON > today){
          if (prop.CHECKED === 'Y'){
            this.report.daily.Checked++;
          }
        }
        else{
          console.log('Not Today');
        }
      }

    };

    return (Stats);

  }]);
