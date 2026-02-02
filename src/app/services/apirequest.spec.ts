import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './apirequest';
import { environment } from '../../environments/environmentlocal';

describe('ApiService', () => {
  interface MockData {
    ok: boolean;
  }
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send GET with Authorization header', () => {
    const mockData = { ok: true };

    service.get<MockData>('https://api.test.com/data').subscribe((res) => {
      expect(res).toEqual(mockData);
    });

    const req = httpMock.expectOne('https://api.test.com/data');

    expect(req.request.method).toBe('GET');

    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${environment.apiToken}`);

    req.flush(mockData);
  });
});
