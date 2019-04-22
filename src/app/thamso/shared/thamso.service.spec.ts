import { TestBed } from '@angular/core/testing';

import { ThamsoService } from './thamso.service';

describe('ThamsoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThamsoService = TestBed.get(ThamsoService);
    expect(service).toBeTruthy();
  });
});
