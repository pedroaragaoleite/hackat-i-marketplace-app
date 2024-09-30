import { TestBed } from '@angular/core/testing';

import { BoredApiService } from './bored-api.service';

describe('BoredApiService', () => {
  let service: BoredApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoredApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
