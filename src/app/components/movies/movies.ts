import { Component, inject, OnInit, input } from '@angular/core';
import { MovieService } from '../../services/movieservice';
import { RouterModule } from '@angular/router';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-movies',
  imports: [RouterModule, InfiniteScrollDirective],
  templateUrl: './movies.html',
  styleUrl: './movies.css',
})
export class Movies implements OnInit {
  movieService = inject(MovieService);

  ngOnInit(): void {
    this.movieService.fetchMovies();
  }
  onScroll(): void {
    this.movieService.fetchMovies();
  }
}
