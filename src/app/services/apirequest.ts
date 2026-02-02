import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environment/environment';
import { Movie } from '../models/movie';

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

    return this.http.get<Movie>(url, { headers }).pipe(
      map((movie) => {
        if (movie.adult) {
          throw { status: 404, message: 'Adult content filtered' };
        }
        return movie;
      }),
    );
  }
}
