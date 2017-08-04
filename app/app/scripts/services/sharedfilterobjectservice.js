(function(){
'use strict';

/**
 * @ngdoc service
 * @name JobminerApp.SharedFilterObjectService
 * @description
 * # SharedFilterObjectService
 * Service in the JobminerApp.
 */
angular.module('JobminerApp')
  .service('SharedFilterObjectService', SharedFilterObjectService);


function SharedFilterObjectService() {
  var serv = this;

  serv.params = {
    all: true,
    Source: null,
    posted_days_ago: null,
    city: null,
    company_name: null,
    job_location: null,
    job_position: null,
    tags: null,
    shortlist: null
  };
  serv.addSelection = addSelection;
  serv.removeSelection = removeSelection;
  serv.removeAll = removeAll;

  function addSelection(prop, value) {
    var params = serv.params;
    params.all = false;
    if (params.hasOwnProperty(prop)) {
      params[prop] = params[prop] || {
        operator: getOperatorForProperty(prop),
        property: prop,
        values: []
      };
      params[prop].values.push(value);
    }
  }

  function getOperatorForProperty(property) {
    switch (property) {
      case 'tags':
        return 'in';
      default:
        return '=';
    }
  }

  function removeSelection(prop, value) {
    var params = serv.params;
    var areAllPropsEmpty = true;
    if (params.hasOwnProperty(prop) && params[prop] && params[prop].values.length > 0) {
      if (params[prop].values.indexOf(value) > -1) {
        params[prop].values.splice(params[prop].values.indexOf(value), 1);
      }
      if (params[prop].values.length == 0) {
        params[prop] = null;
      }
    }
    for (var property in params) {
      if (params.hasOwnProperty(property) && params[property] && params[prop].values.length > 0) {
        areAllPropsEmpty = false;
        break;
      }
    }
    if (areAllPropsEmpty) {
      removeAll();
    }
  }

  function removeAll() {
    serv.params = {
      all: true,
      Source: null,
      posted_days_ago: null,
      city: null,
      company_name: null,
      job_location: null,
      job_position: null,
      tags: null,
      shortlist: null
    };
  }
}
})();
