import { TestBed } from '@angular/core/testing';

import { PlugsService } from './plugs.service';

describe('PlugsService', () => {
  let service: PlugsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlugsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
