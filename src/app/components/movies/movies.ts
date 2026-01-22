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
    this.apiService.getRandomMovie().subscribe((movie: Movie) => {
      this.movies.set([movie]);
    });
  }
}
