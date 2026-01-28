import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  private headers = new HttpHeaders({
    Authorization: `Bearer ${environment.apiToken}`,
  });

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url, {
      headers: this.headers,
    });
  }
}
