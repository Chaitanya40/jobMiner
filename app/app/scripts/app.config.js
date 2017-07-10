'use strict';

angular.module('JobminerApp').config(StateConfig);

StateConfig.$inject=['$stateProvider','$urlRouterProvider'];
  function StateConfig($stateProvider, $urlRouterProvider){
     console.log("Inside stateConfig..");
    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state({
      name:'root',
      url: '/',
      views: {
        'header':{
          templateUrl : '/views/header.template.html'
        },
        'placeholder' : {
           templateUrl : '/scripts/jobs-list/jobslistplaceholder.template.html',
           controller : 'JobsExtractorController as extr'
         }
      },
        // filter_container:{
        //   templateUrl: 'templates/filter.template.html',
        //   controller: 'FilterController as ftr'
        // }
      // },
      resolve : {
        jobPromise : ['$http', function ($http){
          var jobPromise = $http({
            method:"GET",
            url:'/data/job_details.json'
          });
           console.log("Inside resolve...");

          return jobPromise;
        }]
      }
     })
     .state({
       name :'root.jobs',
       url :'jobs',
       views:{
         'jobslist':{
           templateUrl : '/scripts/jobs-list/job.template.html'
         }
       }
     });
    //  .state({
    //    name: 'root.filter',
    //    url: 'search/{criteria}/{value}',
    //    views:{
    //      "@": {
    //       templateUrl: 'templates/filtered_jobs.template.html',
    //       controller: 'FilterController as ctr1'
    //      }
    //    }
    //  })

  }


