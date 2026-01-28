import { Injectable, inject, signal } from '@angular/core';
import { ApiService } from './apirequest';
import { environment } from '../../environment/environment';
import { MovieApi } from '../models/movie-api';
import { Movie } from '../models/movie';
import { forkJoin, Observable, of, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private api = inject(ApiService);

  loading = signal(false);
  movies = signal<Movie[]>([]);

  private getRandomId(): number {
    return Math.floor(Math.random() * 1000) + 1;
  }

  private buildMovieUrl(id: number): string {
    return `${environment.apiUrl}/movie/${id}`;
  }

  getRandomMovie(): Observable<Movie> {
    const id = this.getRandomId();
    const url = this.buildMovieUrl(id);

    return this.api.get<MovieApi>(url).pipe(map((api) => this.mapMovie(api)));
  }

  private mapMovie(api: MovieApi): Movie {
    if (api.adult) {
      throw new Error('Adult movie filtered');
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

  fetchMovies() {
    if (this.loading()) return;
    this.loading.set(true);

    forkJoin(
      Array.from({ length: 30 }, () =>
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
    )
      .pipe(map((movies): Movie[] => movies.filter((m): m is Movie => m !== null).splice(0, 15)))
      .subscribe((newMovies) => {
        this.movies.update((current) => [...current, ...newMovies]);
        this.loading.set(false);
      });
  }
}
