'use strict';

describe('Service: localeService', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var localeService;
  beforeEach(inject(function (_localeService_) {
    localeService = _localeService_;
  }));

  it('should do something', function () {
    expect(!!localeService).toBe(true);
  });

});
