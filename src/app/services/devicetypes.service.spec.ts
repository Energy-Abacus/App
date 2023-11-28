import { TestBed } from '@angular/core/testing';

import { DevicetypesService } from './devicetypes.service';

describe('DevicetypesService', () => {
  let service: DevicetypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevicetypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
