import { TestBed } from '@angular/core/testing';

import { TiencongService } from './tiencong.service';

describe('TiencongService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TiencongService = TestBed.get(TiencongService);
    expect(service).toBeTruthy();
  });
});
