import { TestBed } from '@angular/core/testing';

import { SutiService } from './suti.service';

describe('SutiService', () => {
  let service: SutiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SutiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
