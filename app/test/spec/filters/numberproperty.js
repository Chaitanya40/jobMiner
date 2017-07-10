'use strict';

describe('Filter: numberProperty', function () {

  // load the filter's module
  beforeEach(module('JobminerApp'));

  // initialize a new instance of the filter before each test
  var numberProperty;
  beforeEach(inject(function ($filter) {
    numberProperty = $filter('numberProperty');
  }));

  it('should return the input prefixed with "numberProperty filter:"', function () {
    var text = 'angularjs';
    expect(numberProperty(text)).toBe('numberProperty filter: ' + text);
  });

});
