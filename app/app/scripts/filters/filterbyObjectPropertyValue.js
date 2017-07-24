(function () {
  'use strict';

  /**
   * @ngdoc filter
   * @name JobminerApp.filter:numberProperty
   * @function
   * @description
   * # numberProperty
   * Filter in the JobminerApp.
   */
  angular.module('JobminerApp')
    .filter('byObjectIntProp', NumPropertyFilterFactory)
    .filter('byObjectStrProp', StrPropertyFilterFactory)
    .filter('byArrayStrProp', ArrPropertyFilterFactory);

  NumPropertyFilterFactory.$inject = ['OperatorMethodMapperService'];
  function NumPropertyFilterFactory(OperatorMethodMapperService) {
    return function (arr, property, compareBy, value) {
      return arr.filter(function (obj) {
        return OperatorMethodMapperService.numOperationMethodMap[compareBy](obj[property], value);
      });
    };
  }

  StrPropertyFilterFactory.$inject = ['OperatorMethodMapperService'];
  function StrPropertyFilterFactory(OperatorMethodMapperService) {
    return function (arr, property, compareBy, values) {
      return arr.filter(function (objEle) {
        for (var ind = 0; ind < values.length; ind++) {
          if (OperatorMethodMapperService.stringOperationMethodMap[compareBy](objEle[property], values[ind])) {
            return true;
          }
        }
        return false;

      });
    };
  }
  ArrPropertyFilterFactory.$inject = ['OperatorMethodMapperService'];
  function ArrPropertyFilterFactory(OperatorMethodMapperService) {
    return function (arr, property, compareBy, values) {
      // Property is an array here
      return arr.filter(function (objEle) {
        for (var ind = 0; ind < values.length; ind++) {
          if (OperatorMethodMapperService.arrOperationMethodMap[compareBy](objEle[property], values[ind])) {
            return true;
          }
        }
        return false;
      });
    };
  }


})();
