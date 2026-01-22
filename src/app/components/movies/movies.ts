import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiRequest } from '../../services/apirequest';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movies',
  imports: [],
  templateUrl: './movies.html',
  styleUrl: './movies.css',
})
export class Movies {
  apiService = inject(ApiRequest);

  movies = signal<Movie[]>([]);

  ngOnInit(): void {
    this.loadRandomMovie();
  }

  private loadRandomMovie(): void {
    this.apiService.getRandomMovie().subscribe({
      next: (movie: Movie) => {
        this.movies.set([movie]);
      },
      error: (error) => {
        if (error.status === 404) {
          console.error('Movie not found, retrying...');
          this.loadRandomMovie();
        } else {
          console.error('Error fetching movie', error);
        }
      },
    });
  }
}
