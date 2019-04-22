import { TestBed } from '@angular/core/testing';

import { HieuxeService } from './hieuxe.service';

describe('HieuxeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HieuxeService = TestBed.get(HieuxeService);
    expect(service).toBeTruthy();
  });
});
