import { Injectable, inject } from '@angular/core';
import { ApiService } from './apirequest';
import { environment } from '../../environment/environment';
import { MovieApi } from '../models/movie-api';
import { map } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private api: ApiService) {}

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
}
