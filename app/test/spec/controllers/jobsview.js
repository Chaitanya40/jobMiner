'use strict';

describe('Controller: JobsviewCtrl', function () {

  // load the controller's module
  beforeEach(module('JobminerApp'));

  var JobsviewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    JobsviewCtrl = $controller('JobsviewCtrl', {
      $scope: scope,
      jobPromise: promise
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(JobsviewCtrl.awesomeThings.length).toBe(3);
  });
});
