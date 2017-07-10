'use strict';

angular.module('JobminerApp')
.component('jobsList', JobsListComponent);

function JobsListComponent(){
  var config = {
    templateUrl : '/scripts/jobs-list/job.template.html',
    bindings: {
      templateTitle:'@',
      jobDetails:'<',
      shortlistClick:'&'
    }
  };
  return config;

}
