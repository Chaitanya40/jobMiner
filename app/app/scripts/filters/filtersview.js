(function() {
'use strict';

/**
 * @ngdoc function
 * @name JobminerApp.controller:FiltersviewctrlCtrl
 * @description
 * # FiltersviewctrlCtrl
 * Controller of the JobminerApp
 */
angular.module('JobminerApp')
  .controller('FiltersviewCtrl', FiltersviewCtrl);

FiltersviewCtrl.$inject = ['jobPromise', 'FilterService', '$rootScope', 'SharedFilterObjectService', '$state'];
function FiltersviewCtrl(jobPromise, FilterService, $rootScope, SharedFilterObjectService, $state) {
  var filterCtrl = this;
  var completeJobDetails = jobPromise.data;
  filterCtrl.toggledFilter = toggledFilter;
  filterCtrl.clearAll= clearAll;

  [filterCtrl.locations, filterCtrl.tags, filterCtrl.companies] = FilterService.getEveryFilterDetails(completeJobDetails);

  function toggledFilter(property, selected, value){
    if(selected){
      SharedFilterObjectService.addSelection(property, value);
      $state.go('root.jobs', SharedFilterObjectService.params);
      //FilterService.broadcastItemAdded(SharedFilterObjectService.params);
    }
    else {
      SharedFilterObjectService.removeSelection(property, value);
      $state.go('root.jobs', SharedFilterObjectService.params);
      //FilterService.broadcastItemRemoved(SharedFilterObjectService.params);
    }
  }

  function clearAll(){
    SharedFilterObjectService.removeAll();
    $state.go('root.jobs', SharedFilterObjectService.params);
  }

}

})();
