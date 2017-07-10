'use strict';

describe('Filter: stringProperty', function () {

  // load the filter's module
  beforeEach(module('JobminerApp'));

  // initialize a new instance of the filter before each test
  var stringProperty;
  beforeEach(inject(function ($filter) {
    stringProperty = $filter('stringProperty');
  }));

  it('should return the input prefixed with "stringProperty filter:"', function () {
    var text = 'angularjs';
    expect(stringProperty(text)).toBe('stringProperty filter: ' + text);
  });

});
