'use strict';

/**
 * @ngdoc service
 * @name JobminerApp.operMethodMap
 * @description
 * # operMethodMap
 * Constant in the JobminerApp.
 */
angular.module('JobminerApp')
  .constant('numOperMethodMap', numOperationMethodMap)
  .constant('strOperMethodMap',stringOperationMethodMap);

var numOperationMethodMap = {
  '=': function(a,b){
    a = Number(a);
    b = Number(b);
    return a === b;
  },
  '<=': function(a,b){
    a = Number(a);
    b = Number(b);
    return a <= b;
  },
  '>=': function(a,b){
    a = Number(a);
    b = Number(b);
    return a >= b;
  },
  '!=':  function(a,b){
    a = Number(a);
    b = Number(b);
    return a !== b;
  },
  '<':  function(a,b){
    a = Number(a);
    b = Number(b);
    return a < b;
  },
  '>':   function(a,b){
    a = Number(a);
    b = Number(b);
    return a > b;
  }
};

var stringOperationMethodMap = {
  '=': function(a,b){
    return String(a).toUpperCase === String(b).toUpperCase;
  }
};
