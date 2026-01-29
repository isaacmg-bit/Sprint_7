import { Injectable, inject, signal } from '@angular/core';
import { ApiService } from './apirequest';
import { environment } from '../../environment/environment';
import { MovieApi } from '../models/movie-api';
import { Movie } from '../models/movie';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MovieCrewApi } from '../models/moviecrew-api';
import { MovieCrew } from '../models/moviecrew';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private api = inject(ApiService);

  loading = signal<boolean>(false);
  movies = signal<Movie[]>([]);
  crew = signal<MovieCrew[]>([]);

  private getRandomId(): number {
    return Math.floor(Math.random() * 1000) + 1;
  }

  private buildMovieUrl(id: number): string {
    return `${environment.apiUrl}/movie/${id}`;
  }

  private buildMovieCastUrl(id: number): string {
    return `${environment.apiUrl}/movie/${id}/credits`;
  }

  getRandomMovie(): Observable<Movie> {
    const id = this.getRandomId();
    const url = this.buildMovieUrl(id);

    return this.api.get<MovieApi>(url).pipe(map((api) => this.mapMovie(api)));
  }

  getMovieCrew(movieId: number): Observable<MovieCrew> {
    const url = this.buildMovieCastUrl(movieId);

    return this.api.get<MovieCrewApi>(url).pipe(map((api) => this.mapMovieCrew(api)));
  }

  private mapMovie(api: MovieApi): Movie {
    if (api.adult) {
      throw new Error('Adult movie filtered');
    }

    return {
      backdrop_path: api.backdrop_path,
      poster_path: api.poster_path,
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

  private mapMovieCrew(api: MovieCrewApi): MovieCrew {
    const director = api.crew.find((person) => person.job === 'Director');

    return {
      id: api.id,
      castName: api.cast
        .slice(0, 10)
        .map((n) => n.name)
        .join(', '),
      castCharacter: api.cast
        .slice(0, 10)
        .map((n) => n.character)
        .join(', '),
      castPic: api.cast
        .slice(0, 10)
        .map((p) => (p.profile_path ? `https://image.tmdb.org/t/p/w185${p.profile_path}` : ''))
        .join(', '),

      crewName: director?.name || '',
      crewPic: director?.profile_path
        ? `https://image.tmdb.org/t/p/w185${director.profile_path}`
        : '',
      crewRole: director?.job || '',
    };
  }

  fetchMovies(): void {
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
      .pipe(map((movies): Movie[] => movies.filter((m): m is Movie => m !== null).slice(0, 15)))
      .subscribe((newMovies) => {
        this.movies.update((current) => [...current, ...newMovies]);

        forkJoin(newMovies.map((movie) => this.getMovieCrew(movie.id)))
          .pipe(map((crews) => crews as MovieCrew[]))
          .subscribe((crew) => {
            this.crew.update((current) => [...current, ...crew]);
            this.loading.set(false);
          });
      });
  }
}
