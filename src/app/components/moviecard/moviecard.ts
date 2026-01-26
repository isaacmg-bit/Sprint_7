import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movieservice';

@Component({
  selector: 'app-moviecard',
  imports: [],
  templateUrl: './moviecard.html',
  styleUrl: './moviecard.css',
})
export class MovieCard {
  private readonly route = inject(ActivatedRoute);
  readonly movieService = inject(MovieService);

  movieId!: number;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.movieId = Number(params['id']);
    });
  }
}
