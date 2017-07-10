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
  .filter('numberProperty', NumPropertyFilter)
  .filter('stringProperty', StrPropertyFilter);

NumPropertyFilter.$inject=['numOperMethodMap'];
function NumPropertyFilter(numOperMethodMap) {
    return function (arr,property,compareBy, value) {
      return arr.filter(function(obj){
        numOperMethodMap[compareBy](obj[property], value);
      });
    };
  }

StrPropertyFilter.$inject=['strOperMethodMap'];
function StrPropertyFilter(strOperMethodMap) {
    return function (arr,property,compareBy, value) {
      return arr.filter(function(obj){
        strOperMethodMap[compareBy](obj[property], value);
      });
    };
  }
