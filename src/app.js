(function(){
  "use strict";
  var JobMineApp = angular.module('JobmineApp',['ui.router'])
  .controller('JobViewController', JobViewController);

  JobMineApp.config(StateConfig);

  StateConfig.$inject=['$stateProvider','$urlRouterProvider'];
  function StateConfig($stateProvider, $urlRouterProvider){
    console.log("Inside stateConfig..");
    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('state1', {
      url: '/',
      templateUrl: 'templates/job_view.template.html',
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

  JobViewController.$inject = ['jobPromise']
  function JobViewController(jobPromise){
    console.log("Inside controller..")
    var ctr1 = this;
    console.log("JobPromise:" + jobPromise);
      var jobDetailJson = jobPromise.data;
      var jsonKeys = Object.keys(jobDetailJson);
      var jsonModObj = [];

      for(var key in jsonKeys){
        var tempArr = jobDetailJson[key];
        console.log(tempArr);

        for(var ind=0;ind < tempArr.length; ind++){
          jsonModObj.push(tempArr[ind]);
        }
      }
      console.log(jsonModObj);
      ctr1.jobDetailJson = jsonModObj;

  }

  function MainController(){

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
