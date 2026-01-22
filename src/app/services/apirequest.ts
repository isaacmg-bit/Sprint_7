import { Injectable, inject } from '@angular/core';
import { environment } from '../../environment/environment';
import { Movie } from '../models/movie';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiRequest {
  private http = inject(HttpClient);

  getRandomMovie() {
    const randomId = Math.floor(Math.random() * 999999) + 1;
    const url = `${environment.apiUrl}/movie/${randomId}`;
    const headers = {
      Authorization: `Bearer ${environment.apiToken}`,
    };
    
    return this.http.get<Movie>(url, { headers });
  }
}
