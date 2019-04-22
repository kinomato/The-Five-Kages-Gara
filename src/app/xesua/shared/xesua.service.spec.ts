import { TestBed } from '@angular/core/testing';

import { XesuaService } from './xesua.service';

describe('XesuaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: XesuaService = TestBed.get(XesuaService);
    expect(service).toBeTruthy();
  });
});
