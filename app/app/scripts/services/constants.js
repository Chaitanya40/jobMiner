(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name JobminerApp.filterConfigData
   * @description
   * # filterConfigData
   * Constant in the JobminerApp.
   */
  angular.module('JobminerApp')
    .constant('filterConfigData', filterConfigData)
    .constant('ShortlistCookieId', 'shortlisted')
    .constant('lastVisitedTimeId', 'lastVisited');


  var filterConfigData = {
    numericFilters: ['posted_days_ago'],
    stringFilters: ['Source', 'city', 'company', 'location', 'position'],
    arrayFilters: ['tags']
  };

})();
