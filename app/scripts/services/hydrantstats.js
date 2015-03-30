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
        console.log(today);

    var startDate = new Date(2015, 4, 1, 0, 0, 0);
    var cleanReport = {
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
      },
      needsRepairPublic: [],
      needsRepairPrivate: []
    };

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
        },
        needsRepairPublic: [],
        needsRepairPrivate: []
      },

      getReport: function (features, callback){
        var that = this;
        //reset stats

        this.report = angular.copy(cleanReport);
        features.forEach(function(feature){

          var prop = feature.properties;
          if (feature.properties.EDITEDON > today){
            prop.CHECKED === 'Y' ? that.report.daily.Checked++ : 0;
            prop.OPERABLE === 'N' ? that.report.daily.Inoperable++ : 0;
            prop.REPAIRNEED === '1' ? that.report.daily.Need_Repair++ : 0;
            prop.CREATEDON >= today.getTime() ? that.report.daily.New_Hydrants++ : 0;
          }

          //Total Checked
          prop.CHECKED === 'Y' && prop.OWNEDBY !== 1 && prop.RFDSTATION !== null ? that.report.total.Checked_Public++ : 0;
          prop.CHECKED === 'Y' && prop.OWNEDBY === 1 && prop.RFDSTATION !== null ? that.report.total.Checked_Private++ : 0;

          //Total Inoperable
          prop.OPERABLE === 'N' && prop.OWNEDBY !== 1 && prop.RFDSTATION !== null ? that.report.total.Inoperable_Public++ : 0;
          prop.OPERABLE === 'N' && prop.OWNEDBY === 1 && prop.RFDSTATION !== null ? that.report.total.Inoperable_Private++ : 0;

          //Total Needs Repair
          prop.REPAIRNEED === 1 && prop.OWNEDBY !== 1 && prop.RFDSTATION !== null ? (that.report.total.Need_Repair_Public++, that.report.needsRepairPublic.push({attributes: prop, geom: feature.geometry})) : 0;
          prop.REPAIRNEED === 1 && prop.OWNEDBY === 1 && prop.RFDSTATION !== null ? (that.report.total.Need_Repair_Private++, that.report.needsRepairPrivate.push({attributes: prop, geom: feature.geometry}))  : 0;

          //Total New Hydrants
          prop.CREATEDON >= startDate.getTime() && prop.OWNEDBY !== 1 && prop.RFDSTATION !== null ? that.report.total.New_Hydrant_Public++ : 0;
          prop.CREATEDON >= startDate.getTime() && prop.OWNEDBY === 1 && prop.RFDSTATION !== null ? that.report.total.New_Hydrant_Private++ : 0;

        });

        // this.report.features = this.addDomains(features);


        callback(this.report);
      },

      addDomains: function (features, callback){
        features.forEach(function(feature){
          var prop = feature.properties;
            for (var key in prop){
            switch (key){
              case 'OWNEDBY':
                if(prop === 0){
                  prop = 'City of Raleigh';
                }
                else if (prop === 1){
                  prop = 'Private';
                }
                else{
                  prop = 'Other';
                }
                break;
              case 'EDITEDON' || 'CREATEDON':
                prop = $filter('date')(prop, 'short');
                break;
              case 'OPERABLE':
                prop === 'Y' ? prop = 'Yes' : prop = 'No';
                break;
              case 'REPAIRNEED' || 'FLOWED':
                prop = prop ? 'True' : 'False';
                break;
              default:

            }
            }
          });


        callback(features);
      }




    };

    return (Stats);

  }]);

  // print "Counting Features..."
  // inopTotPub = GetFeatureCount(sde, selectarea,"RFDSTATION IS NOT NULL AND OPERABLE = 'N' AND OWNEDBY <> 1")
  // print "Inoperable (Public): "+str(inopTotPub)
  // inopTotPriv = GetFeatureCount(sde, selectarea,"RFDSTATION IS NOT NULL AND OPERABLE = 'N' AND OWNEDBY = 1")
  // print "Inoperable (Private): "+str(inopTotPriv)
  // repTotPub = GetFeatureCount(sde, selectarea,"RFDSTATION IS NOT NULL AND REPAIRNEED = 1 AND OWNEDBY <> 1")
  // print "Need Repair (Public): "+str(repTotPub)
  // repTotPriv = GetFeatureCount(sde, selectarea,"RFDSTATION IS NOT NULL AND REPAIRNEED = 1 AND OWNEDBY = 1")
  // print "Need Repair (Private): "+str(repTotPriv)
  // chkTotPub = GetFeatureCount(sde, selectarea, "RFDSTATION IS NOT NULL AND CHECKED IN ('Y','GPS','NEW') AND OWNEDBY <> 1")
  // print "Checked (Public): "+str(chkTotPub)
  // chkTotPriv= GetFeatureCount(sde, selectarea, "RFDSTATION IS NOT NULL AND CHECKED IN ('Y','GPS','NEW') AND OWNEDBY = 1")
  // print "Checked (Private): "+str(chkTotPriv)
  // newTotPub = GetFeatureCount(sde, selectarea, "RFDSTATION IS NOT NULL AND CREATEDON >= TO_DATE(" + NewDate + ") AND OWNEDBY <> 1")
  // print "New (Public): "+str(newTotPub)
  // newTotPriv = GetFeatureCount(sde, selectarea, "RFDSTATION IS NOT NULL AND CREATEDON >= TO_DATE(" + NewDate + ") AND OWNEDBY = 1")
  // print "New (Private): "+str(newTotPriv)
