'use strict';

describe('Controller: FiltersviewctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('JobminerApp'));

  var FiltersviewctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FiltersviewctrlCtrl = $controller('FiltersviewctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FiltersviewctrlCtrl.awesomeThings.length).toBe(3);
  });
});
