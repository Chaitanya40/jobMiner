'use strict';

/**
 * @ngdoc service
 * @name JobminerApp.SplitJobDataService
 * @description
 * # splitJobDataService
 * Service in the JobminerApp.
 */
angular.module('JobminerApp')
  .service('SplitJobDataService', SplitJobDataService);


SplitJobDataService.$inject = ['$filter', 'ShortlistCookieService'];
function SplitJobDataService($filter, ShortlistCookieService) {
  // AngularJS will instantiate a singleton by calling "new" on this function
  var service = this;
  var jobsToDisplay = [];

  service.getJobsToDisplay = getJobsToDisplay;
  service.getFiltersForParams = getFiltersForParams;
  service.getFilterByType = getFilterByType;
  service.removeShortlistedJobs = removeShortlistedJobs;
  service.fetchShortlistedJobs= fetchShortlistedJobs;

  function getJobsToDisplay(fullJobDetails, stateParams) {
    jobsToDisplay = fullJobDetails.slice();
    var queryList = JSON.parse(JSON.stringify(stateParams));
    if (queryList.all) {
      return fullJobDetails;
    }

    var qKeys = Object.keys(queryList);
    var numParams = qKeys.length;
    for (var i = 0; i < numParams; i++) {
      var queryKey = queryList[qKeys[i]];
      if (queryKey) {
        jobsToDisplay = ($filter(getFiltersForParams(queryKey))(jobsToDisplay, queryKey.property, queryKey.operator, queryKey.values));
      }
    }
    return jobsToDisplay;
  }

  function fetchShortlistedJobs(fullJobDetails) {
    var jobIdList = ShortlistCookieService.fetchShortlistIds();
    var queryList = {
      shortlist: {
        property: 'index_col',
        operator: 'in',
        values: jobIdList
      }
    };
    return getJobsToDisplay(fullJobDetails, queryList);
  }

  function removeShortlistedJobs(fullJobDetails) {
    var allJobs = fullJobDetails.slice();
    var jobIdList = ShortlistCookieService.fetchShortlistIds();

    var length = allJobs.length;
    if (jobIdList.length > 0) {
      for (var i = length - 1; i >= 0; i--) {
        if (jobIdList.indexOf(allJobs[i].index_col) > -1) {
          allJobs.splice(i, 1);
        }
      }
    }
    return allJobs;
  }


  function getFiltersForParams(paramObj) {
    if (paramObj) {
      var property = paramObj.property;
      return getFilterByType(property);
    }
  }

  function getFilterByType(type) {
    switch (type) {
      case 'posted_days_ago':
      case 'index_col':
        return 'byObjectIntProp';
      case 'city':
      case 'company_name':
      case 'location':
      case 'position':
      case 'Source':
        return 'byObjectStrProp';
      case 'tags':
        return 'byArrayStrProp';
      default:
        return type;
    }
  }
}
