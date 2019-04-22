import { TestBed } from '@angular/core/testing';

import { PhieutiepnhanService } from './phieutiepnhan.service';

describe('PhieutiepnhanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhieutiepnhanService = TestBed.get(PhieutiepnhanService);
    expect(service).toBeTruthy();
  });
});
