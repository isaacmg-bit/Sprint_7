import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiRequest } from '../../services/apirequest';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movies',
  imports: [],
  templateUrl: './movies.html',
  styleUrl: './movies.css',
})
export class Movies {
  private apiService = inject(ApiRequest);

  movies = toSignal(
    forkJoin(
      Array.from({ length: 20 }, () =>
        this.apiService.getRandomMovie().pipe(
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
