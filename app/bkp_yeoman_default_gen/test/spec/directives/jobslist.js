'use strict';

describe('Directive: jobsList', function () {

  // load the directive's module
  beforeEach(module('JobminerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<jobs-list></jobs-list>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the jobsList directive');
  }));
});
