(function () {
  'use strict';

  angular.module('JobminerApp').config(StateConfig)
    .config(['AnalyticsProvider', function (AnalyticsProvider) {
      AnalyticsProvider.setAccount('UA-103194307-1');
    }]).run(['Analytics', function (Analytics) { }]);



  StateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function StateConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('', ['$injector', function ($injector) {
      var state = $injector.get('$state');
      state.go('root.jobs', { all: true });
    }]);
    $urlRouterProvider.otherwise('/jobs');

    $stateProvider
      .state({
        name: 'root',
        views: {
          'header': {
            templateUrl: '/views/header.template.html'
          },
          'placeholder': {
            templateUrl: '/scripts/jobs-list/jobslistplaceholder.template.html',
            controller: 'JobsExtractorCtrl as extrCtrl'
          },
          'filterui@root': {
            templateUrl : '/scripts/filters/filter.template.html',
            controller: 'FiltersviewCtrl as filterCtrl'
          }
        },
        resolve: {
          jobPromise: ['$http', function ($http) {
            var jobPromise = $http({
              method: 'GET',
              url: '/data/job_details.json'
            });

            return jobPromise;
          }]
        }
      })
      .state({
        name: 'root.jobs',
        url: '/jobs',
        params: {
          all: true,
          Source: null,
          posted_days_ago: null,
          city: null,
          company_name: null,
          job_location: null,
          job_position: null,
          tags: null,
          shortlist: null
        },
        views: {
          'jobslist': {
            templateUrl: '/scripts/jobs-list/job.template.html',
            controller: 'JobsviewCtrl as viewCtrl'
          }
        }
      });
    //  .state({
    //    name: 'root.filter',
    //    url: 'search/{criteria}/{value}',
    //    views:{
    //      '@': {
    //       templateUrl: 'templates/filtered_jobs.template.html',
    //       controller: 'FilterController as ctr1'
    //      }
    //    }
    //  })

  }
})();

