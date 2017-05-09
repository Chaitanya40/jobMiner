(function(){
  "use strict";
  var JobMineApp = angular.module('JobmineApp',['ui.router'])
  .controller('JobViewController', JobViewController)
  .service('ShortlistJobService', ShortlistJobService);

  JobMineApp.config(StateConfig);
  JobMineApp.component('jobTemplate', {
    templateUrl:'templates/job_view.template.html',
    bindings:{
      templateTitle:'@',
      jobDetails:'<',
      shortlistClick:'&'
    },
    controller: function(){}
  });

  StateConfig.$inject=['$stateProvider','$urlRouterProvider'];
  function StateConfig($stateProvider, $urlRouterProvider){
     console.log("Inside stateConfig..");
    $urlRouterProvider.otherwise('/');
    $stateProvider.state({
      name:'state1',
      url: '/',
      templateUrl: 'templates/multiple_job_views.template.html',
      controller: 'JobViewController as ctr1',
      resolve : {
        jobPromise : ['$http', function ($http){
          var jobPromise = $http({
            method:"GET",
            url:'json_files/job_details.json'
          });
           console.log("Inside resolve...")

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

      console.log(jobDetailJson);
      ctr1.fullJobDetailsJson= ShortlistJobService.getAndSetFullJobDetails(jobPromise.data);;
      ctr1.shortlistedJobsJson= ShortlistJobService.getshortlistedJobsJson();
      ctr1.lastVisitedJobsJson= ShortlistJobService.getlastVisitedJobsJson();
      ctr1.lastWeekJobsJson= ShortlistJobService.getlastWeekJobsJson();
      ctr1.jobDetailJson = ShortlistJobService.getjobDetailJson();

      ctr1.shortListThisJob = function(jobId){
        ShortlistJobService.shortListThisJob(ctr1.jobDetailJson, ctr1.shortlistedJobsJson, jobId);
        ctr1.jobDetailJson = ShortlistJobService.getjobDetailJson();
        ctr1.shortlistedJobsJson= ShortlistJobService.getshortlistedJobsJson();
      }
      ctr1.remShortListJob = function(jobId){
        ShortlistJobService.shortListThisJob(ctr1.shortlistedJobsJson,ctr1.jobDetailJson, jobId);
        ctr1.jobDetailJson = ShortlistJobService.getjobDetailJson();
        ctr1.shortlistedJobsJson= ShortlistJobService.getshortlistedJobsJson();
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
      console.log("CompleteJson:" + fullJson);
      console.log("shortlistedJobsJson:" + shortlistedJobsJson);
      console.log("lastVisitedJobsJson:" + lastVisitedJobsJson);
      console.log("lastWeekJobsJson:" + lastWeekJobsJson);
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
      console.log("Inside Service..getAndSetFullJobDetails");
      var jsonKeys = Object.keys(jobDetailJson);
      var completeJson = [];

      for(var key in jsonKeys){
        var tempArr = jobDetailJson[key];
        // console.log(tempArr);
        var count=100;
        for(var ind=0;ind < tempArr.length; ind++){
          tempArr[ind].id= count+"";
          completeJson.push(tempArr[ind]);
          count++;
        }
      }
      service.setAllJobJsons(completeJson);
      return completeJson;
    }


    service.shortListThisJob = function(completeJson, shortlistjson, id){
      var foundJob = null;
      for(var i=0; i<completeJson.length;i++){
        if(completeJson[i]['id'] == id){
          foundJob = completeJson.splice(i,1);
        }
      }
      shortlistjson.push(foundJob[0]);
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
