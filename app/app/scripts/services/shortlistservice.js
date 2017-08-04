(function(){
'use strict';

/**
 * @ngdoc service
 * @name JobminerApp.ShortlistService
 * @description
 * # ShortlistService
 * Service in the JobminerApp.
 */
angular.module('JobminerApp')
  .service('ShortlistService', ShortlistService);

ShortlistService.$inject = ['SplitJobDataService', 'ShortlistCookieService'];
function ShortlistService() {

}
})();
