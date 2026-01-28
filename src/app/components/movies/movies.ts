import { Component, inject, signal } from '@angular/core';
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
  movieService = inject(MovieService);

  ngOnInit() {
    this.movieService.fetchMovies();
  }
  onScroll() {
    this.movieService.fetchMovies();
  }
}
