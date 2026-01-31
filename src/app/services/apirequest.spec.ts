import { TestBed } from '@angular/core/testing';

import { ApiService } from './apirequest';

describe('Apirequest', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
