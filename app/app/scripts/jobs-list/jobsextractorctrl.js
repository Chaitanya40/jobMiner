(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name JobminerApp.controller:JobsextractorcontrollerCtrl
   * @description
   * # JobsextractorcontrollerCtrl
   * Controller of the JobminerApp
   */
  angular.module('JobminerApp')
    .controller('JobsExtractorCtrl', JobsExtractorCtrl);


  // JobsExtractorCtrl.$inject = ['jobPromise']
  // function JobsExtractorCtrl(jobPromise, $state) {
  //   var ctrl = this;
  //   ctrl.jobsToDisplay = jobPromise.data;
  // };

  JobsExtractorCtrl.$inject = ['ShortlistCookieService'];
  function JobsExtractorCtrl(ShortlistCookieService) {
    var ctrl = this;
    ctrl.shortlistLength = ShortlistCookieService.fetchShortlistIds().length;
  }

})();
