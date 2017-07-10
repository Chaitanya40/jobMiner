'use strict';

/**
 * @ngdoc filter
 * @name JobminerApp.filter:stringProperty
 * @function
 * @description
 * # stringProperty
 * Filter in the JobminerApp.
 */
angular.module('JobminerApp')
  .filter('stringProperty', function () {
    return function (input) {
      return 'stringProperty filter: ' + input;
    };
  });
