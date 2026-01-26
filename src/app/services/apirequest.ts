import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environment/environment';
import { Movie } from '../models/movie';
import { MovieApi } from '../models/movie-api';

@Injectable({
  providedIn: 'root',
})
export class ApiRequest {
  private http = inject(HttpClient);

  private buildRequest() {
    const randomId = Math.floor(Math.random() * 250) + 1;
    const url = `${environment.apiUrl}/movie/${randomId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.apiToken}`,
    });

    return { url, headers };
  }

  getRandomMovie() {
    const request = this.buildRequest();

    return this.http.get<MovieApi>(request.url, { headers: request.headers }).pipe(
      map((movieApi) => {
        if (movieApi.adult) {
          throw { status: 404, message: 'Adult content filtered' };
        }

        return {
          id: movieApi.id,
          title: movieApi.title,
          release_date: movieApi.release_date,
          adult: movieApi.adult,
          genresText: movieApi.genres.map((g) => g.name).join(', '),
          origin_country: movieApi.origin_country,
          overview: movieApi.overview,
          runtime: movieApi.runtime,
          vote_average: movieApi.vote_average,
        } as Movie;
      }),
    );
  }
}
