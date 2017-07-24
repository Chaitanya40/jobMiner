(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name JobminerApp.operMethodMap
   * @description
   * # operMethodMap
   * Constant in the JobminerApp.
   */
  angular.module('JobminerApp')
    .service('OperatorMethodMapperService', OperatorMethodMapperService);

  function OperatorMethodMapperService() {
    var mapper = this;
    mapper.numOperationMethodMap = {
      '=': function (a, b) {
        a = Number(a);
        b = Number(b);
        return a === b;
      },
      '<=': function (a, b) {
        a = Number(a);
        b = Number(b);
        return a <= b;
      },
      '>=': function (a, b) {
        a = Number(a);
        b = Number(b);
        return a >= b;
      },
      '!=': function (a, b) {
        a = Number(a);
        b = Number(b);
        return a !== b;
      },
      '<': function (a, b) {
        a = Number(a);
        b = Number(b);
        return a < b;
      },
      '>': function (a, b) {
        a = Number(a);
        b = Number(b);
        return a > b;
      },

      'in': function (a, b) {
        if (Object.prototype.toString.call(b) === '[object Array]') {
          if(b.indexOf(a) > -1){
            return true;
          }
        }
        return false;
      },

      'between': function (a, b) {
        var low, high, value;
        if (b.length >= 2) {
          low = (Number(b[0]) < Number(b[1])) ? Number(b[0]) : Number(b[1]);
          high = (Number(b[0]) > Number(b[1])) ? Number(b[0]) : Number(b[1]);
        }
        value = Number(a);
        return value >= low && value <= high;
      },
      'not_between': function (a, b) {
        var low, high, value;
        if (b.length >= 2) {
          low = (Number(b[0]) < Number(b[1])) ? Number(b[0]) : Number(b[1]);
          high = (Number(b[0]) > Number(b[1])) ? Number(b[0]) : Number(b[1]);
        }
        value = Number(a);
        return value < low && value > high;
      }
    };

    mapper.stringOperationMethodMap = {
      '=': function (a, b) {
        return String(a).toUpperCase() === String(b).toUpperCase();
      }
    };

    mapper.arrOperationMethodMap = {
      'in': function (arr, val) {
        var len = arr.length;
        if (!len) {
          return false;
        }

        for (var i = 0; i < len; i++) {
          if (val.toUpperCase() === arr[i].toUpperCase()) {
            return true;
          }
        }
        return false;
      },
      'in_or_empty': function (arr, val) {
        var len = arr.length;
        if (!len) {
          return true;
        }

        for (var i = 0; i < len; i++) {
          if (val.toUpperCase() === arr[i].toUpperCase()) {
            return true;
          }
        }
        return false;
      }
    };

  }
})();
