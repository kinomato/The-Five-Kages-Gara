import { TestBed } from '@angular/core/testing';

import { PhieuthutienService } from './phieuthutien.service';

describe('PhieuthutienService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhieuthutienService = TestBed.get(PhieuthutienService);
    expect(service).toBeTruthy();
  });
});
