'use strict';

describe('Constant: numOperMethodMap', function () {

  // instantiate service
  var numOperMethodMap;

  // load the service's module
  beforeEach(module('JobminerApp'));

  beforeEach(inject(function (_numOperMethodMap_) {
    numOperMethodMap = _numOperMethodMap_;
  }));

  it('should return true when compared 2 with 2 by equals', function () {
    expect(numOperMethodMap['='](2,3)).toBe(true);
  });

});
