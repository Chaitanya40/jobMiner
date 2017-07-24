'use strict';

describe('Service: ShortlistCookieService', function () {

  // load the service's module
  beforeEach(module('JobminerApp'));

  // instantiate service
  var ShortlistCookieService;
  beforeEach(inject(function (_ShortlistCookieService_) {
    ShortlistCookieService = _ShortlistCookieService_;
  }));

  it('should do something', function () {
    expect(!!ShortlistCookieService).toBe(true);
  });

});
