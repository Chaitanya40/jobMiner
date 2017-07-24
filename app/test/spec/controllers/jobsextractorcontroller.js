'use strict';

describe('Controller: JobsextractorcontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('JobminerApp'));

  var JobsExtractorCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    JobsExtractorCtrl = $controller('JobsExtractorCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(JobsExtractorCtrl.awesomeThings.length).toBe(3);
  });
});
