import { Component, inject } from '@angular/core';
import { MovieService } from '../../services/movieservice';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movies',
  imports: [RouterModule],
  templateUrl: './movies.html',
  styleUrl: './movies.css',
})
export class Movies {
  movieService = inject(MovieService);
}
