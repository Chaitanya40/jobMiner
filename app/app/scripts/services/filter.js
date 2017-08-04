(function(){
'use strict';

/**
 * @ngdoc service
 * @name JobminerApp.Filter
 * @description
 * # Filter
 * Service in the JobminerApp.
 */
angular.module('JobminerApp')
  .service('FilterService', FilterService);


FilterService.$inject= ['$rootScope'];
function FilterService($rootScope) {

  var serv = this;
  serv.getEveryFilterDetails = getEveryFilterDetails;
  serv.broadcastItemAddedEvent = broadcastItemAddedEvent;
  serv.broadcastItemRemovedEvent = broadcastItemRemovedEvent;

  function getEveryFilterDetails(completeJobDetails) {
    var locations = new Set();
    var tags = new Set();
    var companies = new Set();
    var locations_obj_arr = [];
    var tags_obj_arr = [];
    var companies_obj_arr = [];

    for (let i = 0; i < completeJobDetails.length; i++) {
      var jobJson  = completeJobDetails[i];
      locations.add(jobJson.job_location);
      tags.add(...jobJson.tags);
      companies.add(jobJson.company_name);
    }

    var arr_locations = Array.from(locations).sort();
    var arr_tags = Array.from(tags).sort();
    var arr_companies = Array.from(companies).sort();

    for(let i=0; i < arr_locations.length; i++){
      locations_obj_arr.push({
        id : i,
        value: arr_locations[i],
        selected: false
      })
    }

    for(let i=0; i < arr_tags.length; i++){
      tags_obj_arr.push({
        id : i,
        value: arr_tags[i],
        selected: false
      })
    }

    for(let i=0; i < arr_companies.length; i++){
      companies_obj_arr.push({
        id : i,
        value: arr_companies[i],
        selected: false
      })
    }
    return [locations_obj_arr, tags_obj_arr, companies_obj_arr];
  }

  function broadcastItemAddedEvent(params){
    // $rootScope.$broadcast('addedFilterEvent', params);
  }

  function broadcastItemRemovedEvent(params){
    // $rootScope.$broadcast('removedFilterEvent', params);
  }

}
})();
