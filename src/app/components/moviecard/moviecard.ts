import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movieservice';

@Component({
  selector: 'app-moviecard',
  imports: [],
  templateUrl: './moviecard.html',
  styleUrl: './moviecard.css',
})
export class MovieCard implements OnInit {
  private readonly route = inject(ActivatedRoute);
  readonly movieService = inject(MovieService);

  movieId = signal<number>(0);

  selectedMovie = computed(() => {
    const id = this.movieId();
    return this.movieService.movies().find((movie) => movie.id === id);
  });

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.movieId = params['id'];
    });
  }
}
