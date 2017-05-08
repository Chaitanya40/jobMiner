(function(){
  "use strict";
  var JobMineApp = angular.module('JobmineApp',['ui.router'])
  .controller('JobViewController', JobViewController)
  .service('ShortlistJobService', ShortlistJobService);

  JobMineApp.config(StateConfig);
  JobMineApp.component('jobTemplate', {
    templateUrl:'templates/job_view.template.html',
    bindings:{
      templateTitle:'<',
      jobDetails:'<',
      shortlistClick:'&'
    },
    controller:
  });
  StateConfig.$inject=['$stateProvider'];
  function StateConfig($stateProvider){
    // console.log("Inside stateConfig..");
    //$urlRouterProvider.otherwise('/');
    $stateProvider
    .state({
      name:'state1',
      url: '/',
      templateUrl: 'templates/job_view.template.html',
      controller: 'JobViewController as ctr1',
      resolve : {
        jobPromise : ['$http', function ($http){
          var jobPromise = $http({
            method:"GET",
            url:'json_files/job_details.json'
          });
          // console.log("Inside resolve...")

          return jobPromise;
        }]
      }
     });
  }

  JobViewController.$inject = ['jobPromise','ShortlistJobService']
  function JobViewController(jobPromise, ShortlistJobService){
    // console.log("Inside controller..")
    var ctr1 = this;
    // console.log("JobPromise:" + jobPromise);
      var jobDetailJson = jobPromise.data;

      // console.log(jsonModObj);
      ctr1.fullJobDetailsJson= ShortlistJobService.getAndSetFullJobDetails(jobPromise.data);;
      ctr1.shortlistedJobsJson= ShortlistJobService.getshortlistedJobsJson();
      ctr1.lastVisitedJobsJson= ShortlistJobService.getlastVisitedJobsJson();
      ctr1.lastWeekJobsJson= ShortlistJobService.getlastWeekJobsJson();
      ctr1.jobDetailJson = ShortlistJobService.getjobDetailJson();

      ctr1.shortListThisJob = function(jobId){
        ShortlistJobService.shortListThisJob(ctr1.jobDetailJson, ctr1.shortlistedJobsJson, jobId);
      }
      ctr1.remShortListJob = function(jobId){
        ShortlistJobService.remShortListJob(ctr1.jobDetailJson, ctr1.shortlistedJobsJson, jobId);
      }


  }

  function MainController(){

  }


  function ShortlistJobService(){
    var service = this;
    var fullJson = null;
    var fullJobDetailsJson =null;
    var shortlistedJobsJson = null;
    var lastVisitedJobsJson = null;
    var lastWeekJobsJson = null;
    var jobDetailJson = null;


    service.setAllJobJsons = function(completeJson){
      var modJson = completeJson.slice();
      fullJson = completeJson.slice();
      shortlistedJobsJson= modJson.splice(0,5);
      lastVisitedJobsJson= modJson.splice(0,5);
      lastWeekJobsJson= modJson.splice(0,5);
      jobDetailJson = modJson;
    }

    service.getshortlistedJobsJson = function(){
      return shortlistedJobsJson;
    }

    service.getlastVisitedJobsJson = function(){
      return lastVisitedJobsJson;
    }

    service.getlastWeekJobsJson = function(){
      return lastWeekJobsJson;
    }

    service.getjobDetailJson = function(){
      return jobDetailJson;
    }

    service.getAndSetFullJobDetails = function(jobDetailJson){
      var jsonKeys = Object.keys(jobDetailJson);
      var completeJson = [];

      for(var key in jsonKeys){
        var tempArr = jobDetailJson[key];
        // console.log(tempArr);
        count=100;
        for(var ind=0;ind < tempArr.length; ind++){
          tempArr[i].id= count;
          completeJson.push(tempArr[ind]);
          count++;
        }
      }
      service.setAllJobJsons(completeJson);
      return completeJson;
    }


    service.shortListThisJob(completeJson, shortlistjson, id){

    }
  }

//   JobMineApp.run(['PrintToConsole', function(PrintToConsole) {
//     PrintToConsole.active = true;
// }]);
//
//   JobMineApp.factory("PrintToConsole", ["$rootScope", function ($rootScope) {
//     var handler = { active: true };
//     handler.toggle = function () { handler.active = !handler.active; };
//     $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
//         if (handler.active) {
//             console.log("$stateChangeStart --- event, toState, toParams, fromState, fromParams");
//             console.log(arguments);
//         };
//     });
//     $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
//         if (handler.active) {
//             console.log("$stateChangeError --- event, toState, toParams, fromState, fromParams, error");
//             console.log(arguments);
//         };
//     });
//     $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
//         if (handler.active) {
//             console.log("$stateChangeSuccess --- event, toState, toParams, fromState, fromParams");
//             console.log(arguments);
//         };
//     });
//     $rootScope.$on('$viewContentLoading', function (event, viewConfig) {
//         if (handler.active) {
//             console.log("$viewContentLoading --- event, viewConfig");
//             console.log(arguments);
//         };
//     });
//     $rootScope.$on('$viewContentLoaded', function (event) {
//         if (handler.active) {
//             console.log("$viewContentLoaded --- event");
//             console.log(arguments);
//         };
//     });
//     $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
//         if (handler.active) {
//             console.log("$stateNotFound --- event, unfoundState, fromState, fromParams");
//             console.log(arguments);
//         };
//     });
//     return handler;
// }]);

})();
