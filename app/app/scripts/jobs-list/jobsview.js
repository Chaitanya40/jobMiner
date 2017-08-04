(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name JobminerApp.controller:JobsviewctrlCtrl
   * @description
   * # JobsviewctrlCtrl
   * Controller of the JobminerApp
   */
  angular.module('JobminerApp')
    .controller('JobsviewCtrl', JobsviewCtrl);

  JobsviewCtrl.$inject = ['$state', '$stateParams', 'jobPromise', 'SplitJobDataService', 'ShortlistCookieService', '$rootScope'];
  function JobsviewCtrl($state, $stateParams, jobPromise, SplitJobDataService, ShortlistCookieService, $rootScope) {
    var ctrl = this;
    ctrl.isShortListState = false;
    ctrl.toggleSelectedJob = toggleSelectedJob;
    ctrl.tagFilters = ($stateParams.tags && $stateParams.tags.values) ? $stateParams.tags.values : [];
    ctrl.addTagFilters = addTagFilters;
    ctrl.removeTagFilters = removeTagFilters;


    var completeJobDetails = jobPromise.data;
    var minusShortlisted = SplitJobDataService.removeShortlistedJobs(completeJobDetails);


    if ($stateParams.shortlist) {
      ctrl.isShortListState = true;
      ctrl.jobDetails = SplitJobDataService.fetchShortlistedJobs(completeJobDetails);
    }
    else if ($stateParams.all) {
      ctrl.jobDetails = minusShortlisted;
    }
    else {
      ctrl.jobDetails = SplitJobDataService.getJobsToDisplay(minusShortlisted, $stateParams);
    }

    function toggleSelectedJob(jobId, isShortListState) {
      if (isShortListState) {
        ShortlistCookieService.removeShortlistId(jobId);
        minusShortlisted = SplitJobDataService.removeShortlistedJobs(completeJobDetails);
        ctrl.jobDetails = SplitJobDataService.fetchShortlistedJobs(completeJobDetails);
      }
      else {
        ShortlistCookieService.addShortlistId(jobId);
        ctrl.jobDetails = SplitJobDataService.removeShortlistedJobs(ctrl.jobDetails);
      }
    }

    // $rootScope.$on('addedFilterEvent', )
    function addTagFilters(tag) {
      if (!(ctrl.tagFilters.indexOf(tag) > -1)) {
        ctrl.tagFilters.push(tag);
        $state.go('root.jobs', { all: false, tags: { property: 'tags', operator: 'in', values: ctrl.tagFilters } }, { reload: true, inherit: false });
      }
    }

    function removeTagFilters(tag) {
      if (ctrl.tagFilters.indexOf(tag) > -1) {
        ctrl.tagFilters.splice(ctrl.tagFilters.indexOf(tag), 1);
        if (!ctrl.tagFilters.length > 0) {
          $state.go('root.jobs', { all: false, tags: { property: 'tags', operator: 'in', values: Array.from(ctrl.tagFilters) } }, { reload: true, inherit: false });
        }
        else {
          $state.go('root.jobs', { all: true });
        }

      }
    }

  }

})();
