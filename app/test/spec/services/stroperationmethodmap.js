'use strict';

describe('Constant: numOperMethodMap', function () {

  // instantiate service
  var OperatorMethodMapperService;

  // load the service's module
  beforeEach(module('JobminerApp'));

  beforeEach(inject(function ($injector) {
    OperatorMethodMapperService = $injector.get('OperatorMethodMapperService');
  }));

  it('should return false when compared 2 with 3 by equals', function () {
    expect(OperatorMethodMapperService.numOperationMethodMap['='](2,3)).toBe(false);
  });

  it('should return true when compared 2 with 2 by equals', function () {
    expect(OperatorMethodMapperService.numOperationMethodMap['='](2,2)).toBe(true);
  });

  it('should return true when compared 3 with 2 by >', function () {
    expect(OperatorMethodMapperService.numOperationMethodMap['>'](3,2)).toBe(true);
  });

  it('should return true when compared BANGALORE with Bangalore by >', function () {
    expect(OperatorMethodMapperService.stringOperationMethodMap['=']('BANGALORE','Bangalore')).toBe(true);
  });

});
