import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environmentlocal } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);

  private readonly headers = new HttpHeaders({
    Authorization: `Bearer ${environmentlocal.apiToken}`,
  });

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url, { headers: this.headers });
  }
}
