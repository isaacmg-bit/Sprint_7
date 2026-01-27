import { Injectable, inject } from '@angular/core';
import { ApiService } from './apirequest';
import { environment } from '../../environment/environment';
import { MovieApi } from '../models/movie-api';
import { Movie } from '../models/movie';
import { toSignal } from '@angular/core/rxjs-interop';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private api = inject(ApiService);

  private getRandomId() {
    return Math.floor(Math.random() * 250) + 1;
  }

  private buildMovieUrl(id: number) {
    return `${environment.apiUrl}/movie/${id}`;
  }

  getRandomMovie() {
    const id = this.getRandomId();
    const url = this.buildMovieUrl(id);

    return this.api.get<MovieApi>(url).pipe(map((api) => this.mapMovie(api)));
  }

  private mapMovie(api: MovieApi): Movie {
    if (api.adult) {
      throw { status: 404 };
    }

    return {
      backdrop_path: api.backdrop_path,
      id: api.id,
      title: api.title,
      release_date: api.release_date,
      adult: api.adult,
      genresText: api.genres.map((g) => g.name).join(', '),
      origin_country: api.origin_country,
      overview: api.overview,
      runtime: api.runtime,
      vote_average: api.vote_average,
    };
  }

  movies = toSignal(
    forkJoin(
      Array.from({ length: 20 }, () =>
        this.getRandomMovie().pipe(
          catchError((error) => {
            if (error.status === 404) {
              console.warn('Movie not found, skipping...');
              return of(null);
            }
            console.error('Error fetching movie', error);
            return of(null);
          }),
        ),
      ),
    ).pipe(map((movies) => movies.filter((m) => m !== null).slice(0, 10) as Movie[])),
    { initialValue: [] as Movie[] },
  );
}
