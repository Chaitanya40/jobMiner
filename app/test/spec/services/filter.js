'use strict';

describe('Service: Filter', function () {

  // load the service's module
  beforeEach(module('JobminerApp'));

  // instantiate service
  var Filter;
  beforeEach(inject(function (_FilterService_) {
    Filter = _FilterService_;
  }));

  it('should do something', function () {
    expect(!!Filter).toBe(true);
  });

});
