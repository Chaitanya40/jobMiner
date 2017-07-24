'use strict';

describe('Service: ShortlistService', function () {

  // load the service's module
  beforeEach(module('JobminerApp'));

  // instantiate service
  var ShortlistService;
  beforeEach(inject(function (_ShortlistService_) {
    ShortlistService = _ShortlistService_;
  }));

  it('should do something', function () {
    expect(!!ShortlistService).toBe(true);
  });

});
