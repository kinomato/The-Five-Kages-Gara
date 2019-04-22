import { TestBed } from '@angular/core/testing';

import { PhutungService } from './phutung.service';

describe('PhutungService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhutungService = TestBed.get(PhutungService);
    expect(service).toBeTruthy();
  });
});
