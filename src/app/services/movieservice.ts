import { Injectable, inject, signal } from '@angular/core';
import { ApiService } from './apirequest';
import { environment } from '../../environments/environment.local';
import { MovieApi } from '../models/movie-api';
import { Movie } from '../models/movie';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MovieCrewApi } from '../models/moviecrew-api';
import { MovieCrew } from '../models/moviecrew';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly api = inject(ApiService);
  private readonly imageBaseMovie = 'https://image.tmdb.org/t/p/w780';
  private readonly imageBaseCrew = 'https://image.tmdb.org/t/p/w185';
  private readonly actorImageNotAvailable = 'assets/img/actornotavailable.png';
  private readonly posterImageNotAvailable = 'assets/img/posternotavailable.png';
  private readonly backdropImageNotAvailable = 'assets/img/backdropnotavailable.png';
  private readonly moviesPerBatch = 30;
  private readonly moviesToKeep = 15;

  private initialized = false;

  readonly loading = signal<boolean>(false);
  readonly movies = signal<Movie[]>([]);
  readonly crew = signal<MovieCrew[]>([]);

  private getRandomId(): number {
    return Math.floor(Math.random() * 1000) + 1;
  }

  private buildMovieUrl(id: number): string {
    return `${environment.apiUrl}/movie/${id}`;
  }

  private buildMovieCastUrl(id: number): string {
    return `${environment.apiUrl}/movie/${id}/credits`;
  }

  private getRandomMovie(): Observable<Movie> {
    const id = this.getRandomId();
    const url = this.buildMovieUrl(id);

    return this.api.get<MovieApi>(url).pipe(map((api) => this.mapMovie(api)));
  }

  private getMovieCrew(movieId: number): Observable<MovieCrew> {
    const url = this.buildMovieCastUrl(movieId);

    return this.api.get<MovieCrewApi>(url).pipe(map((api) => this.mapMovieCrew(api)));
  }

  getDirectorByMovieId(movieId: number): string {
    const crew = this.crew().find((c) => c.id === movieId);
    return crew?.crewName || 'Unknown';
  }

  getPosterByMovieId(movieId: number): string {
    const poster = this.movies().find((p) => p.id === movieId);
    return poster?.posterUrl || 'Unknown';
  }

  private mapMovie(api: MovieApi): Movie {
    if (api.adult) {
      throw new Error('Adult movie filtered');
    }

    return {
      id: api.id,
      title: api.title,
      posterUrl: api.poster_path
        ? `${this.imageBaseMovie}${api.poster_path}`
        : this.posterImageNotAvailable,
      backdropUrl: api.backdrop_path
        ? `${this.imageBaseMovie}${api.backdrop_path}`
        : this.backdropImageNotAvailable,
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
    const director = api.crew.find((p) => p.job === 'Director');

    return {
      id: api.id,
      cast: api.cast.slice(0, 10).map((actor) => ({
        id: actor.id,
        name: actor.name,
        character: actor.character,
        pic: actor.profile_path
          ? `${this.imageBaseCrew}${actor.profile_path}`
          : this.actorImageNotAvailable,
      })),
      crewName: director?.name || '',
      crewPic: director?.profile_path
        ? `${this.imageBaseCrew}${director.profile_path}`
        : this.actorImageNotAvailable,
      crewRole: director?.job || '',
    };
  }

  private handleMovieError(error: HttpErrorResponse): Observable<Movie | null> {
    if (error.status === 404) {
      console.warn('Movie not found, skipping...');
      return of(null);
    }
    console.error('Error fetching movie', error);
    return of(null);
  }

  initMovies(): void {
    if (this.initialized) return;

    this.initialized = true;
    this.fetchMovies();
  }

  fetchMovies(): void {
    if (this.loading()) return;
    this.loading.set(true);

    const movieRequests = Array.from({ length: this.moviesPerBatch }, () =>
      this.getRandomMovie().pipe(catchError((error) => this.handleMovieError(error))),
    );

    forkJoin(movieRequests)
      .pipe(
        map((movies): Movie[] =>
          movies.filter((m): m is Movie => m !== null).slice(0, this.moviesToKeep),
        ),
      )
      .subscribe((newMovies) => {
        this.movies.update((current) => [...current, ...newMovies]);

        const crewRequests = newMovies.map((movie) => this.getMovieCrew(movie.id));

        forkJoin(crewRequests)
          .pipe(map((crews) => crews as MovieCrew[]))
          .subscribe((crew) => {
            this.crew.update((current) => [...current, ...crew]);
            this.loading.set(false);
          });
      });
  }
}
