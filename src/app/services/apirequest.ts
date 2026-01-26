import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environment/environment';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class ApiRequest {
  private http = inject(HttpClient);

  apiRequest() {
    const randomId = Math.floor(Math.random() * 250) + 1;
    const url = `${environment.apiUrl}/movie/${randomId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.apiToken}`,
    });

    return { url, headers };
  }

  getRandomMovie() {
    const request = this.apiRequest();
    return this.http.get<Movie>(request.url, { headers: request.headers }).pipe(
      map((movie) => {
        if (movie.adult) {
          throw { status: 404, message: 'Adult content filtered' };
        }
        return movie;
      }),
    );
  }

  getMovieData() {}
}
