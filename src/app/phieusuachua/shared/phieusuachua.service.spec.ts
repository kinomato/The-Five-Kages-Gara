import { TestBed } from '@angular/core/testing';

import { PhieusuachuaService } from './phieusuachua.service';

describe('PhieusuachuaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhieusuachuaService = TestBed.get(PhieusuachuaService);
    expect(service).toBeTruthy();
  });
});
