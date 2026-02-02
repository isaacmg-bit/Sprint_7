import { TestBed } from '@angular/core/testing';

import { Movieservice } from './movieservice';

describe('Movieservice', () => {
  let service: Movieservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Movieservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
