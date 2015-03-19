'use strict';

describe('Service: agsService', function () {

  // load the service's module
  beforeEach(module('hydrantsDashboardApp'));

  // instantiate service
  var agsService;
  beforeEach(inject(function (_agsService_) {
    agsService = _agsService_;
  }));

  it('should do something', function () {
    expect(!!agsService).toBe(true);
  });

});
