'use strict';

describe('Service: SharedFilterObjectService', function () {

  // load the service's module
  beforeEach(module('JobminerApp'));

  // instantiate service
  var SharedFilterObjectService;
  beforeEach(inject(function (_SharedFilterObjectService_) {
    SharedFilterObjectService = _SharedFilterObjectService_;
  }));

  it('should add Bangalore to location when add is called ', function () {
    SharedFilterObjectService.addSelection('location', 'Bangalore');
    expect(SharedFilterObjectService.params.location.values[0]).toBe('Bangalore');
    SharedFilterObjectService.addSelection('tags', 'SQL');
    expect(SharedFilterObjectService.params.location.values[0]).toBe('Bangalore');
    expect(SharedFilterObjectService.params.tags.values[0]).toBe('SQL');
    expect(SharedFilterObjectService.params.all).toBe(false);
  });

  it('should remove Bangalore to location when remove is called ', function () {
    SharedFilterObjectService.addSelection('location', 'Bangalore');
    SharedFilterObjectService.addSelection('location', 'Chennai');
    expect(SharedFilterObjectService.params.location.values[1]).toBe('Chennai');
    SharedFilterObjectService.removeSelection('location', 'Bangalore');
    expect(SharedFilterObjectService.params.location.values.length).toBe(1);
    expect(SharedFilterObjectService.params.location.values[0]).toBe('Chennai');
    expect(SharedFilterObjectService.params.all).toBe(false);
    SharedFilterObjectService.removeSelection('location', 'Chennai');
    expect(SharedFilterObjectService.params.all).toBe(true);

  });

});
