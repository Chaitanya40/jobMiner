(function(){
  "use strict";
  var JobMineApp = angular.module('JobmineApp',['ui.router', 'ngCookies'])
  .controller('JobViewController', JobViewController)
  .service('ShortlistJobService', ShortlistJobService)
  .service('CookieService', CookieService);

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
      name:'main',
      url: '/',
      views: {
        job_container: {
          templateUrl: 'templates/multiple_job_views.template.html',
          controller: 'JobViewController as ctr1'
        },
        filter_container:{
          templateUrl: 'templates/filter.template.html',
          controller: 'FilterController as ftr'
        }
      },
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
     })
     
  }

  JobViewController.$inject = ['jobPromise','ShortlistJobService', 'CookieService']
  function JobViewController(jobPromise, ShortlistJobService, CookieService){
    // console.log("Inside controller..")
    var ctr1 = this;
     //console.log("JobPromise:" + jobPromise);
      var jobDetailJson = jobPromise.data;
      CookieService.setCookies();
      var shortlistedJobIds = CookieService.fetchShortlistedJobsFromCookie();
      var lastVisit = CookieService.getLastVisitedDate();

      console.log(jobDetailJson);
      ShortlistJobService.setFullJobDetails(jobPromise.data.slice(), shortlistedJobIds);

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

  ShortlistJobService.$inject =['CookieService']
  function ShortlistJobService(CookieService){
    var service = this;
    var fullJson = null;
    var fullJobDetailsJson =null;
    var shortlistedJobsJson = null;
    var lastVisitedJobsJson = null;
    var lastWeekJobsJson = null;
    var jobDetailJson = null;


    service.setAllJobJsons = function(completeJson){
      var modJson = completeJson.slice();
      fullJson = completeJson[0];
      lastVisitedJobsJson= modJson.splice(0,5);
      lastWeekJobsJson= modJson.splice(0,5);
      console.log("CompleteJson:" + fullJson);
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

    service.setFullJobDetails = function(jobDataList, shortlistedJobIds){
      console.log("Inside Service..getAndSetFullJobDetails");
      var completeJson = [];
      var shortlistedJobList=[];

         console.log(jobDataList);
        var isShortListed;
        for(var ind=0;ind < jobDataList.length; ind++){
          isShortListed = false;
          for(var sIter=0; sIter<shortlistedJobIds.length; sIter++){
            if(shortlistedJobIds[sIter] === jobDataList[ind]['index_col']){
              shortlistedJobList.push(jobDataList[ind]);
              isShortListed = true;
            }
          }
          if(!isShortListed){
              completeJson.push(jobDataList[ind]);
              isShortListed = false;
          }
        }
      service.setAllJobJsons(completeJson);
      jobDetailJson = completeJson;
      shortlistedJobsJson = shortlistedJobList;
    }


    service.shortListThisJob = function(completeJson, shortlistjson, id){
      var foundJob = null;
      for(var i=0; i<completeJson.length;i++){
        if(completeJson[i]['index_col'] == id){
          foundJob = completeJson.splice(i,1);
        }
      }
      shortlistjson.push(foundJob[0]);
      CookieService.addShortlistCookie(foundJob[0]['index_col']);

    }

  }

  CookieService.$inject = ['$cookies']
  function CookieService($cookies){
    var service = this;
    var shortlistCookieId = "shortlist";
    var lastVisitedId = "lastVisited";

    service.setCookies = function(){
      //console.log(cookies);
      var date = new Date(Date.now());
      $cookies.putObject(lastVisitedId, date);
      //$cookies.put("path", "/");
    }

    service.addShortlistCookie = function(jobId){
      var shortlistedJobs = $cookies.getObject(shortlistCookieId);
      if(!shortlistedJobs){
        shortlistedJobs = [];
      }
      shortlistedJobs.push(jobId);
      $cookies.putObject(shortlistCookieId,shortlistedJobs);
    }

    service.getLastVisitedDate = function(){
      return $cookies.getObject(lastVisitedId);
    }

    service.fetchShortlistedJobsFromCookie = function(){
      if($cookies.getObject(shortlistCookieId)){
        return $cookies.getObject(shortlistCookieId);
      }
      return [];
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
