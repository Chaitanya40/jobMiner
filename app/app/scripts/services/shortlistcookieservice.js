(function(){
'use strict';

/**
 * @ngdoc service
 * @name JobminerApp.ShortlistCookieService
 * @description
 * # ShortlistCookieService
 * Service in the JobminerApp.
 */
angular.module('JobminerApp')
  .service('ShortlistCookieService', ShortlistCookieService);


ShortlistCookieService.$inject = ['$cookies', 'ShortlistCookieId', 'lastVisitedTimeId'];
function ShortlistCookieService($cookies, ShortlistCookieId, lastVisitedTimeId) {
  var serv = this;

  serv.addShortlistId = addShortlistId;
  serv.fetchShortlistIds = fetchShortlistIds;
  serv.setCookies = setCookies;
  serv.removeShortlistId = removeShortlistId;

  function setCookies() {
    //console.log(cookies);
    var date = new Date(Date.now());
    $cookies.putObject(lastVisitedTimeId, date);
    //$cookies.put("path", "/");
  }

  function addShortlistId(jobId) {
    var shortlistedJobIds = $cookies.getObject(ShortlistCookieId);
    if (!shortlistedJobIds) {
      shortlistedJobIds = []  ;
    }
    shortlistedJobIds.push(jobId);
    $cookies.putObject(ShortlistCookieId, shortlistedJobIds);
  }

  function fetchShortlistIds() {
    var shortlistedJobIds = $cookies.getObject(ShortlistCookieId);
    if (!shortlistedJobIds) {
      shortlistedJobIds = [];
    }
    return shortlistedJobIds;
  }

  function removeShortlistId(jobId){
     var shortlistedJobIds = $cookies.getObject(ShortlistCookieId);
     var index = shortlistedJobIds.indexOf(jobId);
    shortlistedJobIds.splice(index , 1);
    $cookies.putObject(ShortlistCookieId, shortlistedJobIds);
  }
}

})();
