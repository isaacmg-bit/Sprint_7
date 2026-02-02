import { Component, inject } from '@angular/core';
import { MovieService } from '../../services/movieservice';
import { RouterModule } from '@angular/router';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-movies',
  imports: [RouterModule, InfiniteScrollDirective],
  templateUrl: './movies.html',
  styleUrl: './movies.css',
})
export class Movies {
  readonly movieService = inject(MovieService);

  constructor() {
    this.movieService.initMovies();
  }

  onScroll(): void {
    this.movieService.fetchMovies();
  }
}
